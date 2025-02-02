"use client";

import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps, RescheduleFlowStep } from "../RescheduleFlow";
import BoxIcon from "@/app/components/common/BoxIcon";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

interface CustomerDidNotAcceptProps extends BookingFlowProps<RescheduleFlowStep> {}

const CustomerDidNotAccept = ({ onEndFlow }: CustomerDidNotAcceptProps) => {
  const dictionary = useDictionaryContext();
  return (
    <>
      <ModalHeader>
        <BoxIcon
          icon={<i className="fa-light fa-message-lines text-lg text-blue-600"></i>}
          alt="Attention"
          className="mb-5"
        />
        <ModalHeaderTitle
          content={dictionary.general.pleaseCommunicateAppointmentChangesWithCustomer}
        />
        <ModalHeaderSubtitle content={dictionary.general.toAvoidCustomerDissatisfaction} />
      </ModalHeader>
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => onEndFlow && onEndFlow()}
          title={dictionary.general.back}
        />
      </ModalFooter>
    </>
  );
};

export default CustomerDidNotAccept;
