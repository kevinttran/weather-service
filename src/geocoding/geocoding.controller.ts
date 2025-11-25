import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GeocodingService } from './geocoding.service';
import type { SearchCityDto } from './dto/search-city.dto';
import { SearchCitySchema } from './dto/search-city.dto';
import { GeocodingResultDto } from './dto/geocoding-result.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@ApiTags('geocoding')
@Controller('geocoding')
export class GeocodingController {
  constructor(private readonly geocodingService: GeocodingService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search for a city by name' })
  @ApiQuery({ name: 'name', required: true, description: 'City name to search for' })
  @ApiQuery({ name: 'count', required: false, description: 'Maximum number of results' })
  @ApiQuery({ name: 'language', required: false, description: 'Language code' })
  @ApiResponse({
    status: 200,
    description: 'List of matching cities',
    type: [GeocodingResultDto],
  })
  @UsePipes(new ZodValidationPipe(SearchCitySchema))
  async searchCity(@Query() query: SearchCityDto) {
    return this.geocodingService.searchCity(
      query.name,
      query.count,
      query.language,
    );
  }
}
