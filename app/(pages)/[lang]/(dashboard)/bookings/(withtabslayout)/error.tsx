"use client"; // Error components must be Client Components

import GeneralError from "@/app/components/common/GeneralError";

export default function BookingsError({ error }: { error: Error; reset: () => void }) {
  return (
    <div className="bookingsError">
      <GeneralError error={error} />
    </div>
  );
}
