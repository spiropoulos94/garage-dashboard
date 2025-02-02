import { MenuItemProps } from "@/app/components/common/MenuItem";
import PageInfo from "@/app/components/common/PageInfo";
import TabsNavbar from "@/app/containers/Navigation/TabsNavbar";
import { getDictionary } from "../../../dictionaries/dictionaries";
import { ReactNode } from "react";
import { getBookings } from "@/app/actions/bookings";
import { isErrorResponse } from "@/app/helpers/authHelpers";
import GeneralError from "@/app/components/common/GeneralError";
import { getAllUserBookingFilters } from "@/app/actions/bookingFilters";

interface BookingsLayoutProps {
  children?: ReactNode;
  params: {
    lang: string;
  };
}

const BookingsLayout = async ({ children, params }: BookingsLayoutProps) => {
  const t = await getDictionary(params.lang || "en_US");

  // we use the unconfirmedBookingsResponse to display a pill with the number of unconfirmed bookings
  const unconfirmedBookingsResponse = await getBookings({ preset: "unconfirmed" });
  if (isErrorResponse(unconfirmedBookingsResponse)) {
    return <GeneralError error={unconfirmedBookingsResponse} />;
  }

  const filtersResponse = await getAllUserBookingFilters();
  if (isErrorResponse(filtersResponse)) {
    return <GeneralError error={filtersResponse} />;
  }

  const { total: totalUnconfirmed } = unconfirmedBookingsResponse;

  const bookingsSubRoutes: MenuItemProps[] = [
    { href: "/bookings", title: t.bookings.upcoming },
    { href: "/bookings/unconfirmed", title: t.bookings.unconfirmed, totalItems: totalUnconfirmed },
    { href: "/bookings/past", title: t.bookings.past },
    { href: "/bookings/cancelled", title: t.bookings.cancelled },
  ];

  return (
    <div>
      <PageInfo title={t.bookings.pageTitle} description={t.bookings.pageDescription} />
      <TabsNavbar items={bookingsSubRoutes} bookingFilters={filtersResponse.filters} />

      {children}
    </div>
  );
};

export default BookingsLayout;
