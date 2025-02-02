interface BoxIconProps {
  icon: React.ReactNode;
  src?: string;
  alt?: string;
  className?: string;
  dark?: boolean;
}

const BoxIcon = ({ src, alt, className, dark, icon }: BoxIconProps) => {
  return (
    <div
      className={`boxIcon flex h-10 w-10 items-center justify-center rounded-md ${dark ? "bg-blue-200" : "bg-blue-50"} ${className}`}
    >
      {icon}
    </div>
  );
};

export default BoxIcon;
