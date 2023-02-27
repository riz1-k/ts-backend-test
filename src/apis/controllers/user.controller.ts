import { type Request, type Response } from 'express';

import User from '../../models/user.model';
import {
  type TypeUserLoginBody,
  type TypeUserRegisterBody,
} from '../validators/user.validator';

const userRegister = async (req: Request, res: Response) => {
  const newUser: TypeUserRegisterBody = req.body;
  const { email, password } = newUser;

  try {
    const user = await User.register(new User({ email }), password);
    await user.save();
    return res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err,
    });
  }
};

const userLogin = async (req: Request, res: Response) => {
  const newUser: TypeUserLoginBody = req.body;
  const { email, password } = newUser;
  try {
    const user = await User.authenticate()(email, password);
    return res.status(200).json({
      message: 'User logged in successfully',
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err,
    });
  }
};

export { userLogin, userRegister };
