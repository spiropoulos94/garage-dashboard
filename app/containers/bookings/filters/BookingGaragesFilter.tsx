"use client";

import React from "react";
import { BookingFilterOption } from "@/app/types/bookingFilters";
import BookingSearchableListFilter from "@/app/containers/bookings/filters/BookingSearchableListFilter";

interface BookingGaragesFilterProps {
  garageOptions: BookingFilterOption[];
}

const BookingGaragesFilter = ({ garageOptions }: BookingGaragesFilterProps) => {
  return (
    <BookingSearchableListFilter filterKey="garages[]" title="Garages" options={garageOptions} />
  );
};

export default BookingGaragesFilter;
