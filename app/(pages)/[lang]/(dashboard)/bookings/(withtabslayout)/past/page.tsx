import { BookingsPageProps } from "@/app/(pages)/[lang]/(dashboard)/bookings/(withtabslayout)/page";
import { getDictionary } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import BookingsView from "@/app/containers/bookings/BookingsView";
import { Suspense } from "react";

interface PastBookingsProps extends BookingsPageProps {}

const PastBookings = async ({ params, searchParams }: PastBookingsProps) => {
  const t = await getDictionary(params.lang || "en_US");
  return (
    <div className="PastBookingsPage ">
      <Suspense fallback={<LoadingSpinner />} key={JSON.stringify(searchParams)}>
        <BookingsView searchParams={searchParams} dictionary={t} preset="past" />
      </Suspense>
    </div>
  );
};

export default PastBookings;
