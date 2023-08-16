import type { Request, Response } from 'express';

import { getUserID } from '../../../lib/generators/token-gen';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../../../lib/handlers/response-handler';
import { BookingModel } from '../../../models/Booking.schema';
import { PaymentModel } from '../../../models/Payment.schema';
import { UserModel } from '../../../models/User.schema';
import { validateCreateBooking } from '../../validators/booking.validator';

export async function createBooking(req: Request, res: Response) {
  const session = await BookingModel.startSession();
  session.startTransaction();

  try {
    const userId = await getUserID(req, res);
    if (!userId) throw new Error('User not found');
    const bookingData = validateCreateBooking.parse(req).body;
    const paymentData = bookingData.payment;

    const payment = new PaymentModel(paymentData);
    const savedPayment = await payment.save({ session });

    const booking = new BookingModel({
      ...bookingData,
      payment: [savedPayment._id],
      bookingStatus: 'SUCCESS',
    });

    const savedBooking = await booking.save({ session });
    console.log('savedBooking', savedBooking);
    // Update user's bookings
    await UserModel.findByIdAndUpdate(userId, {
      $push: { bookings: savedBooking._id },
    }).session(session);

    await session.commitTransaction();
    await session.endSession();
    handleSuccessResponse(200, savedBooking, res);
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    void handleErrorResponse(500, err, req, res);
  }
}
