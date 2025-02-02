import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import { BadgeProps } from "@/app/components/common/Badge";
import { BookingActions } from "@/app/types/booking/constants";

export interface AvailableBookingActions {
  buttonActions: BookingActionType[];
  dropdownActions: BookingActionType[];
}

export interface BookingMeta {
  canBeConfirmed: boolean;
  badgeStatus: BadgeProps["status"];
  badgeTextKey: keyof DictionaryRoot["bookings"];
  bgColor: string;
  availableActions: AvailableBookingActions;
}

// Create a type that represents the valid keys of the BookingActions object
export type BookingActionType = (typeof BookingActions)[keyof typeof BookingActions];
