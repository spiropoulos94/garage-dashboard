"use client";

import Button from "@/app/components/common/buttons/Button";
import { BaseModal } from "@/app/containers/modals/base/BaseModal";
import ModalContent from "@/app/containers/modals/partials/ModalContent";
import ModalFooter from "@/app/containers/modals/partials/ModalFooter";
import ModalHeader from "@/app/containers/modals/partials/ModalHeader/ModalHeader";
import ModalHeaderSubtitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderSubtitle";
import ModalHeaderTitle from "@/app/containers/modals/partials/ModalHeader/ModalHeaderTitle";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import useModal from "@/app/hooks/useModal";

interface ErrorModalProps {}

const ErrorModal = ({}: ErrorModalProps) => {
  const dictionary = useDictionaryContext();

  const { close } = useModal("ErrorModal", {});

  const handleClose = () => {
    close();
  };

  return (
    <BaseModal>
      <ModalHeader>
        <ModalHeaderTitle content={dictionary.general.generalErrorTitle} />
        <ModalHeaderSubtitle content={dictionary.general.generalErrorSubtitle} />
      </ModalHeader>
      <ModalContent>
        <p className="text-center text-sm font-normal leading-5 text-gray-500">
          {dictionary.general.generalErrorContent}
        </p>
      </ModalContent>
      <ModalFooter>
        <Button
          size="fullwidth"
          title={dictionary.general.close}
          onClick={() => handleClose()}
          color="plain"
        />
      </ModalFooter>
    </BaseModal>
  );
};

export default ErrorModal;
