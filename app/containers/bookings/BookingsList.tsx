import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import ListRow from "@/app/components/common/list/ListRow";
import ListView from "@/app/components/common/list/ListView";
import Link from "next/link";
import BookingDetailsColumn from "./partials/BookingDetailsColumn";
import BookingShippingAndPaymentDetails from "./partials/BookingShippingAndPaymentDetails";
import BookingDateColumn from "./partials/BookingDateColumn";
import BookingActionsColumn from "./partials/BookingActionsColumn";
import { Booking } from "@/app/types/booking";
import { mapBookingStatusToBgColor } from "@/app/helpers/mappings";

interface BookingsListProps {
  dictionary: DictionaryRoot;
  bookings: Booking[];
}

const BookingsList = async ({ bookings, dictionary }: BookingsListProps) => {
  return (
    <ListView className="BookingsList">
      {bookings.map((booking) => (
        <Link key={booking.uuid} href={`/bookings/${booking.uuid}`}>
          <ListRow
            key={booking.uuid}
            {...booking}
            className={`flex flex-row flex-wrap gap-6 border-b lg:flex-nowrap ${mapBookingStatusToBgColor(booking.status)} `}
          >
            {/* display date and time of booking */}
            <BookingDateColumn
              className="order-1flex w-[83px]  flex-col  lg:w-[120px]"
              booking={booking}
            />
            {/* shipping & payment details */}
            <BookingShippingAndPaymentDetails
              className="order-2 flex w-[186px] flex-col sm:min-w-fit lg:min-w-[208px]"
              dictionary={dictionary}
              booking={booking}
            />
            {/* display booking details */}
            <BookingDetailsColumn
              className="order-3 w-full flex-1 lg:order-1 lg:w-[90px]  2xl:min-w-[370px] "
              dictionary={dictionary}
              booking={booking}
            />
            {/* actions */}
            <BookingActionsColumn dictionary={dictionary} booking={booking} />
          </ListRow>
        </Link>
      ))}
    </ListView>
  );
};

export default BookingsList;
