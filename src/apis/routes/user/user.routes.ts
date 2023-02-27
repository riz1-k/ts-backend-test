import { Router } from 'express';

import zodValidator from '../../../utils/zodValidator';
import { userLogin, userRegister } from '../../controllers/user.controller';
import {
  userLoginSchema,
  userRegisterSchema,
} from '../../validators/user.validator';
const userAuthRouter = Router();

userAuthRouter.post(
  '/register',
  zodValidator(userRegisterSchema),
  userRegister
);
userAuthRouter.post('/login', zodValidator(userLoginSchema), userLogin);

export default userAuthRouter;
