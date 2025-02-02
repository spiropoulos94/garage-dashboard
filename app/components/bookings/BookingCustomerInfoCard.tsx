import Card from "../common/Card";
import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import BookingInfoSectionBody from "@/app/containers/bookings/partials/BookingInfoSectionBody";
import { Customer, Vehicle } from "@/app/types/booking";

interface BookingCustomerInfoCardProps {
  dictionary: DictionaryRoot;
  customer: Customer;
  vehicle: Vehicle;
  className?: string;
}

const BookingCustomerInfoCard = ({
  customer,
  vehicle,
  className,
  dictionary,
}: BookingCustomerInfoCardProps) => {
  const { email, phone, firstName, lastName, street, postcode, city, addition } = customer;
  const { numberPlate } = vehicle;

  const address = [street, postcode, city, addition].filter(Boolean).join(' ') || null; // Only use the non-null values

  return (
    <Card className={`bookingCustomerInfoCard ${className}`}>
      <h3 className="mb-6 text-xl font-medium leading-7">
        {firstName} {lastName}
      </h3>
      <BookingInfoSectionBody
        rows={[
          {
            title: dictionary.general.name,
            value: `${firstName} ${lastName}`,
          },
          {
            title: dictionary.general.phoneNumber,
            value: phone,
          },
          {
            title: "E-Mail",
            value: email,
          },
          {
            title: dictionary.general.address,
            value: address,
          },
          {
            title: dictionary.general.plateNumber,
            value: numberPlate,
          },
        ]}
      />
    </Card>
  );
};

export default BookingCustomerInfoCard;