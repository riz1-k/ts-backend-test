import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

import { handleErrorResponse } from '../../lib/handlers/response-handler';
import { env } from '../../lib/utils/env';

export async function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.tripeo_token;
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!decoded) {
      throw new Error('Invalid token');
    }
    next();
  } catch (error: any) {
    void handleErrorResponse(401, error, req, res);
  }
}
