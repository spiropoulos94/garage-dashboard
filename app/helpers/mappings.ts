import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import { BadgeProps } from "@/app/components/common/Badge";
import { BookingStatusType, PaymentType } from "@/app/types/booking";
import { BookingMeta } from "@/app/types/booking/bookingActions";
import { BookingActions, BookingStatuses } from "@/app/types/booking/constants";

export const mapBookingStatusToMeta: Record<BookingStatusType, BookingMeta> = {
  [BookingStatuses.Pending]: {
    canBeConfirmed: true,
    badgeStatus: "warning",
    badgeTextKey: "unconfirmed",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    availableActions: {
      buttonActions: [BookingActions.Confirm],
      dropdownActions: [
        BookingActions.Confirm,
        BookingActions.Reschedule,
        BookingActions.ReportIssue,
        BookingActions.Cancel,
        BookingActions.PackageReceived,
      ],
    },
  },
  [BookingStatuses.AwaitingVerification]: {
    canBeConfirmed: true,
    badgeStatus: "warning",
    badgeTextKey: "unconfirmed",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    availableActions: {
      buttonActions: [BookingActions.Confirm],
      dropdownActions: [
        BookingActions.Confirm,
        BookingActions.Reschedule,
        BookingActions.ReportIssue,
        BookingActions.Cancel,
        BookingActions.PackageReceived,
      ],
    },
  },
  [BookingStatuses.InModeration]: {
    canBeConfirmed: true,
    badgeStatus: "warning",
    badgeTextKey: "unconfirmed",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.AwaitingGarageResponse]: {
    canBeConfirmed: true,
    badgeStatus: "warning",
    badgeTextKey: "unconfirmed",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    availableActions: {
      buttonActions: [BookingActions.Confirm, BookingActions.PackageReceived],
      dropdownActions: [
        BookingActions.Confirm,
        BookingActions.Reschedule,
        BookingActions.ReportIssue,
        BookingActions.Cancel,
        BookingActions.PackageReceived,
      ],
    },
  },
  [BookingStatuses.LiveBookingError]: {
    canBeConfirmed: true,
    badgeStatus: "warning",
    badgeTextKey: "unconfirmed",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    availableActions: {
      buttonActions: [BookingActions.Confirm],
      dropdownActions: [
        BookingActions.Confirm,
        BookingActions.Reschedule,
        BookingActions.ReportIssue,
        BookingActions.Cancel,
        BookingActions.PackageReceived,
      ],
    },
  },
  [BookingStatuses.AwaitingExternalApproval]: {
    canBeConfirmed: true,
    badgeStatus: "warning",
    badgeTextKey: "unconfirmed",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    availableActions: {
      buttonActions: [BookingActions.Confirm],
      dropdownActions: [
        BookingActions.Confirm,
        BookingActions.Reschedule,
        BookingActions.ReportIssue,
        BookingActions.Cancel,
        BookingActions.PackageReceived,
      ],
    },
  },
  [BookingStatuses.Approved]: {
    canBeConfirmed: true,
    badgeStatus: "warning",
    badgeTextKey: "unconfirmed",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [BookingActions.Confirm],
      dropdownActions: [
        BookingActions.Confirm,
        BookingActions.Reschedule,
        BookingActions.ReportIssue,
        BookingActions.Cancel,
        BookingActions.PackageReceived,
      ],
    },
  },
  [BookingStatuses.Declined]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "contactRepareo",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.Rejected]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "contactRepareo",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.PriceNegotiationByGarage]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "contactRepareo",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.AcceptedByUser]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "contactRepareo",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.RejectedByUser]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "contactRepareo",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.ClarificationRequired]: {
    canBeConfirmed: false,
    badgeStatus: "warning",
    badgeTextKey: "unconfirmed",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [BookingActions.Confirm, BookingActions.PackageReceived],
      dropdownActions: [
        BookingActions.Confirm,
        BookingActions.Reschedule,
        BookingActions.ReportIssue,
        BookingActions.Cancel,
        BookingActions.PackageReceived,
      ],
    },
  },
  [BookingStatuses.AwaitingCustomerResponse]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "contactRepareo",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.Accepted]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "contactRepareo",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.AppointmentInClarification]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "contactRepareo",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.ProposedNewAppointmentDate]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "contactRepareo",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.Booked]: {
    canBeConfirmed: false,
    badgeStatus: "success",
    badgeTextKey: "confirmed",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [BookingActions.CustomerHere, BookingActions.PackageReceived],
      dropdownActions: [
        BookingActions.Reschedule,
        BookingActions.CustomerHere,
        BookingActions.ReportIssue,
        BookingActions.Cancel,
        BookingActions.PackageReceived,
      ],
    },
  },
  [BookingStatuses.Billed]: {
    canBeConfirmed: false,
    badgeStatus: "success",
    badgeTextKey: "completed",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.NotBillable]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "cancelled",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
  [BookingStatuses.Cancelled]: {
    canBeConfirmed: false,
    badgeStatus: "error",
    badgeTextKey: "cancelled",
    bgColor: "bg-white hover:bg-gray-100",
    availableActions: {
      buttonActions: [],
      dropdownActions: [],
    },
  },
};

// indicates if booking can be confirmed based on its status
export const canBookingBeConfirmed = (status: BookingStatusType): boolean => {
  const bookingMeta = mapBookingStatusToMeta[status];
  return bookingMeta ? bookingMeta.canBeConfirmed : false;
};

// map booking status to badge text and status
export const mapBookingStatusToBadge = (
  dictionary: DictionaryRoot,
  status: BookingStatusType,
): { status: BadgeProps["status"] | null; text: string } => {
  const bookingMeta = mapBookingStatusToMeta[status];
  if (bookingMeta) {
    return {
      status: bookingMeta.badgeStatus,
      text: dictionary.bookings[bookingMeta.badgeTextKey],
    };
  }
  return {
    status: null,
    text: "",
  };
};

// map booking status to background color on the list item
export const mapBookingStatusToBgColor = (status: BookingStatusType): string => {
  const bookingMeta = mapBookingStatusToMeta[status];
  return bookingMeta ? bookingMeta.bgColor : "bg-white hover:bg-gray-100";
};

// map backend payment type to displayed text
export const mapPaymentTypeToText = (
  dictionary: DictionaryRoot,
  paymentType: PaymentType,
): string => {
  switch (paymentType) {
    case "ESTIMATE":
      return dictionary.bookings.estimate;
    case "PAID":
      return dictionary.bookings.payUpfront;
    case "VIA_PARTNER":
      return dictionary.bookings.viaPartner;
    default:
      return paymentType;
  }
};

// map backend payment type to displayed text
export const mapPaymentTypeToTextColorClass = (paymentType: PaymentType): string => {
  switch (paymentType) {
    case "PAID":
      return "text-emerald-600";
    default:
      return "";
  }
};
