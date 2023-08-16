import axios, { type AxiosRequestConfig } from 'axios';
import { type Request, type Response } from 'express';

import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../../../lib/handlers/response-handler';
import { env } from '../../../lib/utils/env';
import { validateLocationSearch } from '../../validators/location.validator';

export async function getLocation(req: Request, res: Response) {
  const url = 'https://booking-com.p.rapidapi.com/v1/hotels/locations';
  try {
    const { method, query } = validateLocationSearch.parse(req);
    const options: AxiosRequestConfig = {
      method,
      url,
      params: {
        name: query.name,
        locale: query.locale,
      },
      headers: {
        'X-RapidAPI-Key': env.X_RapidAPI_Key,
        'X-RapidAPI-Host': env.X_RapidAPI_Host,
      },
    };
    const response = await axios.request(options);
    handleSuccessResponse(200, response.data, res);
  } catch (error: any) {
    void handleErrorResponse(500, error, req, res);
  } finally {
    res.end();
  }
}
