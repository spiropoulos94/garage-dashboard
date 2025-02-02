"use client";

import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import Image from "next/image";
import { BookingFlowProps, RescheduleFlowStep } from "../RescheduleFlow";
import BoxIcon from "@/app/components/common/BoxIcon";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

interface DidCustomerAcceptProps extends BookingFlowProps<RescheduleFlowStep> {}

const DidCustomerAccept = ({ goTo }: DidCustomerAcceptProps) => {
  const dictionary = useDictionaryContext();
  return (
    <>
      <ModalHeader>
        <BoxIcon
          icon={<i className="fa-light fa-message-lines text-lg text-blue-600"></i>}
          alt="Attention"
          className="mb-5"
        />
        <ModalHeaderTitle content={dictionary.general.didCustomerAcceptChange} />
        <ModalHeaderSubtitle content={dictionary.general.pleaseConsultWithCustomer} />
      </ModalHeader>
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => goTo("CustomerDidNotAccept")}
          title={dictionary.general.no}
        />
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => goTo("SelectAppointmentDate")}
          title={dictionary.general.yes}
        />
      </ModalFooter>
    </>
  );
};

export default DidCustomerAccept;
