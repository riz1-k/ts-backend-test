import { z } from 'zod';

export const objectIdZod = z.object({
  id: z.instanceof(Object),
});
