"use client";

import Button from "@/app/components/common/buttons/Button";
import MenuItem, { MenuItemProps } from "@/app/components/common/MenuItem";
import BookingSecondaryFilters from "@/app/containers/bookings/filters/BookingSecondaryFilters";
import { findActiveItem } from "@/app/helpers/navigation";
import { BookingFilterItem } from "@/app/types/bookingFilters";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface TabsNavbarProps {
  items: MenuItemProps[];
  bookingFilters?: BookingFilterItem[];
}

const TabsNavbar = ({ items, bookingFilters }: TabsNavbarProps) => {
  const pathname = usePathname();
  const activeItem = findActiveItem(items, pathname);

  const [showSecondaryFilters, setShowSecondaryFilters] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    setShowSecondaryFilters(
      params.has("withoutVin") ||
        params.has("packageNotReceived") ||
        params.has("organizations[]") ||
        params.has("garages[]"),
    );
  }, []);

  return (
    <div className="tabsBavbarWrapper">
      <div className="tabsNavbar mb-2 flex flex-row items-center overflow-x-auto ">
        {items.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            className="mr-2 min-w-28 justify-center"
            isActive={item.href === activeItem?.href}
            totalItems={item.totalItems}
          />
        ))}
        <div className="ml-auto">
          <Button
            iconLeft={<i className="fa-thin fa-bars-filter mr-2"></i>}
            color="plain"
            title={"Filter"}
            onClick={() => setShowSecondaryFilters(!showSecondaryFilters)}
          />
        </div>
      </div>
      {showSecondaryFilters && bookingFilters && (
        <BookingSecondaryFilters filters={bookingFilters} />
      )}
    </div>
  );
};

export default TabsNavbar;
