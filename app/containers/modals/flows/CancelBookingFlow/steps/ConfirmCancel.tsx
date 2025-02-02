import BoxIcon from "@/app/components/common/BoxIcon";
import Button from "@/app/components/common/buttons/Button";
import { BookingFlowProps } from "@/app/containers/modals/flows/RescheduleFlow/RescheduleFlow";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { CancelBookingFlowStep } from "@/app/containers/modals/flows/CancelBookingFlow/CancelBookingFlow";
import { Booking, CancelReason } from "@/app/types/booking";
import { cancelBooking } from "@/app/actions/bookings";
import { useState } from "react";
import { withAuthCheck } from "@/app/helpers/authHelpers";

const cancelBookingWithAuthCheck = withAuthCheck(cancelBooking);

interface ConfirmCancelProps extends BookingFlowProps<CancelBookingFlowStep> {
  booking: Booking;
  reason?: CancelReason;
  comment?: string;
}

const ConfirmCancel = ({ goTo, reason, comment, booking }: ConfirmCancelProps) => {
  const dictionary = useDictionaryContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancelBooking = async () => {
    setLoading(true);
    if (reason) {
      try {
        const updatedBooking = await cancelBookingWithAuthCheck(booking.uuid, reason, comment);
        goTo("CancelSuccess");
      } catch (e) {
        console.error(e);
        setError(dictionary.general.generalError);
      }
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
      {error && <div className="mb-4 text-center text-sm text-red-500">{error}</div>}
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          onClick={() => goTo("SelectCancelReason")}
          title={dictionary.general.back}
        />
        <Button
          disabled={!reason}
          size="fullwidth"
          onClick={() => handleCancelBooking()}
          title={dictionary.general.cancelBooking}
          iconLeft={<i className="fa-regular fa-ban mr-1 text-white"></i>}
          isLoading={loading}
        />
      </ModalFooter>
    </>
  );
};

export default ConfirmCancel;
