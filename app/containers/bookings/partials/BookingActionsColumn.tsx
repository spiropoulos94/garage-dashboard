"use client";
import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import BookingActionsGrid from "@/app/containers/bookings/partials/BookingActionsGrid";
import { Booking } from "@/app/types/booking";

interface BookingActionsColumnProps {
  dictionary: DictionaryRoot;
  booking: Booking;
}

const BookingActionsColumn = ({ dictionary, booking }: BookingActionsColumnProps) => {
  return (
    <div className=" bookingActionsColumn order-4  w-full lg:max-h-24 lg:max-w-[438px]">
      <BookingActionsGrid booking={booking} dictionary={dictionary} />
    </div>
  );
};

export default BookingActionsColumn;
