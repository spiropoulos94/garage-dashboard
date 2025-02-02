import { getDictionary } from "../../../dictionaries/dictionaries";
import { Suspense } from "react";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import BookingsView from "@/app/containers/bookings/BookingsView";
import { redirect } from "next/navigation";
export interface BookingsPageProps {
  params: {
    lang: string;
  };
  searchParams: {
    page: number;
  };
}

const Bookings = async ({ params, searchParams }: BookingsPageProps) => {
  const t = await getDictionary(params.lang || "en_US");

  return (
    <div className="bookingsPage ">
      <Suspense fallback={<LoadingSpinner />} key={JSON.stringify(searchParams)}>
        <BookingsView searchParams={searchParams} dictionary={t} />
      </Suspense>
    </div>
  );
};

export default Bookings;
