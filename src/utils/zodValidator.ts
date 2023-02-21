import type { Request, Response, NextFunction } from 'express';
import type { AnyZodObject } from 'zod';
import formatErrors from './formatErrors';

const zodValidator =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.strict().safeParse(req.body);
    if (result.success) return next();
    return res
      .status(400)
      .json({ message: formatErrors(result.error.format()) });
  };

export default zodValidator;
