"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";

interface BookingsViewInternalNavProps {
  page: number;
  last_page: number;
  current_page: number;
}

const BookingsViewInternalNav = ({
  page,
  last_page,
  current_page,
}: BookingsViewInternalNavProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dictionary = useDictionaryContext();

  const previousPage = page - 1 > 1 ? page - 1 : 1;
  const nextPage = page + 1;

  // Function to preserve search parameters while updating the page
  const createLinkWithExistingParams = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    return {
      pathname,
      query: Object.fromEntries(params.entries()),
    };
  };

  return (
    <div className="bookingsViewInternalNav mb-2 flex justify-between">
      {current_page > 1 ? (
        <Link
          className=" border-0 bg-white text-blue-600 hover:text-blue-800"
          href={createLinkWithExistingParams(previousPage)}
        >
          {dictionary.general.previousPage}
        </Link>
      ) : (
        <div />
      )}
      {current_page < last_page && (
        <Link
          className=" border-0 bg-white text-blue-600 hover:text-blue-800"
          href={createLinkWithExistingParams(nextPage)}
        >
          {dictionary.general.nextPage}
        </Link>
      )}
    </div>
  );
};

export default BookingsViewInternalNav;
