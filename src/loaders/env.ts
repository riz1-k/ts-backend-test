import { z } from 'zod';
import { config } from 'dotenv';
import formatErrors from '../utils/formatErrors';

config();

const allowedOrigins: string[] = ['http://localhost:3000'];

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string(),
  PORT: z.number(),
  JWT_SECRET: z.string(),
});

const envs = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: Number(process.env.PORT),
  JWT_SECRET: process.env.JWT_SECRET,
};

const serverEnv = envSchema.safeParse(envs);

const verifyEnv = () => {
  if (!serverEnv.success) {
    console.error(
      '❌ Invalid environment variables:\n',
      ...formatErrors(serverEnv.error.format())
    );
    throw new Error('Invalid environment variables');
  }
};

if (!serverEnv.success) {
  process.exit(1);
}

const env = serverEnv.data;

export { verifyEnv, allowedOrigins };
export default env;
