interface ModalHeaderTitleProps {
  content: string;
}

const ModalHeaderTitle = ({ content }: ModalHeaderTitleProps) => {
  return <h3 className="mb-2 text-lg font-medium leading-6">{content}</h3>;
};

export default ModalHeaderTitle;
