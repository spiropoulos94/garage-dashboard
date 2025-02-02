"use client";

import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps, RescheduleFlowStep } from "../RescheduleFlow";
import ModalContent from "@/app/containers/modals/partials/ModalContent";
import Datepicker from "@/app/components/common/inputs/Datepicker";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

interface SelectAppointmentDateProps extends BookingFlowProps<RescheduleFlowStep> {
  handleDateChange: (date: Date) => void;
}

const SelectAppointmentDate = ({ goTo, handleDateChange }: SelectAppointmentDateProps) => {
  const dictionary = useDictionaryContext();

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle content={dictionary.general.pleaseSelectNewDate} />
        <ModalHeaderSubtitle
          content={dictionary.general.pleaseCommunicateWithCustomerBeforeChanging}
        />
      </ModalHeader>
      <ModalContent>
        <Datepicker
          onSelectedDateChanged={handleDateChange}
          inline
          className="mx-auto flex w-fit rounded-lg border  shadow-none"
        />
      </ModalContent>
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => goTo("DidCustomerAccept")}
          title={dictionary.general.back}
        />
        <Button
          size="fullwidth"
          onClick={() => goTo("SelectAppointmentTime")}
          title={dictionary.general.continue}
        />
      </ModalFooter>
    </>
  );
};

export default SelectAppointmentDate;
