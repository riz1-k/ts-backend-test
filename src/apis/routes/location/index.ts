import Router from 'express';

import { getLocation } from '../../controllers/location';

export const locationRouter = Router();

locationRouter.get('/search', getLocation);
