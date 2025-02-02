"use client";

import React from "react";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import { BookingFilterOption } from "@/app/types/bookingFilters";
import BookingSearchableListFilter from "@/app/containers/bookings/filters/BookingSearchableListFilter";

interface BookingOrganizationsFilterProps {
  organizationOptions: BookingFilterOption[];
}

const BookingOrganizationsFilter = ({ organizationOptions }: BookingOrganizationsFilterProps) => {
  const { general } = useDictionaryContext();

  return (
    <BookingSearchableListFilter
      filterKey="organizations[]"
      title={general.organizations}
      options={organizationOptions}
    />
  );
};

export default BookingOrganizationsFilter;
