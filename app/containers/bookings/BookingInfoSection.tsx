import Image from "next/image";
import BookingInfoSectionBody from "./partials/BookingInfoSectionBody";
import Badge, { BadgeProps } from "@/app/components/common/Badge";

interface BookingInfoSectionProps {
  title: string;
  icon: React.ReactNode;
  rows?: {
    title: string;
    value: string | React.ReactNode;
  }[];
  textContent?: string;
  className?: string;
  titleBadge?: {
    status: BadgeProps["status"];
    text: BadgeProps["text"];
  };
}

const BookingInfoSection = ({
  title,
  icon,
  rows,
  textContent,
  titleBadge,
}: BookingInfoSectionProps) => {
  return (
    <div className="bookingInfoSection">
      <div className="header mb-4 flex flex-row items-center">
        <div className="relative mr-4 flex h-10 w-10 min-w-10 items-center justify-center rounded-md bg-blue-50 p-2">
          {icon}
        </div>
        <div className="text-base font-medium capitalize leading-6">{title}</div>
        {titleBadge && (
          <Badge status={titleBadge.status} text={titleBadge.text} className="ml-4"></Badge>
        )}
      </div>
      <BookingInfoSectionBody
        textContent={textContent}
        rows={rows}
        className="ml-14 mr-6 sm:mx-14"
      />
    </div>
  );
};

export default BookingInfoSection;
