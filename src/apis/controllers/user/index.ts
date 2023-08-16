import type { Request, Response } from 'express';

import { getUserID } from '../../../lib/generators/token-gen';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../../../lib/handlers/response-handler';
import { UserModel } from '../../../models/User.schema';
import { validateUserBookings } from '../../validators/user.validator';

export async function getUser(req: Request, res: Response) {
  try {
    const userId = await getUserID(req, res);
    console.log('userId', userId);
    if (!userId) {
      throw new Error('User not found');
    }
    const user = await UserModel.findById(userId).select('-password -bookings');
    if (!user) throw new Error('User not found');
    handleSuccessResponse(200, user, res);
  } catch (err: any) {
    void handleErrorResponse(500, err, req, res);
  }
}

export async function getUserBookings(req: Request, res: Response) {
  try {
    const userId = await getUserID(req, res);
    if (!userId) throw new Error('User not found');
    const { query } = validateUserBookings.parse(req);

    const page = parseInt(query.page);
    const itemsPerPage = parseInt(query.limit);

    const skip = (page - 1) * itemsPerPage;

    const bookingsQuery = UserModel.findById(userId)
      .select('bookings')
      .populate({
        path: 'bookings',
        populate: {
          path: 'payment',
          model: 'Payment',
        },
      })
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });

    const totalBookings = await UserModel.findById(userId)
      .select('bookings')
      .countDocuments();
    const totalPages = Math.ceil(totalBookings / itemsPerPage);

    const bookings = await bookingsQuery.exec();

    const response = {
      totalPages,
      currentPage: page,
      bookings: bookings?.bookings,
    };

    handleSuccessResponse(200, response, res);
  } catch (err) {
    void handleErrorResponse(500, err, req, res);
  }
}
export async function getUserPayments(req: Request, res: Response) {
  try {
    const userId = await getUserID(req, res);
    if (!userId) throw new Error('User not found');
    const { query } = validateUserBookings.parse(req);

    const page = parseInt(query.page);
    const itemsPerPage = parseInt(query.limit);

    const skip = (page - 1) * itemsPerPage;

    const userPayments = UserModel.findById(userId)
      .select('bookings')
      .populate({
        path: 'bookings',
        populate: {
          path: 'payment',
          model: 'Payment',
        },
      })
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });

    const totalPayments = await UserModel.findById(userId)
      .select('bookings')
      .populate({
        path: 'bookings',
        populate: {
          path: 'payment',
          model: 'Payment',
        },
      })
      .countDocuments();

    const totalPages = Math.ceil(totalPayments / itemsPerPage);

    const payments = await userPayments.exec();

    const response = {
      totalPages,
      currentPage: page,
      payments,
    };

    handleSuccessResponse(200, response, res);
  } catch (err) {
    void handleErrorResponse(500, err, req, res);
  }
}
