import { z } from 'zod';

import { bookingZodSchema } from '../../models/Booking.schema';
import { paymentZodSchema } from '../../models/Payment.schema';

const bookingSchema = bookingZodSchema.omit({
  bookingStatus: true,
  payment: true,
});

export const validateCreateBooking = z.object({
  method: z.literal('POST'),
  body: z.object({
    ...bookingSchema.shape,
    payment: paymentZodSchema,
  }),
});
