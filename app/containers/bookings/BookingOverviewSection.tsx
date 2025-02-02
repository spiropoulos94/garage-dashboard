"use client";

import Badge from "@/app/components/common/Badge";
import Image from "next/image";
import Card from "@/app/components/common/Card";
import { extractLocaleFromUrl } from "@/app/utils/locale";
import { Booking } from "@/app/types/booking";
import { humanReadableDate, standardTimeFormat } from "@/app/utils/date";
import { restrictToTwoDecimals } from "@/app/utils/price";
import {
  mapBookingStatusToBadge,
  mapPaymentTypeToText,
  mapPaymentTypeToTextColorClass,
} from "@/app/helpers/mappings";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { usePathname } from "next/navigation";
import BookingActionsGrid from "@/app/containers/bookings/partials/BookingActionsGrid";

interface BookingOverviewSectionProps {
  booking: Booking;
  className?: string;
}

const BookingOverviewSection = ({ booking, className }: BookingOverviewSectionProps) => {
  const { service, createdAt, appointmentAt, payment, partner, partsDelivery, garage, id } =
    booking;

  const pathname = usePathname();
  const locale = extractLocaleFromUrl(pathname);

  const dictionary = useDictionaryContext();

  const { status: badgeStatus, text: badgeText } = mapBookingStatusToBadge(
    dictionary,
    booking.status,
  );

  return (
    <Card className={`BookingOverviewSection ${className}`}>
      <div className="grid grid-cols-2 lg:grid-cols-8">
        <div className="col-span-2  mb-6 sm:col-span-1 lg:col-span-3">
          <div className="mb-2 mr-2 text-xl font-medium leading-7">{service.name}</div>
          {garage && (
            <div className="garageName my-1 flex flex-row">
              <i className={`fa-kit fa-garage fa-fw mr-2 text-gray-700`} />
              <div className="overflow-clip text-ellipsis text-nowrap text-sm font-normal leading-5">
                {garage?.name}
              </div>
            </div>
          )}
          <div className="mb-2 flex space-x-2">
            <div className="text-sm font-normal leading-5">
              {humanReadableDate(appointmentAt, locale, garage?.timeZone)}
            </div>
            <div className="text-sm font-normal leading-5 text-gray-500" suppressHydrationWarning>
              {standardTimeFormat(appointmentAt, locale, garage?.timeZone)}
            </div>
          </div>
          <div className=" flex items-center gap-x-2">
            {badgeStatus && <Badge status={badgeStatus} text={badgeText} />}
            {id && <div className="evtn text-sm font-normal leading-5 text-gray-500">#{id}</div>}
          </div>
          <div className="mt-1 flex items-center">
            <div className="text-sm font-normal leading-5 text-gray-500">
              {dictionary.bookings.receivedOn}
              <span className="ml-1">
                {humanReadableDate(booking.createdAt, locale, booking.garage?.timeZone)}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-2 mb-6 sm:col-span-1 lg:col-span-2">
          {payment && (
            <div className="mb-2 text-xl font-medium leading-7">
              € {restrictToTwoDecimals(payment.amount)}
            </div>
          )}
          {payment && (
            <div className={`mb-2 flex ${mapPaymentTypeToTextColorClass(payment.type)}`}>
              <Image
                src={"/images/icons/svg/listTick.svg"}
                width={18}
                height={18}
                alt="ebaylogo"
                className="mr-1"
              />
              <div className="mr-1 text-sm font-normal leading-5 ">
                {mapPaymentTypeToText(dictionary, payment.type)}
              </div>
              <div className="text-sm font-normal leading-5 ">
                {restrictToTwoDecimals(payment.amount)} €
              </div>
            </div>
          )}
          <div className="mb-2 flex items-center">
            {partner.logo && (
              <Image src={partner.logo?.url} width={30} height={30} alt="partner logo" />
            )}
            <div className="ml-1 text-sm font-normal leading-5">
              {dictionary.bookings.customerOf} {partner.name}
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="col-span-2 flex w-full flex-row gap-x-4  lg:col-span-3 lg:ml-auto lg:max-w-[438px]">
          <BookingActionsGrid booking={booking} dictionary={dictionary} />
        </div>
      </div>
    </Card>
  );
};

export default BookingOverviewSection;
