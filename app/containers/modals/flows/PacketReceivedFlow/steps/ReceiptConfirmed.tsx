import BoxIcon from "@/app/components/common/BoxIcon";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps } from "@/app/containers/modals/flows/RescheduleFlow/RescheduleFlow";
import { PacketReceivedFlowStep } from "@/app/containers/modals/flows/PacketReceivedFlow/PacketReceivedFlow";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

interface PacketReceivalConfirmationProps extends BookingFlowProps<PacketReceivedFlowStep> {}

const ReceiptConfirmed = ({ onEndFlow }: PacketReceivalConfirmationProps) => {
  const dictionary = useDictionaryContext();
  return (
    <>
      <ModalHeader>
        <BoxIcon
          icon={<i className="fa-light fa-thumbs-up text-lg text-blue-600"></i>}
          alt="Attention"
          className="mb-5"
        />
        <ModalHeaderTitle content={dictionary.general.receiptConfirmed} />
        <ModalHeaderSubtitle content={dictionary.general.thanksForInformationReceiptIsRequired} />
      </ModalHeader>
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => onEndFlow && onEndFlow()}
          title={dictionary.general.close}
        />
      </ModalFooter>
    </>
  );
};

export default ReceiptConfirmed;
