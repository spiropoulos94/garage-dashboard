"use client";

import { useState } from "react";
import { BaseModal } from "@/app/containers/modals/base/BaseModal";
import useModal from "@/app/hooks/useModal";
import InsertBookingPIN from "./steps/InsertBookingPin";
import Serviceready from "./steps/ServiceReady";
import { Booking } from "@/app/types/booking";
import { LazyComponentProps } from "@/app/containers/modals/LazyComponent";

interface AttendanceConfirmationFlowProps extends LazyComponentProps {
  meta: { booking: Booking };
}

export type AttendanceConfirmationFlowStep = "InsertBookingPIN" | "ServiceReady";

const AttendanceConfirmationFlow = ({ meta }: AttendanceConfirmationFlowProps) => {
  const [step, setStep] = useState<AttendanceConfirmationFlowStep>("InsertBookingPIN");

  const { close: closeThisModal } = useModal("AttendanceConfirmationFlow");

  const renderStep = () => {
    switch (step) {
      case "InsertBookingPIN":
        return (
          <InsertBookingPIN
            onEndFlow={() => closeThisModal()}
            goTo={(next) => setStep(next)}
            bookingID={meta.booking.uuid}
          />
        );
      case "ServiceReady":
        return <Serviceready onEndFlow={() => closeThisModal()} goTo={(next) => setStep(next)} />;
      default:
        return null;
    }
  };

  return <BaseModal>{renderStep()}</BaseModal>;
};

export default AttendanceConfirmationFlow;
