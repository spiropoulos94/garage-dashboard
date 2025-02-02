"use client";

import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps } from "../../RescheduleFlow/RescheduleFlow";
import { AttendanceConfirmationFlowStep } from "../AttendanceConfirmationFlow";
import BoxIcon from "@/app/components/common/BoxIcon";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

interface ServicereadyProps extends BookingFlowProps<AttendanceConfirmationFlowStep> {}

const Serviceready = ({ onEndFlow }: ServicereadyProps) => {
  const dictionary = useDictionaryContext();
  return (
    <>
      <ModalHeader>
        <BoxIcon
          icon={<i className="fa-light fa-thumbs-up text-lg text-blue-600"></i>}
          alt="Attention"
          className="mb-5"
        />
        <ModalHeaderTitle content={dictionary.bookings.customerHereSuccessTitle} />
        <ModalHeaderSubtitle content={dictionary.bookings.customerHereSuccessSubtitle} />
      </ModalHeader>
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => onEndFlow && onEndFlow()}
          title={dictionary.general.close}
          iconLeft={<i className="fa-regular fa-check mr-1"></i>}
        />
      </ModalFooter>
    </>
  );
};

export default Serviceready;
