import { config } from 'dotenv';
import { z } from 'zod';

config();

const localEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production']),
  COOKIE_SECRET: z.string(),
});

export const env = envSchema.parse(localEnv);
