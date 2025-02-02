"use client";

import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import Badge from "@/app/components/common/Badge";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { mapBookingStatusToBadge } from "@/app/helpers/mappings";
import { Booking } from "@/app/types/booking";
import { humanReadableDate, standardTimeFormat } from "@/app/utils/date";
import { extractLocaleFromUrl } from "@/app/utils/locale";
import { usePathname } from "next/navigation";

interface BookingDateColumnProps {
  className?: string;
  booking: Booking;
  isOld?: boolean;
  isNew?: boolean;
}

const BookingDateColumn = ({ className, booking, isNew, isOld }: BookingDateColumnProps) => {
  const pathname = usePathname();
  const locale = extractLocaleFromUrl(pathname);

  const dictionary = useDictionaryContext();

  const { status, text } = mapBookingStatusToBadge(dictionary, booking.status);

  return (
    <div className={`bookingDateTime ${className}`}>
      <div
        className={`mb-2 text-sm font-normal leading-5 ${isOld && "line-through"} ${isNew && "text-emerald-600"}`}
      >
        {humanReadableDate(booking.appointmentAt, locale, booking.garage?.timeZone)}
      </div>
      <div
        className={`mb-2 text-sm font-normal leading-5 ${isNew ? "text-emerald-600" : "text-gray-500"} ${isOld && "line-through"}`}
        suppressHydrationWarning
      >
        {standardTimeFormat(booking.appointmentAt, locale, booking.garage?.timeZone)}
      </div>
      {status && <Badge status={status} text={text} />}
      <div className="mt-1 flex items-center">
        <div className="text-xs font-normal leading-5 text-gray-500">
          {dictionary.bookings.receivedOn}
          <div>{humanReadableDate(booking.createdAt, locale, booking.garage?.timeZone)}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingDateColumn;
