import { z } from 'zod';

import { CURRENCY, LANGUAGE } from './hotel-constants';

export const objectIdZod = z.object({
  id: z.instanceof(Object),
});

export const httpMethodZod = z.enum(['GET', 'POST', 'PUT', 'DELETE']);

export const currencySchema = z.enum(CURRENCY).default('USD');

export const languageSchema = z.enum(LANGUAGE).default('en-gb');

export const unitsSchema = z.enum(['imperial', 'metric']).default('metric');

export const localeSchema = z.string().default('en-gb');
