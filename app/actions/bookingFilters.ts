"use server";

import { makeRequest } from "@/app/helpers/api";
import { getUserIdFromSession } from "@/app/helpers/sessionHelpers";
import { BookingFiltersResponse } from "@/app/types/bookingFilters";

export const getAllUserBookingFilters = async () => {
  const userID = getUserIdFromSession();
  return makeRequest<BookingFiltersResponse>(
    `/user/${userID}/filters?filters[]=garages&filters[]=organizations`,
    {},
  );
};
