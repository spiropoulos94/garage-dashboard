"use client";

import { useEffect, useState } from "react";
import { BaseModal } from "@/app/containers/modals/base/BaseModal";
import useModal from "@/app/hooks/useModal";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import RescheduleReason from "./steps/RescheduleReason";
import DidCustomerAccept from "./steps/DidCustomerAccept";
import CustomerDidNotAccept from "./steps/CustomerDidNotAccept";
import SelectAppointmentDate from "./steps/SelectAppointmentDate";
import AppointmentOverview from "./steps/AppointmentOverview";
import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import { Booking, CancelReason } from "@/app/types/booking";
import { LazyComponentProps } from "@/app/containers/modals/LazyComponent";
import RescheduleSuccess from "@/app/containers/modals/flows/RescheduleFlow/steps/RescheduleSuccess";
import SelectAppointmentTime from "@/app/containers/modals/flows/RescheduleFlow/steps/SelectAppointmentTime";
import { rescheduleBooking } from "@/app/actions/bookings";
import { withAuthCheck } from "@/app/helpers/authHelpers";

const rescheduleBookingWithAuthCheck = withAuthCheck(rescheduleBooking);

// these types are used in each of the nested modal steps
export interface BookingFlowProps<T> {
  goTo: (next: T) => void;
  onEndFlow?: () => void;
}
interface RescheduleFlowProps extends LazyComponentProps {
  meta: { booking: Booking };
}

export type RescheduleFlowStep =
  | "RescheduleReason"
  | "DidCustomerAccept"
  | "CustomerDidNotAccept"
  | "SelectAppointmentDate"
  | "SelectAppointmentTime"
  | "AppointmentOverview"
  | "RescheduleSuccess";

const RescheduleFlow = ({ meta }: RescheduleFlowProps) => {
  const [reason, setReason] = useState<CancelReason | undefined>(undefined);
  const [comment, setComment] = useState<string>("");
  const [step, setStep] = useState<RescheduleFlowStep>("RescheduleReason");
  const [newAppointmentDateTime, setNewAppointmentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    if (reason !== "OTHER") {
      setComment("");
    }
  }, [reason]);

  const { close: closeThisModal } = useModal("RescheduleFlowFlow");

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as CancelReason;
    setReason(value);
  };
  const handleDateTimeChange = (date: Date) => {
    setNewAppointmentDateTime(date);
  };

  const handlecommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const submitReschedule = async () => {
    // TODO: submit the reason on the backend
    if (newAppointmentDateTime == null || !reason) {
      return;
    }

    const newBooking = await rescheduleBookingWithAuthCheck(
      meta.booking.uuid,
      newAppointmentDateTime?.toISOString(),
      reason,
      comment,
    );

    return newBooking;
  };

  const flowEnd = () => {
    closeThisModal();
  };

  const renderStep = () => {
    switch (step) {
      case "RescheduleReason":
        return (
          <RescheduleReason
            handleChange={handleReasonChange}
            handleCommentChange={handlecommentChange}
            reason={reason}
            comment={comment}
            onEndFlow={() => closeThisModal()}
            goTo={(next) => setStep(next)}
          />
        );
      case "DidCustomerAccept":
        return <DidCustomerAccept goTo={(next) => setStep(next)} />;
      case "CustomerDidNotAccept":
        return (
          <CustomerDidNotAccept goTo={(next) => setStep(next)} onEndFlow={() => closeThisModal()} />
        );
      case "SelectAppointmentDate":
        return (
          <SelectAppointmentDate
            goTo={(next) => setStep(next)}
            handleDateChange={handleDateTimeChange}
          />
        );
      case "SelectAppointmentTime":
        return (
          <SelectAppointmentTime
            goTo={(next) => setStep(next)}
            date={newAppointmentDateTime}
            handleDatetimeChange={setNewAppointmentDateTime}
          />
        );
      case "AppointmentOverview":
        return (
          <AppointmentOverview
            booking={meta.booking}
            goTo={(next) => setStep(next)}
            submit={submitReschedule}
            appointmentDateTime={newAppointmentDateTime}
          />
        );
      case "RescheduleSuccess":
        return <RescheduleSuccess goTo={(next) => setStep(next)} onEndFlow={() => flowEnd()} />;
      default:
        return null;
    }
  };

  return <BaseModal>{renderStep()}</BaseModal>;
};

export default RescheduleFlow;
