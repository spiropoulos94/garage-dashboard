"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Card from "@/app/components/common/Card";
import LargeIcon from "@/app/components/common/LargeIcon";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import Button from "@/app/components/common/buttons/Button";

interface NoBookingsProps {
  title?: string;
  description?: string;
}

const NoBookings = ({ title, description }: NoBookingsProps) => {
  const dictionary = useDictionaryContext();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const hasFilters = searchParams.toString() !== "";

  const clearFilters = () => {
    router.push(pathname); // Removes query parameters and keeps the base path
  };

  return (
    <Card className="mt-2 flex h-80 items-center justify-center border-2 border-dotted pt-5">
      <div className="flex flex-col items-center">
        {hasFilters ? <LargeIcon icon="/images/icons/svg/barsFilter.svg" /> : <LargeIcon icon="/images/icons/svg/CalendarBlack.svg" />}
        <div className="flex flex-col items-center pt-6">
          <h3 className="mb-2 text-center text-xl font-medium leading-7">
            {hasFilters
              ? dictionary.bookings.noBookingExistTitleWithFilters
              : title || dictionary.bookings.noBookingExistTitle}
          </h3>
          <p className="text-center text-sm font-normal leading-5">
            {hasFilters
              ? dictionary.bookings.noBookingExistDescriptionWithFilters
              : description || dictionary.bookings.noBookingExistDescription}
          </p>
          {hasFilters && (
            <div className="mt-6">
              <Button
                onClick={clearFilters}
                title={dictionary.bookings.removeAllFilters}
                color="secondary"
                iconRight={<div className="ml-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white">
                  <i className="fa-solid fa-times text-xs"></i></div>}
              /></div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NoBookings;