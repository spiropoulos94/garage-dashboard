interface ModalHeaderProps {
  children: React.ReactNode;
}

const ModalHeader = ({ children }: ModalHeaderProps) => {
  return (
    <div className="modalHeader mb-6 flex flex-col items-center justify-between rounded-t text-center  dark:border-gray-600">
      {children}
    </div>
  );
};

export default ModalHeader;
