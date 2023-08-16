import { type Document, model, Schema } from 'mongoose';
import { z } from 'zod';

import { objectIdZod } from '../lib/constants';

const bookingStatuses = ['PENDING', 'SUCCESS', 'FAILED'] as const;

export const bookingZodSchema = z.object({
  bookingStatus: z.enum(bookingStatuses),
  hotel: z.object({
    hotelId: z.string(),
    hotelName: z.string(),
  }),
  room: z.object({
    roomId: z.string(),
    roomName: z.string(),
    roomPrice: z.number(),
  }),
  payment: z.array(objectIdZod),
  visitorData: z.object({
    visitorName: z.string(),
    visitorEmail: z.string(),
    visitorPhone: z.string(),
    noOfAdults: z.coerce.number(),
    noOfChildren: z.coerce.number(),
    checkInDate: z.string(),
    checkOutDate: z.string(),
  }),
});

export type Booking = z.infer<typeof bookingZodSchema>;

export type BookingDocument = Booking & Document;

const BookingSchema = new Schema<BookingDocument>(
  {
    bookingStatus: { type: String, required: true, enum: bookingStatuses },
    hotel: {
      hotelId: { type: String, required: true },
      hotelName: { type: String, required: true },
    },
    room: {
      roomId: { type: String, required: true },
      roomName: { type: String, required: true },
      roomPrice: { type: Number, required: true },
    },
    payment: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    visitorData: {
      visitorName: { type: String, required: true },
      visitorEmail: { type: String, required: true },
      visitorPhone: { type: String, required: true },
      noOfAdults: { type: Number, required: true },
      noOfChildren: { type: Number, required: true },
      checkInDate: { type: String, required: true },
      checkOutDate: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const BookingModel = model<BookingDocument>('Booking', BookingSchema);
