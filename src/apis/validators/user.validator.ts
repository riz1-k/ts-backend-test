import { z } from 'zod';

export const validateWalletConnect = z.object({
  method: z.literal('POST'),
  body: z
    .object({
      walletAddress: z.string(),
    })
    .strict(),
});

export const validateUserBookings = z.object({
  method: z.literal('GET'),
  query: z.object({
    page: z.string(),
    limit: z.string(),
  }),
});

export const validateUserUpdate = z.object({
  method: z.literal('PUT'),
  body: z
    .object({
      username: z.string().optional(),
      email: z.string().optional(),
      phoneNumber: z.string().optional(),
      profileImage: z.string().optional(),
    })
    .strict(),
});
