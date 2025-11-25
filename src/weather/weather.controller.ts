import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import type {
  GetWeatherByCityDto,
  GetWeatherByCoordinatesDto,
} from './dto/get-weather.dto';
import {
  GetWeatherByCitySchema,
  GetWeatherByCoordinatesSchema,
} from './dto/get-weather.dto';
import { WeatherDataDto } from './dto/weather-data.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('city')
  @ApiOperation({ summary: 'Get weather by city name' })
  @ApiQuery({ name: 'city', required: true, description: 'City name' })
  @ApiQuery({ name: 'temperatureUnit', required: false, description: 'Temperature unit', enum: ['celsius', 'fahrenheit'] })
  @ApiQuery({ name: 'windSpeedUnit', required: false, description: 'Wind speed unit', enum: ['kmh', 'ms', 'mph', 'kn'] })
  @ApiQuery({ name: 'precipitationUnit', required: false, description: 'Precipitation unit', enum: ['mm', 'inch'] })
  @ApiResponse({
    status: 200,
    description: 'Weather data for the specified city',
    type: WeatherDataDto,
  })
  @UsePipes(new ZodValidationPipe(GetWeatherByCitySchema))
  async getWeatherByCity(@Query() query: GetWeatherByCityDto) {
    return this.weatherService.getWeatherByCity(
      query.city,
      query.temperatureUnit,
      query.windSpeedUnit,
      query.precipitationUnit,
    );
  }

  @Get('coordinates')
  @ApiOperation({ summary: 'Get weather by coordinates' })
  @ApiQuery({ name: 'latitude', required: true, description: 'Latitude' })
  @ApiQuery({ name: 'longitude', required: true, description: 'Longitude' })
  @ApiQuery({ name: 'temperatureUnit', required: false, description: 'Temperature unit', enum: ['celsius', 'fahrenheit'] })
  @ApiQuery({ name: 'windSpeedUnit', required: false, description: 'Wind speed unit', enum: ['kmh', 'ms', 'mph', 'kn'] })
  @ApiQuery({ name: 'precipitationUnit', required: false, description: 'Precipitation unit', enum: ['mm', 'inch'] })
  @ApiResponse({
    status: 200,
    description: 'Weather data for the specified coordinates',
    type: WeatherDataDto,
  })
  @UsePipes(new ZodValidationPipe(GetWeatherByCoordinatesSchema))
  async getWeatherByCoordinates(@Query() query: GetWeatherByCoordinatesDto) {
    return this.weatherService.getWeatherByCoordinates(
      query.latitude,
      query.longitude,
      query.temperatureUnit,
      query.windSpeedUnit,
      query.precipitationUnit,
    );
  }
}
