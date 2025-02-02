"use client";

import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import Image from "next/image";
import { BookingFlowProps, RescheduleFlowStep } from "../RescheduleFlow";
import ModalContent from "@/app/containers/modals/partials/ModalContent";
import BookingDateColumn from "@/app/containers/bookings/partials/BookingDateColumn";
import BookingDetailsColumn from "@/app/containers/bookings/partials/BookingDetailsColumn";
import Card from "@/app/components/common/Card";
import BannerWithIcon from "@/app/components/common/BannerWithIcon";
import ModalHeaderTitle from "../../../partials/ModalHeader/ModalHeaderTitle";
import { Booking } from "@/app/types/booking";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { useState } from "react";

interface AppointmentOverviewProps extends BookingFlowProps<RescheduleFlowStep> {
  booking: Booking;
  submit: () => void;
  appointmentDateTime: Date | null;
}

const AppointmentOverview = ({
  booking,
  goTo,
  appointmentDateTime,
  submit,
}: AppointmentOverviewProps) => {
  const dictionary = useDictionaryContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const appointmentDateTimeString = appointmentDateTime?.toISOString();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const updatedBooking = await submit();
      goTo("RescheduleSuccess");
    } catch (error) {
      console.log(error);

      if (!appointmentDateTime || new Date(appointmentDateTime) < new Date()) {
        setError(dictionary.bookings.selectedDateIsPast);
      } else {
        setError(dictionary.general.generalError);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle content={dictionary.general.overview} />
      </ModalHeader>
      <ModalContent>
        <Card className="previousBooking flex flex-row py-3">
          <BookingDateColumn booking={booking} isOld />
          <BookingDetailsColumn
            className="ml-6 w-full overflow-clip text-ellipsis text-wrap"
            dictionary={dictionary}
            booking={booking}
          />
        </Card>
        <div className="iconWrapper my-2 flex flex-row justify-center">
          <i className="fa-light fa-arrow-down text-xl "></i>
        </div>
        <Card className="nextBooking flex flex-row py-3">
          <BookingDateColumn
            booking={{ ...booking, appointmentAt: appointmentDateTimeString || "" }}
            isNew
          />
          <BookingDetailsColumn
            className="ml-6 w-full overflow-clip text-ellipsis text-wrap"
            dictionary={dictionary}
            booking={booking}
          />
        </Card>
        <BannerWithIcon
          icon={<i className="fa-regular fa-envelope text-lg"></i>}
          topText={dictionary.general.customerReceivesConfirmation}
          bottomText={dictionary.general.customerReceivesConfirmationDetail}
        />
        {error && <div className="my-2 text-center text-red-500">{error}</div>}
      </ModalContent>
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => goTo("SelectAppointmentTime")}
          title={dictionary.general.back}
        />
        <Button
          size="fullwidth"
          onClick={() => handleConfirm()}
          title={dictionary.bookings.confirm}
          iconLeft={<i className="fa-regular fa-check mr-1 text-white"></i>}
          isLoading={loading}
        />
      </ModalFooter>
    </>
  );
};

export default AppointmentOverview;
