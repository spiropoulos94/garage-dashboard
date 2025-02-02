"use client"; // Error components must be Client Components

import GeneralError from "@/app/components/common/GeneralError";

export default function SingleBookingError({ error }: { error: Error; reset: () => void }) {
  return (
    <div className="singleBookingError">
      <GeneralError error={error} />
    </div>
  );
}
