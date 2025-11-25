import { z } from 'zod';

// Zod schema for validation
export const SearchCitySchema = z.object({
  name: z.string().min(1, 'City name is required'),
  count: z.coerce.number().int().min(1).max(100).optional().default(5),
  language: z.string().optional().default('en'),
});

// Type export
export type SearchCityDto = z.infer<typeof SearchCitySchema>;
