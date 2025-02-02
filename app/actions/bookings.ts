"use server";

import { ErrorResponse, makeRequest } from "@/app/helpers/api";
import { Booking, BookingsResponse, CancelReason } from "@/app/types/booking";
import { revalidatePath } from "next/cache";

export const getBookings = async (params?: Record<string, string | number | string[]>) => {
  return makeRequest<BookingsResponse>("/inquiry", { params });
};

export const getBooking = async (id: string) => {
  id = "d4da82f6-7636-4f5e-b9dc-eadb9e062d43"; // use mock data
  return makeRequest<Booking>(`/inquiry/${id}`);
};

export const confirmBooking = async (id: string) => {
  const data = await makeRequest<Booking>(`/inquiry/${id}/book`, { method: "POST" });
  revalidatePath(`/bookings/${id}`);
  revalidatePath(`/bookings`);
  return data;
};

export const updateBookingNote = async (id: string, note: string) => {
  const data = await makeRequest<Booking>(`/inquiry/${id}`, {
    method: "PATCH",
    body: { garagesNote: note },
  });
  revalidatePath(`/bookings`);
  return data;
};

export const validateBookingPin = async (id: string, bookingPin: string) => {
  const data = await makeRequest<{ ok: boolean }>(`/inquiry/${id}/bookingPin/validate`, {
    method: "POST",
    body: { bookingPin },
  });
  return data;
};

export const confirmBookingPackageReceived = async (id: string) => {
  const data = await makeRequest<Booking>(`/inquiry/${id}/package/received`, { method: "POST" });
  revalidatePath(`/bookings/${id}`);
  return data;
};

export const cancelBooking = async (id: string, reason: CancelReason, comment?: string) => {
  const data = await makeRequest<Booking>(`/inquiry/${id}/cancel`, {
    method: "DELETE",
    body: { reason, comment },
  });
  revalidatePath(`/bookings`);
  return data;
};

export const rescheduleBooking = async (
  id: string,
  dateISOstr: string,
  reason: CancelReason,
  comment?: string,
) => {
  const body: { newStartsAt: string; reason: CancelReason; comment?: string } = {
    newStartsAt: dateISOstr,
    reason,
  };

  if (comment) {
    body.comment = comment; // only include body property if it's not undefined
  }

  const data = await makeRequest<Booking>(`/inquiry/${id}/reschedule`, {
    method: "POST",
    body,
  });
  revalidatePath(`/bookings`);
  return data;
};
