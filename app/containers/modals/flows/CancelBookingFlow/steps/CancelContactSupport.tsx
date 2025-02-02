import BoxIcon from "@/app/components/common/BoxIcon";
import Button from "@/app/components/common/buttons/Button";
import ModalContent from "@/app/containers/modals/partials/ModalContent";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

interface CancelContactSupportProps {
  onClose?: () => void;
}

const CancelContactSupport = ({ onClose }: CancelContactSupportProps) => {
  const dictionary = useDictionaryContext();

  return (
    <>
      <ModalHeader>
        <BoxIcon
          icon={<i className="fa-regular fa-circle-x text-lg text-blue-600"></i>}
          alt="Attention"
          className="mb-5"
        />
        <ModalHeaderTitle content={dictionary.bookings.pleaseContactRepareo} />
        <ModalContent>
          <p className="text-center text-sm font-normal leading-5 text-gray-500">
            <p>{dictionary.bookings.areYouSureCancel}</p>
            <br />
            <p>{dictionary.bookings.pleaseContactSupport}</p>
            <br />
            <p>
              {dictionary.general.phone}
              <a href="tel:+4989244182014" className="text-blue-600 underline">
                +49 89 244182014
              </a>
            </p>
            <p>
              {dictionary.general.sms}
              <a href="tel:+4915888279024" className="text-blue-600 underline">
                +49 1588 8279024
              </a>
            </p>
            <p>
              {dictionary.general.email}
              <a href="mailto:support@repareo.de" className="text-blue-600 underline">
                support@repareo.de
              </a>
            </p>

            <p className="mt-2">{dictionary.bookings.thankYou}</p>
          </p>
        </ModalContent>
      </ModalHeader>
      <ModalFooter>
        <Button
          size="fullwidth"
          color="plain"
          title={dictionary.general.close}
          onClick={() => onClose && onClose()}
        />
      </ModalFooter>
    </>
  );
};

export default CancelContactSupport;
