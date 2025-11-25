import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GeocodingResultDto {
  @ApiProperty({ description: 'Location ID', example: 2643743 })
  id: number;

  @ApiProperty({ description: 'City name', example: 'London' })
  name: string;

  @ApiProperty({ description: 'Latitude', example: 51.50853 })
  latitude: number;

  @ApiProperty({ description: 'Longitude', example: -0.12574 })
  longitude: number;

  @ApiPropertyOptional({ description: 'Elevation in meters', example: 25 })
  elevation?: number;

  @ApiPropertyOptional({ description: 'Country code', example: 'GB' })
  country_code?: string;

  @ApiPropertyOptional({ description: 'Country name', example: 'United Kingdom' })
  country?: string;

  @ApiPropertyOptional({ description: 'Timezone', example: 'Europe/London' })
  timezone?: string;

  @ApiPropertyOptional({ description: 'Population', example: 8961989 })
  population?: number;

  @ApiPropertyOptional({ description: 'Admin region 1', example: 'England' })
  admin1?: string;
}
