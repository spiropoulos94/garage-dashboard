"use client";

import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps } from "../../RescheduleFlow/RescheduleFlow";
import ModalContent from "@/app/containers/modals/partials/ModalContent";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import { SubmitIssueFlowStep } from "@/app/containers/modals/flows/SubmitIssueFlow/SubmitIssueFlow";
import RadioGroup from "@/app/components/common/inputs/RadioGroup";
import TextArea from "@/app/components/common/inputs/TextArea";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { CancelReason } from "@/app/types/booking";

interface SubmitIssueProps extends BookingFlowProps<SubmitIssueFlowStep> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOtherIssueChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  reason: CancelReason | string;
}
const SelectIssue = ({
  handleChange,
  handleOtherIssueChange,
  goTo,
  reason,
  onEndFlow,
}: SubmitIssueProps) => {
  const dictionary = useDictionaryContext();

  const submitIssueReasons: {
    value: CancelReason;
    label: string | JSX.Element;
    name: CancelReason;
  }[] = [
    {
      value: "PART_DOES_NOT_FIT_CAR",
      label: dictionary.general.partsDoNotFit,
      name: "PART_DOES_NOT_FIT_CAR",
    },
    {
      value: "PART_NOT_AS_DESCRIBED",
      label: dictionary.general.partsAreDeliveredDamaged,
      name: "PART_NOT_AS_DESCRIBED",
    },
    {
      value: "PART_MISSING",
      label: dictionary.general.noPartsDelivered,
      name: "PART_MISSING",
    },
    {
      value: "CAR_DOES_NOT_MATCH_ORDER",
      label: dictionary.general.customerShowedUpWithDifferentVehicle,
      name: "CAR_DOES_NOT_MATCH_ORDER",
    },
    {
      value: "WORKSHOP_CANNOT_HANDLE_SERVICE",
      label: dictionary.general.bookedServiceIsNotOffered,
      name: "WORKSHOP_CANNOT_HANDLE_SERVICE",
    },
    {
      value: "WORKSHOP_CANNOT_HANDLE_CAR",
      label: dictionary.general.vehicleCannotBeProcessed,
      name: "WORKSHOP_CANNOT_HANDLE_CAR",
    },
    {
      value: "OTHER",
      label: dictionary.general.other,
      name: "OTHER",
    },
  ];

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle content={dictionary.general.doYouHaveProblemCompletingTheOrder} />
        <ModalHeaderSubtitle content={dictionary.general.pleaseSelectOneScenario} />
      </ModalHeader>
      <ModalContent>
        <RadioGroup onChange={handleChange} options={submitIssueReasons} />
        {reason === "OTHER" && (
          <TextArea
            name="description"
            label={dictionary.general.pleaseDescribeTheProblem}
            placeholder={dictionary.general.detailsAboutTheProblem}
            onChange={handleOtherIssueChange}
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
          onClick={() => goTo("SubmitIssue")}
          title={dictionary.general.continue}
        />
      </ModalFooter>
    </>
  );
};

export default SelectIssue;
