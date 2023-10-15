import { z } from 'zod';

const userRegisterSchema = z.object({
  email: z.string().email('Invalid email'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters'),
});

const userLoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters'),
});

type TypeUserRegisterBody = z.infer<typeof userRegisterSchema>;
type TypeUserLoginBody = z.infer<typeof userLoginSchema>;

export type { TypeUserLoginBody, TypeUserRegisterBody };
export { userLoginSchema, userRegisterSchema };
