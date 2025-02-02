"use client";

import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps } from "../../RescheduleFlow/RescheduleFlow";
import ModalContent from "@/app/containers/modals/partials/ModalContent";
import { PacketReceivedFlowStep } from "../PacketReceivedFlow";
import BoxIcon from "@/app/components/common/BoxIcon";
import Card from "@/app/components/common/Card";
import BookingDateColumn from "@/app/containers/bookings/partials/BookingDateColumn";
import BookingDetailsColumn from "@/app/containers/bookings/partials/BookingDetailsColumn";
import BannerWithIcon from "@/app/components/common/BannerWithIcon";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import { Booking } from "@/app/types/booking";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { useState } from "react";
import { confirmBookingPackageReceived } from "@/app/actions/bookings";
import { withAuthCheck } from "@/app/helpers/authHelpers";

const confirmBookingPackageReceivedWithAuthCheck = withAuthCheck(confirmBookingPackageReceived);

interface PacketReceivalConfirmationProps extends BookingFlowProps<PacketReceivedFlowStep> {
  booking: Booking;
}

const PacketReceivalConfirmation = ({
  booking,
  goTo,
  onEndFlow,
}: PacketReceivalConfirmationProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dictionary = useDictionaryContext();

  const handleConfirmClick = async () => {
    setLoading(true);
    try {
      await confirmBookingPackageReceivedWithAuthCheck(booking.uuid);
      goTo("ReceiptConfirmed");
    } catch (error) {
      setError(dictionary.general.generalError);
    }
    setLoading(false);
  };

  return (
    <>
      <ModalHeader>
        <BoxIcon
          icon={<i className="fa-thin fa-hand-holding-box text-lg text-blue-600"></i>}
          alt="Attention"
          className="mb-5"
        />
        <ModalHeaderTitle content={dictionary.general.haveYouReceivedShipmentForThisBooking} />
        <ModalHeaderSubtitle
          content={dictionary.general.pleaseConfirmYouHaveReceivedShipmentForThisBooking}
        />
      </ModalHeader>
      <ModalContent>
        <Card className="nextBooking  grid grid-cols-4 gap-2 py-3">
          <BookingDetailsColumn
            className="col-span-full md:order-2 md:col-span-3"
            dictionary={dictionary}
            booking={booking}
          />
          <BookingDateColumn
            booking={booking}
            className="col-span-full  md:order-1 md:col-span-1"
          />
        </Card>
        <BannerWithIcon
          icon={<i className="fa-light fa-box "></i>}
          topText={`${dictionary.general.packageNumber} ${booking.partsDelivery.evtn || ""}`}
          bottomText={dictionary.general.packageNumberIsOnTheSecondLineAfter}
        />
        {error && <div className="mt-4 text-center text-sm text-red-500">{error}</div>}
      </ModalContent>
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => onEndFlow && onEndFlow()}
          title={dictionary.general.back}
        />
        <Button
          size="fullwidth"
          onClick={handleConfirmClick}
          title={dictionary.general.confirmReceipt}
          iconLeft={<i className="fa-regular fa-check mr-1 text-white"></i>}
          isLoading={loading}
        />
      </ModalFooter>
    </>
  );
};

export default PacketReceivalConfirmation;
