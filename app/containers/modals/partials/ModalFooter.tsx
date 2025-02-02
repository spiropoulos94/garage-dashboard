interface ModalFooterProps {
  children: React.ReactNode;
}

const ModalFooter = ({ children }: ModalFooterProps) => {
  return (
    <div className="modalFooter flex flex-row items-center gap-3 rounded-b  border-gray-200  dark:border-gray-600">
      {children}
    </div>
  );
};

export default ModalFooter;
