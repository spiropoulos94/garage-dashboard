"use client";

import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { Customer } from "@/app/types/booking";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BookingPageTitleProps {
  product: string;
  customer?: Customer;
  className?: string;
}

const BookingPageTitle = ({ product, customer, className }: BookingPageTitleProps) => {
  const router = useRouter();
  const dictionary = useDictionaryContext();

  return (
    <div className={`BookingPageTitle flex flex-row items-center ${className}`}>
      <Link href={"/bookings"} className="mr-2">
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <div>
        <h1 className="text-xl font-medium leading-7">
          {product} {dictionary.general.for} {customer?.firstName} {customer?.lastName}
        </h1>
        <p className="mt-2 text-sm font-normal leading-5">
          {dictionary.bookings.bookingDetailView}
        </p>
      </div>
    </div>
  );
};

export default BookingPageTitle;
