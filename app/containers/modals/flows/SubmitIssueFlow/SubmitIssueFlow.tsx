"use client";

import { useState } from "react";
import { BaseModal } from "@/app/containers/modals/base/BaseModal";
import useModal from "@/app/hooks/useModal";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { Booking, CancelReason } from "@/app/types/booking";
import { LazyComponentProps } from "@/app/containers/modals/LazyComponent";
import BookingCancelled from "@/app/containers/modals/flows/SubmitIssueFlow/steps/BookingCancelled";
import SelectIssue from "@/app/containers/modals/flows/SubmitIssueFlow/steps/SelectIssue";
import SubmitIssue from "@/app/containers/modals/flows/SubmitIssueFlow/steps/SubmitIssue";
import SubmitIssueContactSupport from "@/app/containers/modals/flows/SubmitIssueFlow/steps/SubmitIssueContactSupport";

interface SubmitIssueFlowProps extends LazyComponentProps {
  meta: { booking: Booking };
}

export type SubmitIssueFlowStep = "SelectIssue" | "SubmitIssue" | "BookingCancelled" | "ContactSupport";

const SubmitIssueFlow = ({ meta }: SubmitIssueFlowProps) => {
  const [step, setStep] = useState<SubmitIssueFlowStep>("ContactSupport"); // TODO: Change to "SelectIssue" when reverting it back

  const [reason, setReason] = useState<CancelReason | string>("");
  const [comment, setComment] = useState<string>("");

  const { close: closeThisModal } = useModal("SubmitIssueFlow");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value as CancelReason);
  };

  const handleOtherIssueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const flowEnd = () => {
    // TODO: submit the issue on the backend
    // submitIssue(issue, otherIssue);
    closeThisModal();
  };

  const renderStep = () => {
    switch (step) {
      case "ContactSupport":
        return <SubmitIssueContactSupport onClose={closeThisModal} />;
      case "SelectIssue":
        return (
          <SelectIssue
            onEndFlow={() => closeThisModal()}
            handleChange={handleChange}
            handleOtherIssueChange={handleOtherIssueChange}
            reason={reason}
            goTo={(next) => setStep("SubmitIssue")}
          />
        );
      case "SubmitIssue":
        return (
          <SubmitIssue
            goTo={(next) => setStep(next)}
            booking={meta.booking}
            reason={reason as CancelReason}
            comment={comment}
          />
        );
      case "BookingCancelled":
        return <BookingCancelled onEndFlow={() => flowEnd()} goTo={(next) => setStep(next)} />;
      default:
        return null;
    }
  };

  return <BaseModal>{renderStep()}</BaseModal>;
};

export default SubmitIssueFlow;
