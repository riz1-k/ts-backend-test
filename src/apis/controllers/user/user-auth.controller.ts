import type { Request, Response } from 'express';

import {
  generateToken,
  getUserID,
  setTokenCookie,
} from '../../../lib/generators/token-gen';
import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../../../lib/handlers/response-handler';
import { UserModel } from '../../../models/User.schema';
import {
  validateUserUpdate,
  validateWalletConnect,
} from '../../validators/user.validator';

export async function walletConnect(req: Request, res: Response) {
  const { body } = validateWalletConnect.parse(req);
  try {
    const user = await UserModel.findOne({ walletAddress: body.walletAddress });
    if (!user) {
      const newUser = await UserModel.create({
        walletAddress: body.walletAddress,
      });
      await newUser.save();
      const token = await generateToken(newUser._id);
      await setTokenCookie(res, token);
      handleSuccessResponse(200, newUser, res);
      return;
    }
    const token = await generateToken(user._id);
    await setTokenCookie(res, token);
    handleSuccessResponse(200, user, res);
  } catch (error: any) {
    console.log(error);
    void handleErrorResponse(500, error, req, res);
  } finally {
    res.end();
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie('tripeo_token');
    handleSuccessResponse(200, 'Successfully logged out', res);
  } catch (error: any) {
    void handleErrorResponse(500, error, req, res);
  } finally {
    res.end();
  }
}

export async function updateUser(req: Request, res: Response) {
  const { body } = validateUserUpdate.parse(req);
  try {
    const userId = await getUserID(req, res);
    if (!userId) throw new Error('User not found');
    const user = await UserModel.findByIdAndUpdate(userId, body, {
      new: true,
    });
    if (!user) throw new Error('User not found');
    handleSuccessResponse(200, user, res);
  } catch (error: any) {
    void handleErrorResponse(500, error, req, res);
  } finally {
    res.end();
  }
}
