import { cancelBooking } from "@/app/actions/bookings";
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
import { Booking, CancelReason } from "@/app/types/booking";
import { useState } from "react";
import { withAuthCheck } from "@/app/helpers/authHelpers";

const cancelBookingWithAuthCheck = withAuthCheck(cancelBooking);

interface IssueSubmittedProps extends BookingFlowProps<SubmitIssueFlowStep> {
  booking: Booking;
  reason: CancelReason;
  comment?: string;
}

const SubmitIssue = ({ goTo, booking, reason, comment }: IssueSubmittedProps) => {
  const dictionary = useDictionaryContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const submitIssue = async () => {
    setLoading(true);
    try {
      const updatedBooking = await cancelBookingWithAuthCheck(booking.uuid, reason, comment);
      goTo("BookingCancelled");
    } catch (e) {
      console.log(e);
      setError(dictionary.general.generalError);
    }
    setLoading(false);
  };

  return (
    <>
      <ModalHeader>
        <BoxIcon
          icon={<i className="fa-light fa-face-sad-tear text-lg text-blue-600"></i>}
          alt="Attention"
          className="mb-5"
        />
        <ModalHeaderTitle content={dictionary.general.ohDearAnnoying} />
        <ModalHeaderTitle content={dictionary.general.thisIsHowItContinues} />
        <ModalHeaderSubtitle
          content={dictionary.general.sinceTheAppointmentIsNotPossibleExplanation}
        />
      </ModalHeader>
      <ModalContent>
        <BannerWithIcon
          icon={<i className={`fa-light fa-box  text-lg text-blue-600`} />}
          topText={dictionary.general.youCanMakeCustomerAnOffer}
          bottomText={dictionary.general.feelFreeToArrangeNewAppointment}
        />
        {error && <p className=" mt-2 text-center text-red-500">{error}</p>}
      </ModalContent>
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => goTo("SelectIssue")}
          title={dictionary.general.back}
        />
        <Button
          size="fullwidth"
          onClick={() => submitIssue()}
          title={dictionary.general.cancelBooking}
          iconLeft={<i className="fa-regular fa-ban mr-1"></i>}
          isLoading={loading}
        />
      </ModalFooter>
    </>
  );
};

export default SubmitIssue;
