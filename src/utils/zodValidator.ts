import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject } from 'zod';

import formatErrors from './formatErrors';

const zodValidator =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.strict().safeParse(req.body);
    if (result.success) {
      next();
      return;
    }
    return res
      .status(400)
      .json({ message: formatErrors(result.error.format()) });
  };

export default zodValidator;
