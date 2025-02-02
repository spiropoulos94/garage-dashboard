"use client";

import { refreshTokenOnSession } from "@/app/actions/auth";
import NoBookings from "@/app/containers/bookings/NoBookings";
import { ErrorResponse } from "@/app/helpers/api";
import useModal from "@/app/hooks/useModal";
import { useEffect } from "react";

interface GeneralErrorProps {
  error: Error | ErrorResponse;
  reset?: () => void;
}

const GeneralError = ({ error }: GeneralErrorProps) => {
  const { open: openErrorModal } = useModal("ErrorModal", {});

  useEffect(() => {
    console.log("GeneralError", error);
    // Check if the error message includes 401 aka Token Invalid
    if (error?.message.includes("401")) {
      handleRefreshToken();
    } else {
      openErrorModal();
    }
  }, [error]);

  const handleRefreshToken = async () => {
    await refreshTokenOnSession();
    window.location.reload();
  };

  return (
    <>
      <NoBookings />{" "}
    </>
  );
};

export default GeneralError;
