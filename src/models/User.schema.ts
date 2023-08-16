import { type Document, model, Schema } from 'mongoose';
import { z } from 'zod';

import { objectIdZod } from '../lib/constants';

const userZodSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phoneNumber: z.string().optional(),
  walletAddress: z.string().optional(),
  bookings: z.array(objectIdZod),
  profileImage: z.string(),
});

export type User = z.infer<typeof userZodSchema>;

export type UserDocument = User & Document;

export const UserSchema = new Schema<UserDocument>({
  username: { type: String, unique: true, required: false },
  email: { type: String, unique: true, required: false },
  password: { type: String, required: false },
  phoneNumber: { type: String, required: false, unique: true },
  walletAddress: { type: String, required: false, unique: true },
  bookings: [{ ref: 'Booking', type: Schema.Types.ObjectId }],
  profileImage: { type: String, required: false },
});

export const UserModel = model<UserDocument>('User', UserSchema);
