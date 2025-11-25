import { Injectable, HttpException, HttpStatus, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import {
  WeatherResponse,
  WeatherResponseSchema,
} from './schemas/weather.schema';
import { GeocodingService } from '../geocoding/geocoding.service';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly weatherApiUrl: string;

  constructor(
    private configService: ConfigService,
    private geocodingService: GeocodingService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.weatherApiUrl = this.configService.get(
      'WEATHER_API_URL',
      'https://api.open-meteo.com/v1/forecast',
    );
  }

  async getWeatherByCoordinates(
    latitude: number,
    longitude: number,
    temperatureUnit: string = 'celsius',
    windSpeedUnit: string = 'kmh',
    precipitationUnit: string = 'mm',
  ): Promise<WeatherResponse> {
    const cacheKey = `weather:${latitude}:${longitude}:${temperatureUnit}:${windSpeedUnit}:${precipitationUnit}`;

    // Check cache first
    const cached = await this.cacheManager.get<WeatherResponse>(cacheKey);
    if (cached) {
      this.logger.log(`Cache hit for ${cacheKey}`);
      return cached;
    }

    try {
      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'is_day',
          'precipitation',
          'rain',
          'showers',
          'snowfall',
          'weather_code',
          'cloud_cover',
          'pressure_msl',
          'surface_pressure',
          'wind_speed_10m',
          'wind_direction_10m',
          'wind_gusts_10m',
        ].join(','),
        temperature_unit: temperatureUnit,
        wind_speed_unit: windSpeedUnit,
        precipitation_unit: precipitationUnit,
      });

      const url = `${this.weatherApiUrl}?${params.toString()}`;
      this.logger.log(`Fetching weather data from: ${url}`);

      const response = await fetch(url);

      if (!response.ok) {
        throw new HttpException(
          'Failed to fetch weather data',
          HttpStatus.BAD_GATEWAY,
        );
      }

      const data = await response.json();

      // Validate response with Zod
      const validatedData: WeatherResponse = WeatherResponseSchema.parse(data);

      // Cache the result (TTL is configured in CacheModule)
      await this.cacheManager.set(cacheKey, validatedData);

      return validatedData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error('Error fetching weather data:', error);
      throw new HttpException(
        'Failed to fetch weather data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWeatherByCity(
    city: string,
    temperatureUnit: string = 'celsius',
    windSpeedUnit: string = 'kmh',
    precipitationUnit: string = 'mm',
  ): Promise<WeatherResponse & { cityName: string }> {
    this.logger.log(`Getting weather for city: ${city}`);

    // Get coordinates from geocoding service
    const location = await this.geocodingService.getCityCoordinates(city);

    // Get weather data
    const weatherData = await this.getWeatherByCoordinates(
      location.latitude,
      location.longitude,
      temperatureUnit,
      windSpeedUnit,
      precipitationUnit,
    );

    return {
      ...weatherData,
      cityName: location.name,
    };
  }
}
