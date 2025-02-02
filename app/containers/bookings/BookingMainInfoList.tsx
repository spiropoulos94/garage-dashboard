import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import ListView from "@/app/components/common/list/ListView";
import BookingInfoSection from "./BookingInfoSection";
import ListRow from "@/app/components/common/list/ListRow";
import { Booking } from "@/app/types/booking";
import { mapPaymentTypeToText } from "@/app/helpers/mappings";
import { standardDateFormat } from "@/app/utils/date";
import { isEbayBooking } from "@/app/helpers/booking";

interface BookingMainInfoListProps {
  dictionary: DictionaryRoot;
  booking: Booking;
}

const BookingMainInfoList = ({ dictionary, booking }: BookingMainInfoListProps) => {
  const { service, customerMessage, vehicle, partner, premiumServices, garage } = booking;

  return (
    <ListView className="bookingInfoMainList mb-6 w-full">
      {/* service details */}
      <ListRow className="border-b">
        <BookingInfoSection
          className="border-b"
          title={dictionary.general.serviceDetails}
          icon={<i className="fa-regular fa-wrench text-lg text-blue-600"></i>}
          rows={[
            {
              title: "Service",
              value: service.name,
            },
            {
              title: dictionary.general.additionalServices,
              value:
                premiumServices.length > 0 ? (
                  <ul className=" list-disc">
                    {premiumServices.map((service, index) => (
                      <li className=" list-item" key={service.uuid}>
                        {service.name}
                      </li>
                    ))}
                  </ul>
                ) : null,
            },
            {
              title: dictionary.general.noticeFromCustomer,
              value: customerMessage,
            },
          ]}
        />
      </ListRow>

      {/* Customer message */}
      {customerMessage && (
        <ListRow className="border-b">
          <BookingInfoSection
            className="border-b"
            title={dictionary.general.customerMessage}
            icon={<i className="fa-regular fa-message-lines text-lg text-blue-600"></i>}
            textContent={customerMessage}
          />
        </ListRow>
      )}

      {/* vehicle data */}
      <ListRow className="border-b">
        <BookingInfoSection
          className="border-b"
          title={dictionary.general.vehicleData}
          icon={<i className="fa-regular fa-car-side text-lg text-blue-600"></i>}
          rows={[
            {
              title: dictionary.general.plateNumber,
              value: vehicle.numberPlate || null,
            },
            {
              title: dictionary.general.vehicle,
              value: vehicle.fullName,
            },
            {
              title: "HSN/TSN",
              value: vehicle.hsnTsn,
            },
            {
              title: "FIN",
              value: vehicle.vin,
            },
            {
              title: dictionary.general.firstRegistration,
              value: vehicle.initialRegistrationDate
                ? standardDateFormat(vehicle.initialRegistrationDate, "de-DE", garage?.timeZone)
                : null,
            },
            {
              title: dictionary.general.mileage,
              value: vehicle.mileage ? `${vehicle.mileage} km` : null,
            },
          ]}
        />
      </ListRow>

      {/* Costs and payment */}
      {isEbayBooking(booking) &&
        <ListRow className="border-b">
          <BookingInfoSection
            className="border-b"
            title={dictionary.general.bill}
            icon={<i className="fa-regular fa-receipt text-lg text-blue-600"></i>}
            rows={[
              {
                title: dictionary.general.pay,
                value: dictionary.bookings.alreadyPaidByCustomerOnEbay
              },
              {
                title: dictionary.general.invoice,
                value: dictionary.bookings.pleaseIssueInvoice,
              },
              {
                title: dictionary.general.payout,
                value: dictionary.bookings.paymentIsOnceAMonth,
              },
            ]}
          />
        </ListRow>
      }
    </ListView>
  );
};

export default BookingMainInfoList;
