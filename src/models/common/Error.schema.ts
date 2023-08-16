import mongoose, { type Document, Schema } from 'mongoose';
import { z } from 'zod';

const ErrorLogSchemaZod = z.object({
  message: z.string(),
  request: z.record(z.any()),
});

export type ErrorLogType = z.infer<typeof ErrorLogSchemaZod>;

interface ErrorLogDocument extends ErrorLogType, Document {}

const ErrorLogSchema = new Schema<ErrorLogDocument>(
  {
    message: { type: String, required: true },
    request: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ErrorLogDocument>('ErrorLog', ErrorLogSchema);
