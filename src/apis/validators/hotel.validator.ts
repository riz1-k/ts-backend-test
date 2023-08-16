import { z } from 'zod';

import {
  currencySchema,
  languageSchema,
  unitsSchema,
} from '../../lib/constants';
import { CURRENCY, LANGUAGE } from '../../lib/constants/hotel-constants';

export const validateGetHotel = z.object({
  method: z.literal('GET'),
  query: z
    .object({
      hotelId: z.string(),
      currency: z.enum(CURRENCY).default('USD'),
      checkoutDate: z.coerce
        .date()
        .transform((date) => date.toISOString().split('T')[0]),
      checkinDate: z.coerce
        .date()
        .transform((date) => date.toISOString().split('T')[0]),
      locale: z.enum(LANGUAGE).default('en-gb'),
    })
    .strict(),
});

export const validateHotelSearch = z.object({
  method: z.literal('GET'),
  query: z
    .object({
      checkin_date: z.coerce
        .date()
        .transform((date) => date.toISOString().split('T')[0]),
      checkout_date: z.coerce
        .date()
        .transform((date) => date.toISOString().split('T')[0]),
      dest_type: z.string(),
      units: unitsSchema,
      adults_number: z.coerce.number(),
      order_by: z.string(),
      dest_id: z.string(),
      filter_by_currency: currencySchema,
      locale: languageSchema,
      room_number: z.coerce.number().min(1).max(29),
      children_number: z.string().optional(),
      children_ages: z.string().optional(),
      categories_filter_ids: z.string().optional(),
      page_number: z.string().optional(),
      include_adjacency: z.string().optional(),
    })
    .strict(),
});

export const gethotelRooms = z.object({
  method: z.literal('GET'),
  query: z
    .object({
      hotel_id: z.string(),
      checkin_date: z.coerce
        .date()
        .transform((date) => date.toISOString().split('T')[0]),
      checkout_date: z.coerce
        .date()
        .transform((date) => date.toISOString().split('T')[0]),
      currency: currencySchema,
      adults_number_by_rooms: z.string(),
      children_ages: z.string().optional(),
      children_number_by_rooms: z.string().optional(),
      locale: languageSchema,
      units: unitsSchema,
    })
    .strict(),
});
