"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Searchbar from "@/app/components/common/inputs/Searchbar";

const BookingsSearchFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  // Load initial search value from query params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const searchTerm = params.get("searchTerm");

    if (searchTerm) {
      setSearchInputValue(searchTerm);
      setDebouncedValue(searchTerm);
    }
  }, [searchParams]);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchInputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInputValue]);

  // Update URL params when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) {
      params.set("searchTerm", debouncedValue);
    } else {
      params.delete("searchTerm");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedValue, pathname, searchParams, router]);

  // Clear search term on pathname change
  useEffect(() => {
    setSearchInputValue("");
    setDebouncedValue("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("searchTerm");
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname]);

  return (
    <div>
      <Searchbar
        handleInput={(value) => setSearchInputValue(value)}
        placeholder="Search..."
        value={searchInputValue}
      />
    </div>
  );
};

export default BookingsSearchFilter;