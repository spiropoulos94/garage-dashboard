import BoxIcon from "@/app/components/common/BoxIcon";
import Button from "@/app/components/common/buttons/Button";
import { CancelBookingFlowStep } from "@/app/containers/modals/flows/CancelBookingFlow/CancelBookingFlow";
import { BookingFlowProps } from "@/app/containers/modals/flows/RescheduleFlow/RescheduleFlow";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

interface CancelSuccessProps extends BookingFlowProps<CancelBookingFlowStep> {}

const CancelSuccess = ({ onEndFlow }: CancelSuccessProps) => {
  const dictionary = useDictionaryContext();
  return (
    <>
      <ModalHeader>
        <BoxIcon
          icon={<i className="fa-regular fa-circle-x text-lg text-blue-600"></i>}
          alt="Attention"
          className="mb-5"
        />
        <ModalHeaderTitle content={dictionary.general.bookingCancelled} />
        <ModalHeaderSubtitle content={dictionary.general.thanksForYourCooperation} />
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

export default CancelSuccess;
