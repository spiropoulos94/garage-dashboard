"use client";

import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps, RescheduleFlowStep } from "../RescheduleFlow";
import ModalContent from "@/app/containers/modals/partials/ModalContent";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import TimePicker from "@/app/components/common/Timepicker";

interface SelectAppointmentTimeProps extends BookingFlowProps<RescheduleFlowStep> {
  date?: Date | null;
  handleDatetimeChange?: (date: Date) => void;
}

const SelectAppointmentTime = ({
  goTo,
  date,
  handleDatetimeChange,
}: SelectAppointmentTimeProps) => {
  const dictionary = useDictionaryContext();
  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle content={dictionary.general.pleaseSelectNewTime} />
        <ModalHeaderSubtitle
          content={dictionary.general.pleaseCommunicateWithCustomerBeforeChanging}
        />
      </ModalHeader>
      <ModalContent>
        <div className=" flex justify-center">
          <TimePicker use24h onTimeChange={handleDatetimeChange} date={date} />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => goTo("SelectAppointmentDate")}
          title={dictionary.general.back}
        />
        <Button
          size="fullwidth"
          onClick={() => goTo("AppointmentOverview")}
          title={dictionary.general.continue}
        />
      </ModalFooter>
    </>
  );
};

export default SelectAppointmentTime;
