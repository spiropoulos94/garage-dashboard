interface ModalContentProps {
  children: React.ReactNode;
}

const ModalContent = ({ children }: ModalContentProps) => {
  return <div className="modalContent mb-6">{children}</div>;
};

export default ModalContent;
