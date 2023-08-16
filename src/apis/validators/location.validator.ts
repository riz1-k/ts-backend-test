import { z } from 'zod';

import { localeSchema } from '../../lib/constants';

export const validateLocationSearch = z.object({
  method: z.literal('GET'),
  query: z.object({
    name: z.string(),
    locale: localeSchema,
  }),
});
