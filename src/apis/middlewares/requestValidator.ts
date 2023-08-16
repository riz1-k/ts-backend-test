import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject } from 'zod';

export function validateRequest(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = schema.nonstrict().safeParse(req);
    if (validate.success) {
      next();
    } else {
      res.status(400).send(validate.error);
    }
  };
}
