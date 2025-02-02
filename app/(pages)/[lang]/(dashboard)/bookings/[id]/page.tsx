import { getDictionary } from "../../../dictionaries/dictionaries";
import BookingPageTitle from "@/app/components/bookings/BookingPageTitle";
import BookingCustomerInfoCard from "@/app/components/bookings/BookingCustomerInfoCard";
import BookingMainInfoList from "@/app/containers/bookings/BookingMainInfoList";
import BookingOverviewSection from "@/app/containers/bookings/BookingOverviewSection";
import BookingInfoSection from "@/app/containers/bookings/BookingInfoSection";
import Card from "@/app/components/common/Card";
import { getBooking } from "@/app/actions/bookings";
import Link from "next/link";
import { basicDayAndMonthFormat } from "@/app/utils/date";
import { extractBookingAdditionalParts } from "@/app/helpers/booking";
import BookingNote from "@/app/components/bookings/BookingNote";
import { mapBookingStatusToMeta } from "@/app/helpers/mappings";
import { isErrorResponse } from "@/app/helpers/authHelpers";
import GeneralError from "@/app/components/common/GeneralError";

interface BookingSinglePageProps {
  params: {
    lang: string;
    id: string;
  };
}

const BookingSinglePage = async ({ params }: BookingSinglePageProps) => {
  const response = await getBooking(params.id);
  const t = await getDictionary(params.lang || "en_US");

  if (isErrorResponse(response)) {
    return <GeneralError error={response} />;
  }

  const booking = response;

  const dateEstimate =
    booking.partsDelivery.estimatedDeliveryDate?.current ||
    booking.partsDelivery.estimatedDeliveryDate?.original;

  const additionalParts = extractBookingAdditionalParts(booking);

  const { bgColor } = mapBookingStatusToMeta[booking.status];

  return (
    <div className="upcomingBookingDetails flex w-full flex-col">
      {/* page top info */}
      <BookingPageTitle
        className="mb-8"
        product={booking.service.name || ""}
        customer={booking?.customer}
      />
      <BookingOverviewSection className={`mb-8 ${bgColor}`} booking={booking} />

      <div className="lg:flex lg:flex-row  lg:flex-nowrap lg:items-start">
        <BookingCustomerInfoCard
          className="mb-6 lg:order-2 lg:ml-6 lg:min-w-[320px]"
          dictionary={t}
          customer={booking.customer}
          vehicle={booking.vehicle}
        />

        <div className="flex-1  lg:order-1">
          <BookingNote bookingId={booking.uuid} value={booking.garagesNote} />
          {/* Parts Section */}
          {additionalParts.length > 0 && (
            <Card className="mb-6">
              <BookingInfoSection
                title={t.general.parts}
                titleBadge={{ status: "secondary", text: t.bookings.pendingDelivery }}
                icon={<i className="fa-light fa-gear text-lg text-blue-600"></i>}
                rows={[
                  {
                    title: t.general.shipping,
                    value:
                      booking.partner.slug === "ebay" ? (
                        <div className="text-blue-500">{t.bookings.willBeSentFromEbay}</div>
                      ) : null,
                  },
                  {
                    title: t.general.purchasedProducts,
                    value:
                      additionalParts.length > 0 ? (
                        <div className="flex  flex-col ">
                          <div>{additionalParts.map((part) => part.title)}</div>
                          <div className="mt-2">
                            {additionalParts.map((part, index) => {
                              return (
                                <Link
                                  key={index}
                                  target="_blank"
                                  className="border-b text-sm font-normal leading-5"
                                  href={part.itemWebUrl}
                                >
                                  {t.bookings.seePartOnEbay}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ) : null,
                  },
                  {
                    title: t.general.itemCondition,
                    value: <>{additionalParts.map((part) => part.condition)}</>,
                  },
                  // {
                  //   title: t.general.itemSpecs,
                  //   value: (
                  //     <ul>
                  //       <li>**Herstellernummer: 24.0122-0210.1</li>
                  //       <li>**Marke: ATE</li>
                  //     </ul>
                  //   ),
                  // },
                  {
                    title: t.general.estimatedDelivery,
                    value: dateEstimate ? (
                      <>
                        <div className="mr-1 text-sm font-normal leading-5 text-gray-900">
                          {basicDayAndMonthFormat(dateEstimate?.from)} -{" "}
                          {basicDayAndMonthFormat(dateEstimate?.to)}
                        </div>
                      </>
                    ) : null,
                  },
                  {
                    title: t.general.shippingServiceProvider,
                    value: booking.partsDelivery.tracking?.carrierName || null,
                  },
                  {
                    title: t.general.trackingNumber,
                    value: booking.partsDelivery.tracking?.trackingNumber || null,
                  },
                  {
                    title: t.general.packageNumber,
                    value: booking.partsDelivery.evtn || null,
                  },
                ]}
              />
            </Card>
          )}

          <BookingMainInfoList dictionary={t} booking={booking} />
        </div>
      </div>
    </div>
  );
};

export default BookingSinglePage;
