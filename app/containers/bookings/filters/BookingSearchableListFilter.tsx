"use client";

import React, { useEffect, useState } from "react";
import SearchableCheckBoxDropdown from "@/app/components/common/inputs/SearchableCheckBoxDropdown";
import { BookingFilterOption } from "@/app/types/bookingFilters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BookingSearchableListFilterProps {
  filterKey: string; // The query parameter key, e.g., "organizations[]" or "garages[]"
  title: string; // Title of the dropdown
  options: BookingFilterOption[];
}

const BookingSearchableListFilter = ({
  filterKey,
  title,
  options,
}: BookingSearchableListFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectionChange = (selected: string[]) => {
    setSelectedValues(selected);
    const params = new URLSearchParams(searchParams.toString());

    // Clear any existing keys to avoid duplicates
    params.delete(filterKey);

    // Add each selected value as an individual entry
    selected.forEach((value) => {
      params.append(filterKey, value);
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  // Initialize state from query parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialSelected = params.getAll(filterKey);
    setSelectedValues(initialSelected);
  }, [searchParams, filterKey]);

  return (
    <SearchableCheckBoxDropdown
      title={title}
      options={options}
      preSelectedValues={[...selectedValues]}
      onChange={handleSelectionChange}
    />
  );
};

export default BookingSearchableListFilter;
