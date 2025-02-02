import ModalContent from "@/app/containers/modals/partials/ModalContent";
import RadioGroup from "@/app/components/common/inputs/RadioGroup";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps, RescheduleFlowStep } from "../RescheduleFlow";
import TextArea from "@/app/components/common/inputs/TextArea";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import { Booking, CancelReason } from "@/app/types/booking";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

interface RescheduleReasonProps extends BookingFlowProps<RescheduleFlowStep> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCommentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  reason?: CancelReason;
  comment?: string;
}

const RescheduleReason = ({
  handleChange,
  handleCommentChange,
  reason,
  comment,
  onEndFlow,
  goTo,
}: RescheduleReasonProps) => {
  const dictionary = useDictionaryContext();

  const reschedulingReasons: {
    value: CancelReason;
    label: string | JSX.Element;
    name: CancelReason;
  }[] = [
    {
      value: "CUSTOMER_WISH",
      label: dictionary.general.customersWish,
      name: "CUSTOMER_WISH",
    },
    {
      value: "WORKSHOP_AT_CAPACITY",
      label: dictionary.general.notEnoughWorkersOnThisDay,
      name: "WORKSHOP_AT_CAPACITY",
    },
    {
      value: "PART_MISSING",
      label: dictionary.general.partsWontArriveOnTime,
      name: "PART_MISSING",
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
        <ModalHeaderTitle content={dictionary.general.whatsTheReasonOfChange} />
        <ModalHeaderSubtitle content={dictionary.general.pleaseProvideReasonOfChange} />
      </ModalHeader>
      <ModalContent>
        <RadioGroup onChange={handleChange} options={reschedulingReasons} />
        {reason === "OTHER" && (
          <TextArea
            name="reason"
            label={dictionary.general.pleaseStateTheReason}
            placeholder={dictionary.general.detailsAboutTheChange}
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
          onClick={() => goTo("DidCustomerAccept")}
          title={dictionary.general.continue}
          disabled={!reason || (reason === "OTHER" && !comment)}
        />
      </ModalFooter>
    </>
  );
};

export default RescheduleReason;
