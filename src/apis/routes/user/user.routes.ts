import { Router } from 'express';
import { userRegister, userLogin } from '../../controllers/user.controller';
import zodValidator from '../../../utils/zodValidator';
import {
  userRegisterSchema,
  userLoginSchema,
} from '../../validators/user.validator';
const userAuthRouter = Router();

userAuthRouter.post(
  '/register',
  zodValidator(userRegisterSchema),
  userRegister
);
userAuthRouter.post('/login', zodValidator(userLoginSchema), userLogin);

export default userAuthRouter;
