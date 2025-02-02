interface ModalHeaderSubtitlerops {
  content: string;
}

const ModalHeaderSubtitle = ({ content }: ModalHeaderSubtitlerops) => {
  return <p className="text-sm font-normal leading-5 text-gray-500">{content}</p>;
};

export default ModalHeaderSubtitle;
