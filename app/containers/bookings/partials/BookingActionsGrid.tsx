"use client";

import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import { confirmBooking } from "@/app/actions/bookings";
import BookingActionsDropdown from "@/app/components/bookings/BookingActionsDropdown";
import Button from "@/app/components/common/buttons/Button";
import { withAuthCheck } from "@/app/helpers/authHelpers";
import { filterActions } from "@/app/helpers/booking";
import { mapBookingStatusToMeta } from "@/app/helpers/mappings";
import useModal from "@/app/hooks/useModal";
import { Booking } from "@/app/types/booking";
import { BookingActions } from "@/app/types/booking/constants";
import { useState } from "react";

const confirmBookingWithAuthCheck = withAuthCheck(confirmBooking);

interface BookingActionsGridProps {
  booking: Booking;
  dictionary: DictionaryRoot;
}

const BookingActionsGrid = ({ booking, dictionary }: BookingActionsGridProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { open: openRescheduleBookingFlow } = useModal("RescheduleFlow", {
    booking,
  });
  const { open: openAttendanceConfirmationFlow } = useModal("AttendanceConfirmationFlow", {
    booking,
  });
  const { open: openPacketReceivedFlow } = useModal("PacketReceivedFlow", { booking });
  const bookingMeta = mapBookingStatusToMeta[booking.status];
  const { dropdownActions, buttonActions } = filterActions(bookingMeta.availableActions, booking);

  const handleConfirmClick = async () => {
    let updatedBooking;
    setLoading(true);
    try {
      updatedBooking = await confirmBookingWithAuthCheck(booking.uuid);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  // Encapsulated logic in a function
  const getGridColsClass = () => {
    const classes: { [key: number]: string } = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
    };
    // check how many buttons actions does this booking have
    let cols = buttonActions.length;
    // if it has dropdown actions, add 1 to the cols for the dropdown button
    if (dropdownActions.length > 0) cols += 1;
    // if the booking cannot be confirmed, remove the confirm button from the count
    if (buttonActions.includes(BookingActions.Confirm) && !bookingMeta.canBeConfirmed) cols -= 1;
    // if we have 4 different rows of buttons, we want to display them in 2 columns on larger screens
    if (cols === 4) cols = 2;

    return classes[cols];
  };

  const gridColsLG = getGridColsClass();

  return (
    <div
      className={`bookingActionsGrid grid h-fit w-full grid-cols-2  gap-4   sm:grid-cols-4 md:grid-cols-5 ${gridColsLG}`}
    >
      {" "}
      {dropdownActions.length > 0 && (
        <div className="col-span-auto">
          <BookingActionsDropdown booking={booking} size="fullwidth" />
        </div>
      )}
      {buttonActions.includes(BookingActions.PackageReceived) && (
        <div className="col-span-auto">
          <Button
            size="fullwidth"
            color="secondary"
            iconLeft={<i className="fa-light fa-box-circle-check mr-1 text-blue-600"></i>}
            title={dictionary.bookings.packetReceived}
            onClick={() => openPacketReceivedFlow()}
          />
        </div>
      )}
      {buttonActions.includes(BookingActions.CustomerHere) && (
        <div className="col-span-auto">
          <Button
            size="fullwidth"
            iconLeft={<i className="fa-regular fa-play mr-1 "></i>}
            title={dictionary.bookings.customerIsHere}
            onClick={() => openAttendanceConfirmationFlow()}
          />
        </div>
      )}
      {buttonActions.includes(BookingActions.Confirm) && bookingMeta.canBeConfirmed && (
        <div className="col-span-auto">
          <Button
            size="fullwidth"
            color="primary"
            iconLeft={<i className="fa-light fa-check mr-1 "></i>}
            title={dictionary.bookings.confirm}
            onClick={() => handleConfirmClick()}
            isLoading={loading}
          />
        </div>
      )}
      {buttonActions.includes(BookingActions.Reschedule) && (
        <div className="md:col-span-auto col-span-full flex flex-col justify-end lg:col-span-full">
          <Button
            size="fullwidth"
            iconLeft={<i className="fa-regular fa-calendar-pen mr-1"></i>}
            title={dictionary.bookings.changeBooking}
            onClick={() => openRescheduleBookingFlow()}
          />
        </div>
      )}
    </div>
  );
};

export default BookingActionsGrid;
