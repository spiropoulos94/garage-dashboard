import Image from "next/image";

interface LargeIconProps {
  icon: string;
}

const LargeIcon = ({ icon }: LargeIconProps) => {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
      <Image src={icon} alt="icon" width={40} height={40} />
    </div>
  );
};

export default LargeIcon;
