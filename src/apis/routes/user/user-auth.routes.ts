import { Router } from 'express';

import { getUser } from '../../controllers/user';
import {
  updateUser,
  walletConnect,
} from '../../controllers/user/user-auth.controller';
import { validateRequest } from '../../middlewares/requestValidator';
import { verifyAuth } from '../../middlewares/verifyAuth';
import {
  validateUserUpdate,
  validateWalletConnect,
} from '../../validators/user.validator';

export const userAuthRouter = Router();

userAuthRouter.post(
  '/walletConnect',
  validateRequest(validateWalletConnect),
  walletConnect
);

userAuthRouter.get('/userData', verifyAuth, getUser);

userAuthRouter.put(
  '/updateUser',
  verifyAuth,
  validateRequest(validateUserUpdate),
  updateUser
);
