import { Router } from 'express';

import { bookingRouter } from './booking';
import { hotelRouter } from './hotel';
import { locationRouter } from './location';
import { userRouter } from './user';

export const apiRouter = Router();

apiRouter.use('/hotel', hotelRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/booking', bookingRouter);
apiRouter.use('/location', locationRouter);
