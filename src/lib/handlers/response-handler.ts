import type { Request, Response } from 'express';

import { errorLogger } from '../generators/error-logger';

const successReponseCode = [
  200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
] as const;
const errorReponseCode = [
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
  415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500,
  501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
] as const;

export function handleSuccessResponse(
  code: (typeof successReponseCode)[number],
  data: any,
  res: Response
) {
  res.status(code).json({
    status: 'success',
    data,
  });
}

export async function handleErrorResponse(
  code: (typeof errorReponseCode)[number] = 500,
  error: unknown | any,
  req: Request,
  res: Response
) {
  try {
    const response = {
      status: 'error',
      message: error,
    };

    await errorLogger({
      message: error?.message.toString(),
      request: {
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query,
      },
    });
    res.status(code).json(response);
  } catch (error) {
    console.log(error);
  }
}
