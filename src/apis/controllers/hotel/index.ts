import axios, { type AxiosRequestConfig } from 'axios';
import type { Request, Response } from 'express';

import {
  handleErrorResponse,
  handleSuccessResponse,
} from '../../../lib/handlers/response-handler';
import { env } from '../../../lib/utils/env';
import {
  gethotelRooms,
  validateGetHotel,
  validateHotelSearch,
} from '../../validators/hotel.validator';

export async function getHotel(req: Request, res: Response) {
  const url = 'https://booking-com.p.rapidapi.com/v2/hotels/details';
  try {
    const { method, query } = validateGetHotel.parse(req);
    const options: AxiosRequestConfig = {
      method,
      url,
      params: {
        hotel_id: query.hotelId,
        checkin_date: query.checkinDate,
        checkout_date: query.checkoutDate,
        locale: query.locale,
        currency: query.currency,
      },
      headers: {
        'X-RapidAPI-Key': env.X_RapidAPI_Key,
        'X-RapidAPI-Host': env.X_RapidAPI_Host,
      },
    };
    const response = await axios.request(options);
    handleSuccessResponse(200, response.data, res);
  } catch (error) {
    void handleErrorResponse(500, error, req, res);
  } finally {
    res.end();
  }
}

export async function searchHotel(req: Request, res: Response) {
  const url = 'https://booking-com.p.rapidapi.com/v2/hotels/search';
  try {
    const { method, query } = validateHotelSearch.parse(req);
    const options: AxiosRequestConfig = {
      method,
      url,
      params: query,
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

export async function getHotelRooms(req: Request, res: Response) {
  const url = 'https://booking-com.p.rapidapi.com/v1/hotels/room-list';
  try {
    const { method, query } = gethotelRooms.parse(req);
    const options: AxiosRequestConfig = {
      method,
      url,
      params: query,
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
