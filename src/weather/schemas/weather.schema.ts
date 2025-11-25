import { z } from 'zod';

// Schema for weather API response
export const CurrentWeatherSchema = z.object({
  time: z.string(),
  interval: z.number(),
  temperature_2m: z.number(),
  relative_humidity_2m: z.number(),
  apparent_temperature: z.number(),
  is_day: z.number(),
  precipitation: z.number(),
  rain: z.number(),
  showers: z.number(),
  snowfall: z.number(),
  weather_code: z.number(),
  cloud_cover: z.number(),
  pressure_msl: z.number(),
  surface_pressure: z.number(),
  wind_speed_10m: z.number(),
  wind_direction_10m: z.number(),
  wind_gusts_10m: z.number(),
});

export const CurrentUnitsSchema = z.object({
  time: z.string(),
  interval: z.string(),
  temperature_2m: z.string(),
  relative_humidity_2m: z.string(),
  apparent_temperature: z.string(),
  is_day: z.string(),
  precipitation: z.string(),
  rain: z.string(),
  showers: z.string(),
  snowfall: z.string(),
  weather_code: z.string(),
  cloud_cover: z.string(),
  pressure_msl: z.string(),
  surface_pressure: z.string(),
  wind_speed_10m: z.string(),
  wind_direction_10m: z.string(),
  wind_gusts_10m: z.string(),
});

export const WeatherResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_units: CurrentUnitsSchema,
  current: CurrentWeatherSchema,
});

export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;
export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;
