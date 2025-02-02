"use client";

import { useState } from "react";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps } from "../../RescheduleFlow/RescheduleFlow";
import { AttendanceConfirmationFlowStep } from "../AttendanceConfirmationFlow";
import ModalContent from "@/app/containers/modals/partials/ModalContent";
import PinInput from "@/app/components/bookings/PinInput";
import BoxIcon from "@/app/components/common/BoxIcon";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { validateBookingPin } from "@/app/actions/bookings";
import { isErrorResponse, withAuthCheck } from "@/app/helpers/authHelpers";

const validateBookingPinWithAuthCheck = withAuthCheck(validateBookingPin);
interface InsertBookingPINProps extends BookingFlowProps<AttendanceConfirmationFlowStep> {
  bookingID: string;
}

const InsertBookingPIN = ({ goTo, onEndFlow, bookingID }: InsertBookingPINProps) => {
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [loading, setLoading] = useState(false);

  const dictionary = useDictionaryContext();

  const validatePin = async (pin: string) => {
    setLoading(true);
    try {
      const res = await validateBookingPinWithAuthCheck(bookingID, pin);
      if (isErrorResponse(res)) {
        throw new Error(res.message);
      }
      if (res.ok) {
        goTo("ServiceReady");
      }
    } catch (error) {
      setPinError(dictionary.general.pinIsNotCorrect);
    }
    setLoading(false);
  };

  return (
    <>
      <ModalHeader>
        <BoxIcon
          icon={<i className="fa-light fa-message-lines text-lg text-blue-600"></i>}
          alt="Attention"
          className="mb-5"
        />
        <ModalHeaderTitle content={dictionary.general.pleaseInsertBookingPin} />
        <ModalHeaderSubtitle content={dictionary.general.customerReceivedBookingPin} />
        {/* <div className="mt-5 text-sm font-normal leading-5 underline">
          {dictionary.general.sendPinToCustomerAgain}
        </div> */}
      </ModalHeader>
      <ModalContent>
        <PinInput className="py-6" setValue={setPin} error={pinError} />
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
          onClick={() => validatePin(pin)}
          title={dictionary.general.confirmPin}
          iconLeft={<i className="fa-regular fa-check mr-1"></i>}
          disabled={pin.length < 6}
          isLoading={loading}
        />
      </ModalFooter>
    </>
  );
};

export default InsertBookingPIN;
