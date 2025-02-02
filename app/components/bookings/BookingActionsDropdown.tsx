"use client";

import DropdownButton from "@/app/components/common/buttons/DropdownButton";
import { ButtonProps } from "../common/buttons/Button";
import useModal from "@/app/hooks/useModal";
import { Booking } from "@/app/types/booking";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { mapBookingStatusToMeta } from "@/app/helpers/mappings";
import { confirmBooking } from "@/app/actions/bookings";
import { BookingActions } from "@/app/types/booking/constants";
import { BookingActionType } from "@/app/types/booking/bookingActions";
import { withAuthCheck } from "@/app/helpers/authHelpers";
import { filterActions } from "@/app/helpers/booking";

const confirmBookingWithAuthCheck = withAuthCheck(confirmBooking);

interface BookingActionsDropdownProps extends ButtonProps {
  booking: Booking;
}

const BookingActionsDropdown = ({ booking, size }: BookingActionsDropdownProps) => {
  const { open: openRescheduleBookingModal } = useModal("RescheduleFlow", { booking });
  const { open: openSubmitIssueModal } = useModal("SubmitIssueFlow", { booking });
  const { open: openCancelBookingModal } = useModal("CancelBookingFlow", { booking });
  const { open: openPacketReceivedModal } = useModal("PacketReceivedFlow", { booking });
  const { open: openCustomerIsHereModal } = useModal("AttendanceConfirmationFlow", { booking });

  const handleConfirmClick = async () => {
    try {
      await confirmBookingWithAuthCheck(booking.uuid);
    } catch (error) {
      console.log(error);
    }
  };

  const dictionary = useDictionaryContext().bookings;

  const bookingMeta = mapBookingStatusToMeta[booking.status];
  const { dropdownActions } = filterActions(bookingMeta.availableActions, booking);

  const allAptions: {
    title: string;
    value: BookingActionType;
    className?: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[] = [
    {
      title: dictionary.confirm,
      value: BookingActions.Confirm,
      icon: <i className="fa-regular fa-check mr-1"></i>,
      onClick: () => handleConfirmClick(),
    },
    {
      title: dictionary.packetReceived,
      value: BookingActions.PackageReceived,
      icon: <i className="fa-regular fa-box mr-1"></i>,
      onClick: () => openPacketReceivedModal(),
    },
    {
      title: dictionary.customerIsHere,
      value: BookingActions.CustomerHere,
      icon: <i className="fa-regular fa-play mr-1"></i>,
      onClick: () => openCustomerIsHereModal(),
    },
    {
      title: dictionary.changeBooking,
      value: BookingActions.Reschedule,
      icon: <i className="fa-regular fa-calendar-pen mr-1"></i>,
      onClick: () => openRescheduleBookingModal(),
    },
    {
      title: dictionary.reportProblem,
      value: BookingActions.ReportIssue,
      icon: <i className="fa-light fa-comment-exclamation mr-1"></i>,
      onClick: () => openSubmitIssueModal(),
    },
    {
      title: dictionary.reject,
      value: BookingActions.Cancel,
      className: "text-red-500",
      icon: <i className="fa-light fa-ban mr-1"></i>,
      onClick: () => openCancelBookingModal(),
    },
  ];

  const validOptions = allAptions.filter((option) => dropdownActions.includes(option.value));

  return (
    <DropdownButton
      title={dictionary.actions}
      color="plain"
      iconRight={<i className="fa-solid fa-chevron-down ml-2 text-xs"></i>}
      size={size}
      options={validOptions}
    />
  );
};

export default BookingActionsDropdown;
