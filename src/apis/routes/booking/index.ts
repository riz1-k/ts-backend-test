import { Router } from 'express';

import { createBooking } from '../../controllers/booking';
import { validateRequest } from '../../middlewares/requestValidator';
import { validateCreateBooking } from '../../validators/booking.validator';

export const bookingRouter = Router();

bookingRouter.post('/', validateRequest(validateCreateBooking), createBooking);
