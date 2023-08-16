import type { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

import { handleErrorResponse } from '../handlers/response-handler';
import { env } from '../utils/env';

interface TokenPayload {
  userId: string;
}

const TOKEN_EXPIRATION = '1h';

export async function generateToken(payload: TokenPayload): Promise<string> {
  try {
    return sign({ payload }, env.JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
  } catch (error) {
    console.log('Error generating token:', error);
    throw error;
  }
}

export async function getUserID(
  req: Request,
  res: Response
): Promise<string | null> {
  try {
    const token = req.cookies.tripeo_token;
    if (!token) {
      void handleErrorResponse(401, 'Unauthorized', req, res);
    }
    const decodedToken = verify(token, env.JWT_SECRET);
    if (typeof decodedToken === 'string') throw new Error('Invalid token');
    return decodedToken.payload;
  } catch (error) {
    console.log('Error getting user ID:', error);
    throw error;
  }
}

export async function setTokenCookie(
  res: Response,
  token: string
): Promise<void> {
  try {
    res.cookie('tripeo_token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });
  } catch (error) {
    console.log('Error setting token cookie:', error);
    throw error;
  }
}
