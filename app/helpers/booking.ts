import { Booking, Part } from "@/app/types/booking";
import { AvailableBookingActions, BookingActionType } from "@/app/types/booking/bookingActions";
import { BookingActions } from "@/app/types/booking/constants";

export const extractBookingAdditionalParts = (booking: Booking): Part[] => {
  if (!booking.partsDelivery.additionalParts) return [];
  return Object.values(booking.partsDelivery.additionalParts);
};

export const isEbayBooking = (booking: Booking): boolean => {
  return booking.partner.slug === "ebay" || false;
};

export const filterAlreadyCompletedActions = (
  actions: AvailableBookingActions,
  booking: Booking,
): AvailableBookingActions => {
  const { bookingPinVerifiedAt, shipping } = booking;

  let filteredActions = actions;

  // If bookingPinVerifiedAt is set, remove CustomerHere from both actions
  if (bookingPinVerifiedAt) {
    filteredActions = {
      buttonActions: filteredActions.buttonActions.filter(
        (action) => action !== BookingActions.CustomerHere,
      ),
      dropdownActions: filteredActions.dropdownActions.filter(
        (action) => action !== BookingActions.CustomerHere,
      ),
    };
  }

  // If shipping status is 'received', remove PackageReceived from both actions
  if (shipping?.status === "received") {
    filteredActions = {
      buttonActions: filteredActions.buttonActions.filter(
        (action) => action !== BookingActions.PackageReceived,
      ),
      dropdownActions: filteredActions.dropdownActions.filter(
        (action) => action !== BookingActions.PackageReceived,
      ),
    };
  }

  return filteredActions;
};

export const filterActions = (
  availableActions: AvailableBookingActions,
  booking: Booking,
): AvailableBookingActions => {
  const {
    partner: { slug: orgSlug },
  } = booking;

  const EbayOnlyActions: BookingActionType[] = [
    BookingActions.PackageReceived,
    BookingActions.CustomerHere,
  ];

  // First, filter out EbayOnlyActions if the organization is not "ebay"
  let filteredActions = availableActions;
  if (orgSlug !== "ebay") {
    filteredActions = {
      buttonActions: availableActions.buttonActions.filter(
        (action) => !EbayOnlyActions.includes(action),
      ),
      dropdownActions: availableActions.dropdownActions.filter(
        (action) => !EbayOnlyActions.includes(action),
      ),
    };
  }

  return filterAlreadyCompletedActions(filteredActions, booking);
};
