import { type Document, model, Schema } from 'mongoose';
import { z } from 'zod';

const paymentModes = ['CARD', 'CRYPTO', 'PAYPAL'] as const;
const paymentStatus = ['PENDING', 'SUCCESS', 'FAILED'] as const;

export const paymentZodSchema = z.object({
  paymentMode: z.enum(paymentModes),
  paymentStatus: z.enum(paymentStatus),
  paymentAmount: z.number(),
  paymentCurrency: z.string(),
  paymentId: z.string(),
});

export type Payment = z.infer<typeof paymentZodSchema>;

export type PaymentDocument = Payment & Document;

const PaymentSchema = new Schema<PaymentDocument>(
  {
    paymentMode: { type: String, required: true, enum: paymentModes },
    paymentStatus: { type: String, required: true, enum: paymentStatus },
    paymentAmount: { type: Number, required: true },
    paymentCurrency: { type: String, required: true },
    paymentId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const PaymentModel = model<PaymentDocument>('Payment', PaymentSchema);
