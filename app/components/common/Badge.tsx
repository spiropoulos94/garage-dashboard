export interface BadgeProps {
  text: React.ReactNode;
  status: "success" | "error" | "warning" | "secondary" | "custom";
  className?: string;
}

const Badge = ({ text, status, className }: BadgeProps) => {
  let statusClassName: string;

  switch (status) {
    case "success":
      statusClassName = "bg-emerald-100 text-emerald-800";
      break;
    case "warning":
      statusClassName = "bg-amber-100 text-amber-800";
      break;
    case "error":
      statusClassName = "bg-red-100 text-red-800";
      break;
    case "secondary":
      statusClassName = "bg-gray-100 text-gray-800";
      break;

    case "custom":
    default:
      statusClassName = ""; // Default to an empty string if status is unknown
      break;
  }
  return (
    <div
      className={`flex w-fit flex-row items-center rounded-lg  px-2.5 py-0.5 text-xs font-medium  ${statusClassName} ${className}`}
    >
      {text}
    </div>
  );
};

export default Badge;
