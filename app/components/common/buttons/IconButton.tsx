import Image from "next/image";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: (e?: any) => void;
}

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center rounded-lg  p-6 text-center text-sm font-medium text-white"
    >
      {icon}
    </button>
  );
};

export default IconButton;
