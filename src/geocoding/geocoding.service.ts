import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GeocodingResponse,
  GeocodingResponseSchema,
  GeocodingResult,
} from './schemas/geocoding.schema';

@Injectable()
export class GeocodingService {
  private readonly logger = new Logger(GeocodingService.name);
  private readonly geocodingApiUrl: string;

  constructor(private configService: ConfigService) {
    this.geocodingApiUrl = this.configService.get(
      'GEOCODING_API_URL',
      'https://geocoding-api.open-meteo.com/v1/search',
    );
  }

  async searchCity(
    name: string,
    count: number = 5,
    language: string = 'en',
  ): Promise<GeocodingResult[]> {
    try {
      const params = new URLSearchParams({
        name,
        count: count.toString(),
        language,
        format: 'json',
      });

      const url = `${this.geocodingApiUrl}?${params.toString()}`;
      this.logger.log(`Fetching geocoding data from: ${url}`);

      const response = await fetch(url);

      if (!response.ok) {
        throw new HttpException(
          'Failed to fetch geocoding data',
          HttpStatus.BAD_GATEWAY,
        );
      }

      const data = await response.json();

      // Validate response with Zod
      const validatedData: GeocodingResponse =
        GeocodingResponseSchema.parse(data);

      if (!validatedData.results || validatedData.results.length === 0) {
        throw new HttpException('City not found', HttpStatus.NOT_FOUND);
      }

      return validatedData.results;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error('Error fetching geocoding data:', error);
      throw new HttpException(
        'Failed to fetch geocoding data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCityCoordinates(
    cityName: string,
  ): Promise<{ latitude: number; longitude: number; name: string }> {
    const results = await this.searchCity(cityName, 1);
    const firstResult = results[0];

    return {
      latitude: firstResult.latitude,
      longitude: firstResult.longitude,
      name: firstResult.name,
    };
  }
}
