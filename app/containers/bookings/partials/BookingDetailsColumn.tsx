import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import BookingNote from "@/app/components/bookings/BookingNote";
import { Booking } from "@/app/types/booking";
import Image from "next/image";

interface BookingDetailsColumnProps {
  dictionary: DictionaryRoot;
  className?: string;
  booking: Booking;
}

const BookingDetailsColumn = ({ className, booking, dictionary }: BookingDetailsColumnProps) => {
  return (
    <div className={` upcomingBookingDetailsColumn flex flex-col  ${className}`}>
      {booking.garage && (
        <div className="garageName my-1 flex flex-row">
          <i className="fa-light fa-garage mr-2"></i>
          {booking.garage?.name && (
            <div className="w-full pr-4">
              <div className="overflow-clip text-ellipsis text-nowrap text-sm font-semibold leading-5">
                {booking.garage.name}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mb-2 overflow-clip text-ellipsis text-sm font-normal leading-5 ">
        {booking.service.name} {dictionary.general.for} {booking.customer.firstName}{" "}
        {booking.customer.lastName}
      </div>
      {booking.vehicle?.fullName && (
        <div className="mb-2 overflow-clip text-ellipsis text-nowrap text-sm font-normal leading-5 text-gray-500">
          {booking.vehicle.numberPlate}
          {""} &#183; {""} {booking.vehicle.fullName}
        </div>
      )}
      <div className="flex flex-row text-sm font-normal leading-5">
        {booking.partner.logo && (
          <Image
            className="mr-2"
            src={booking.partner.logo?.url}
            width={30}
            height={30}
            alt="partner logo"
          />
        )}
        <div className="overflow-clip text-ellipsis text-nowrap text-sm font-normal leading-5">
          {dictionary.bookings.customerOf} {booking.partner.name}
        </div>
      </div>
      <BookingNote bookingId={booking.uuid} isPreview={true} value={booking.garagesNote} />
    </div>
  );
};

export default BookingDetailsColumn;
