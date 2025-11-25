import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CurrentWeatherDto {
  @ApiProperty({ description: 'Observation time', example: '2024-01-15T12:00' })
  time: string;

  @ApiProperty({ description: 'Temperature in selected unit', example: 15.2 })
  temperature_2m: number;

  @ApiProperty({ description: 'Relative humidity in %', example: 75 })
  relative_humidity_2m: number;

  @ApiProperty({ description: 'Apparent temperature', example: 13.5 })
  apparent_temperature: number;

  @ApiProperty({ description: 'Is daytime (0 or 1)', example: 1 })
  is_day: number;

  @ApiProperty({ description: 'Precipitation', example: 0.5 })
  precipitation: number;

  @ApiProperty({ description: 'Rain', example: 0.5 })
  rain: number;

  @ApiProperty({ description: 'Showers', example: 0 })
  showers: number;

  @ApiProperty({ description: 'Snowfall', example: 0 })
  snowfall: number;

  @ApiProperty({ description: 'Weather code', example: 3 })
  weather_code: number;

  @ApiProperty({ description: 'Cloud cover in %', example: 50 })
  cloud_cover: number;

  @ApiProperty({ description: 'Sea level pressure', example: 1015.2 })
  pressure_msl: number;

  @ApiProperty({ description: 'Surface pressure', example: 1013.5 })
  surface_pressure: number;

  @ApiProperty({ description: 'Wind speed', example: 12.5 })
  wind_speed_10m: number;

  @ApiProperty({ description: 'Wind direction in degrees', example: 180 })
  wind_direction_10m: number;

  @ApiProperty({ description: 'Wind gusts', example: 18.2 })
  wind_gusts_10m: number;
}

export class WeatherDataDto {
  @ApiProperty({ description: 'Latitude', example: 51.5074 })
  latitude: number;

  @ApiProperty({ description: 'Longitude', example: -0.1278 })
  longitude: number;

  @ApiProperty({ description: 'Timezone', example: 'Europe/London' })
  timezone: string;

  @ApiProperty({ description: 'Elevation in meters', example: 25 })
  elevation: number;

  @ApiProperty({ description: 'Current weather data', type: CurrentWeatherDto })
  current: CurrentWeatherDto;

  @ApiPropertyOptional({ description: 'City name if available', example: 'London' })
  cityName?: string;
}
