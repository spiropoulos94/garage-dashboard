"use client";

import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps } from "../../RescheduleFlow/RescheduleFlow";
import ModalContent from "@/app/containers/modals/partials/ModalContent";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import RadioGroup from "@/app/components/common/inputs/RadioGroup";
import TextArea from "@/app/components/common/inputs/TextArea";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { CancelBookingFlowStep } from "@/app/containers/modals/flows/CancelBookingFlow/CancelBookingFlow";
import { CancelReason } from "@/app/types/booking";
import { useEffect, useState } from "react";

interface SelectCancelReasonProps extends BookingFlowProps<CancelBookingFlowStep> {
  handleReasonChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCommentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  reason?: CancelReason;
  comment?: string;
}
const SelectCancelReason = ({
  handleReasonChange,
  handleCommentChange,
  goTo,
  reason,
  comment,
  onEndFlow,
}: SelectCancelReasonProps) => {
  const dictionary = useDictionaryContext();
  const [btnDisabled, setBtnDisabled] = useState(true);

  const cancelReasons: { value: CancelReason; label: string | JSX.Element; name: CancelReason }[] =
    [
      { value: "CUSTOMER_WISH", label: dictionary.general.customersWish, name: "CUSTOMER_WISH" },
      {
        value: "CAR_DOES_NOT_MATCH_ORDER",
        label: dictionary.general.vehicleCannotBeProcessed,
        name: "CAR_DOES_NOT_MATCH_ORDER",
      },
      {
        value: "PART_DOES_NOT_FIT_CAR",
        label: dictionary.general.partsDoNotFit,
        name: "PART_DOES_NOT_FIT_CAR",
      },
      {
        value: "PART_NOT_AS_DESCRIBED",
        label: dictionary.general.partsNotAsDescribed,
        name: "PART_NOT_AS_DESCRIBED",
      },
      { value: "PART_MISSING", label: dictionary.general.noPartsDelivered, name: "PART_MISSING" },
      {
        value: "WORKSHOP_CANNOT_HANDLE_SERVICE",
        label: dictionary.general.workshopCannotHandleService,
        name: "WORKSHOP_CANNOT_HANDLE_SERVICE",
      },
      {
        value: "WORKSHOP_CANNOT_HANDLE_CAR",
        label: dictionary.general.workshopCannotHandleCar,
        name: "WORKSHOP_CANNOT_HANDLE_CAR",
      },
      {
        value: "WORKSHOP_AT_CAPACITY",
        label: dictionary.general.workshopAtCapacity,
        name: "WORKSHOP_AT_CAPACITY",
      },
      { value: "OTHER", label: dictionary.general.other, name: "OTHER" },
    ];

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle content={dictionary.general.doYouHaveProblemCompletingTheOrder} />
        <ModalHeaderSubtitle content={dictionary.general.pleaseSelectOneScenario} />
      </ModalHeader>
      <ModalContent>
        <RadioGroup onChange={handleReasonChange} options={cancelReasons} />
        {reason == "OTHER" && (
          <TextArea
            name="comment"
            label={dictionary.general.pleaseDescribeTheProblem}
            placeholder={dictionary.general.detailsAboutTheProblem}
            onChange={handleCommentChange}
          />
        )}
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
          onClick={() => goTo("ConfirmCancel")}
          title={dictionary.general.continue}
          disabled={(reason === "OTHER" && !comment) || !reason}
        />
      </ModalFooter>
    </>
  );
};

export default SelectCancelReason;
