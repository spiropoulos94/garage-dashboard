"use client";

import { useEffect, useState } from "react";
import { BaseModal } from "@/app/containers/modals/base/BaseModal";
import useModal from "@/app/hooks/useModal";
import { Booking, CancelReason } from "@/app/types/booking";
import { LazyComponentProps } from "@/app/containers/modals/LazyComponent";
import SelectCancelReason from "@/app/containers/modals/flows/CancelBookingFlow/steps/SelectCancelReason";
import ConfirmCancel from "@/app/containers/modals/flows/CancelBookingFlow/steps/ConfirmCancel";
import CancelSuccess from "@/app/containers/modals/flows/CancelBookingFlow/steps/CancelSuccess";
import { cancelBooking } from "@/app/actions/bookings";
import CancelContactSupport from "@/app/containers/modals/flows/CancelBookingFlow/steps/CancelContactSupport";

interface CancelBookingFlowProps extends LazyComponentProps {
  meta: { booking: Booking };
}

export type CancelBookingFlowStep =
  | "SelectCancelReason"
  | "ConfirmCancel"
  | "CancelSuccess"
  | "ContactSupport";

const CancelBookingFlow = ({ meta }: CancelBookingFlowProps) => {
  const [step, setStep] = useState<CancelBookingFlowStep>("ContactSupport"); // TODO: Change to "SelectCancelReason" when reverting it back

  const [reason, setReason] = useState<CancelReason | undefined>(undefined);
  const [comment, setComment] = useState<string>("");

  const { close: closeThisModal } = useModal("CancelBookingFlow");

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as CancelReason;
    setReason(value);
  };

  useEffect(() => {
    if (reason !== "OTHER") {
      setComment("");
    }
  }, [reason]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const renderStep = () => {
    switch (step) {
      case "ContactSupport":
        return <CancelContactSupport onClose={closeThisModal} />;
      case "SelectCancelReason":
        return (
          <SelectCancelReason
            reason={reason}
            comment={comment}
            onEndFlow={() => closeThisModal()}
            goTo={(next) => setStep(next)}
            handleCommentChange={handleCommentChange}
            handleReasonChange={handleReasonChange}
          />
        );
      case "ConfirmCancel":
        return (
          <ConfirmCancel
            goTo={(next) => setStep(next)}
            onEndFlow={closeThisModal}
            booking={meta.booking}
            reason={reason}
            comment={comment}
          />
        );
      case "CancelSuccess":
        return <CancelSuccess goTo={(next) => setStep(next)} onEndFlow={closeThisModal} />;
      default:
        return null;
    }
  };

  return <BaseModal>{renderStep()}</BaseModal>;
};

export default CancelBookingFlow;
