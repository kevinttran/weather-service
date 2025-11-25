import { z } from 'zod';

// Zod schemas for validation
export const GetWeatherByCitySchema = z.object({
  city: z.string().min(1, 'City name is required'),
  temperatureUnit: z.enum(['celsius', 'fahrenheit']).optional().default('celsius'),
  windSpeedUnit: z.enum(['kmh', 'ms', 'mph', 'kn']).optional().default('kmh'),
  precipitationUnit: z.enum(['mm', 'inch']).optional().default('mm'),
});

export const GetWeatherByCoordinatesSchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  temperatureUnit: z.enum(['celsius', 'fahrenheit']).optional().default('celsius'),
  windSpeedUnit: z.enum(['kmh', 'ms', 'mph', 'kn']).optional().default('kmh'),
  precipitationUnit: z.enum(['mm', 'inch']).optional().default('mm'),
});

// Type exports
export type GetWeatherByCityDto = z.infer<typeof GetWeatherByCitySchema>;
export type GetWeatherByCoordinatesDto = z.infer<typeof GetWeatherByCoordinatesSchema>;
