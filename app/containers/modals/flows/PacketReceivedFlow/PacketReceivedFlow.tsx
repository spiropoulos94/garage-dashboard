"use client";

import { useState } from "react";
import { BaseModal } from "@/app/containers/modals/base/BaseModal";
import useModal from "@/app/hooks/useModal";
import PacketReceivalConfirmation from "./steps/PacketReceivalConfirmation";
import ReceiptConfirmed from "./steps/ReceiptConfirmed";
import { Booking } from "@/app/types/booking";
import { LazyComponentProps } from "@/app/containers/modals/LazyComponent";

interface PacketReceivedFlowProps extends LazyComponentProps {
  meta: { booking: Booking };
}

export type PacketReceivedFlowStep = "PacketReceivalConfirmation" | "ReceiptConfirmed";

const PacketReceivedFlow = ({ meta }: PacketReceivedFlowProps) => {
  const [step, setStep] = useState<PacketReceivedFlowStep>("PacketReceivalConfirmation");

  const { close: closeThisModal } = useModal("PacketReceivedFlow");

  const renderStep = () => {
    switch (step) {
      case "PacketReceivalConfirmation":
        return (
          <PacketReceivalConfirmation
            booking={meta.booking}
            onEndFlow={() => closeThisModal()}
            goTo={(next) => setStep(next)}
          />
        );
      case "ReceiptConfirmed":
        return (
          <ReceiptConfirmed onEndFlow={() => closeThisModal()} goTo={(next) => setStep(next)} />
        );
      default:
        return null;
    }
  };

  return <BaseModal>{renderStep()}</BaseModal>;
};

export default PacketReceivedFlow;
