import { Booking } from "@/app/types/booking";
import { useModalContext } from "../contexts/ModalContext";

const useModal = (
  modalFilename: string,
  meta?: {
    booking?: Booking; //in case we need to pass some booking data to the modal
  },
) => {
  const { openModal, closeModal, modalState } = useModalContext();

  const open = () => openModal(modalFilename, meta);

  const close = () => closeModal(modalFilename);

  const isOpen = modalState[modalFilename]?.open;

  return { open, close, isOpen };
};

export default useModal;
