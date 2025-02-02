import BannerWithIcon from "@/app/components/common/BannerWithIcon";
import BoxIcon from "@/app/components/common/BoxIcon";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps } from "@/app/containers/modals/flows/RescheduleFlow/RescheduleFlow";
import { SubmitIssueFlowStep } from "@/app/containers/modals/flows/SubmitIssueFlow/SubmitIssueFlow";
import ModalContent from "@/app/containers/modals/partials/ModalContent";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

interface BookingCancelledProps extends BookingFlowProps<SubmitIssueFlowStep> {}

const BookingCancelled = ({ onEndFlow, goTo }: BookingCancelledProps) => {
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

export default BookingCancelled;
