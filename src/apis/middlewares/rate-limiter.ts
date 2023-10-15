import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';

import env from '../../loaders/env';

const mongoConn = mongoose.createConnection(env.DATABASE_URL);

const opts = {
  storeClient: mongoConn,
  tableName: 'rateLimits',
  points: 100,
  duration: 60,
};

export default (req: Request, res: Response, next: NextFunction) => {
  const rateLimiterMongo = new RateLimiterMongo(opts);
  rateLimiterMongo
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch((err) =>
      res.status(429).json({
        message: 'Too Many Requests',
        error: err,
      })
    );
};
