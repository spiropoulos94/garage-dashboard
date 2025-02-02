"use client";

import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import Badge from "@/app/components/common/Badge";
import { isEbayBooking } from "@/app/helpers/booking";
import { mapPaymentTypeToText, mapPaymentTypeToTextColorClass } from "@/app/helpers/mappings";
import { Booking } from "@/app/types/booking";
import { basicDayAndMonthFormat } from "@/app/utils/date";
import { restrictToTwoDecimals } from "@/app/utils/price";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface BookingShippingAndPaymentDetailsProps {
  className?: string;
  dictionary: DictionaryRoot;
  booking: Booking;
}

const BookingShippingAndPaymentDetails = ({
  className,
  booking,
  dictionary,
}: BookingShippingAndPaymentDetailsProps) => {
  const { payment, partsDelivery } = booking;
  // Use current when available, fall back to original if not, but be prepared that both are missing
  const dateEstimate =
    partsDelivery.estimatedDeliveryDate?.current || partsDelivery.estimatedDeliveryDate?.original;
  const pathname = usePathname();

  return (
    <div className={`shippingAndPayment flex-col ${className} `}>
      {payment && (
        <div
          className={`payment mb-1 flex flex-row items-center ${mapPaymentTypeToTextColorClass(payment.type)}`}
        >
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
          <span> - </span>
          <div className="ml-1 text-sm font-medium leading-5">
            € {restrictToTwoDecimals(payment.amount)}
          </div>
        </div>
      )}
      {isEbayBooking(booking) && (
        <div className="partsStatus mb-2 flex flex-row items-center">
          {partsDelivery.partsWillBeProvided ? (
            <i className={`fa-light fa-box-check fa-fw mr-2 text-gray-700`} />
          ) : (
            <i className={`fa-light fa-truck-fast fa-fw mr-2 text-gray-700`} />
          )}

          <div className="mr-1 text-sm font-normal leading-5 text-gray-900">
            {partsDelivery.partsWillBeProvided
              ? dictionary.bookings.youProvideParts
              : dictionary.bookings.partsWillBeSent}
          </div>
        </div>
      )}
      {partsDelivery.estimatedDeliveryDate ? (
        <div className="delivery mb-2 flex flex-row items-center">
          <i className={`fa-light fa-person-dolly fa-fw mr-2 text-gray-700`} />
          {dateEstimate && (
            <div className="text-md mr-1 font-normal leading-5 text-gray-900">
              {dictionary.bookings.delivery}: {basicDayAndMonthFormat(dateEstimate?.from)} -{" "}
              {basicDayAndMonthFormat(dateEstimate?.to)}
            </div>
          )}
        </div>
      ) : (
        <div className="delivery mb-2 flex flex-row items-center">
          {/* TODO: Replace with fontawesome icon */}
          <Image
            src={"/images/icons/svg/PawDeleted.svg"}
            width={18}
            height={18}
            alt="delivery icon"
            className="mr-1"
          />
          <div className="mr-1 text-sm font-normal leading-5 text-gray-900">
            {dictionary.bookings.noShipmentTracking}
          </div>
        </div>
      )}
      {partsDelivery.evtn && (
        <div className="packageNumber mb-2 flex flex-row items-center text-sm font-normal leading-5 text-gray-900">
          <div className="mr-1 ">{dictionary.bookings.packageNumber}</div>
          <div className=" font-semibold">{partsDelivery.evtn}</div>
        </div>
      )}
    </div>
  );
};

export default BookingShippingAndPaymentDetails;
