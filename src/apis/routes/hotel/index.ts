import { Router } from 'express';

import { getHotel, getHotelRooms, searchHotel } from '../../controllers/hotel';
import { validateRequest } from '../../middlewares/requestValidator';
import {
  gethotelRooms,
  validateGetHotel,
  validateHotelSearch,
} from '../../validators/hotel.validator';

export const hotelRouter = Router();

hotelRouter.get('/getHotelData', validateRequest(validateGetHotel), getHotel);
hotelRouter.get('/search', validateRequest(validateHotelSearch), searchHotel);
hotelRouter.get(
  '/getHotelRooms',
  validateRequest(gethotelRooms),
  getHotelRooms
);
