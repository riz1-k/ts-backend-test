import { Router } from 'express';

import { getUserBookings, getUserPayments } from '../../controllers/user';
import { validateRequest } from '../../middlewares/requestValidator';
import { validateUserBookings } from '../../validators/user.validator';
import { userAuthRouter } from './user-auth.routes';

export const userRouter = Router();

userRouter.use('/auth', userAuthRouter);
userRouter.get(
  '/bookings',
  validateRequest(validateUserBookings),
  getUserBookings
);
userRouter.get(
  '/payments',
  validateRequest(validateUserBookings),
  getUserPayments
);
