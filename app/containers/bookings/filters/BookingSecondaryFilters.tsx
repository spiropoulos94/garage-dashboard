"use client";

import BookingsSearchFilter from "./BookingsSearchFilter";
import { BookingFilterItem } from "@/app/types/bookingFilters";
import BookingOtherFilter from "@/app/containers/bookings/filters/BookingOtherFilter";
import BookingOrganizationsFilter from "@/app/containers/bookings/filters/BookingOrganizationsFilter";
import BookingGaragesFilter from "@/app/containers/bookings/filters/BookingGaragesFilter";

interface BookingSecondaryFiltersProps {
  filters: BookingFilterItem[];
}

const BookingSecondaryFilters = ({ filters }: BookingSecondaryFiltersProps) => {
  const orgsOptions = filters.find((filter) => filter.type === "organizations")?.options;
  const garagesOptions = filters.find((filter) => filter.type === "garages")?.options;

  return (
    <div className="my-4 flex w-full flex-wrap gap-4 p-2">
      {/* <BookingsSearchFilter /> */}
      <BookingOrganizationsFilter organizationOptions={orgsOptions || []} />
      <BookingGaragesFilter garageOptions={garagesOptions || []} />
      <BookingOtherFilter />
    </div>
  );
};

export default BookingSecondaryFilters;
