"use client";

import MenuItem, { MenuItemProps } from "@/app/components/common/MenuItem";
import Image from "next/image";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { findActiveItem } from "@/app/helpers/navigation";
import { useDictionaryContext } from "@/app/contexts/DictionaryContext";
import HelpBox from "@/app/components/common/HelpBox";
import SidebarUserSection from "@/app/components/common/SidebarUserSection";

interface SidebarProps {
  backgroundColor?: string;
  items?: MenuItemProps[];
  setIsOpen?: (isOpen: boolean) => void;
  className?: string;
}

const Sidebar = ({ backgroundColor, items, className, setIsOpen }: SidebarProps) => {
  const pathname = usePathname();

  const activeItem = items ? findActiveItem(items, pathname) : null;

  const dictionary = useDictionaryContext();

  useEffect(() => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  }, [pathname, setIsOpen]);

  return (
    <div
      className={` flex h-full w-full flex-col overflow-y-auto  ${backgroundColor || "bg-gray-100"}  ${className}`}
    >
      <div className="flex h-full flex-col  px-3 py-4">
        <Image
          src={"/images/png/logoBlack.png"}
          width={124}
          height={32}
          alt="logo"
          className="mb-6 ml-4"
          priority
        />
        <div className="mx-2 mt-6 space-y-2 font-medium">
          {items &&
            items.map((item, index) => (
              <MenuItem
                key={index}
                {...item}
                isActive={item.href === activeItem?.href}
                className="mb-2"
              />
            ))}
        </div>
        <HelpBox dictionary={dictionary} />
      </div>
      <SidebarUserSection dictionary={dictionary} />
    </div>
  );
};
// test
export default Sidebar;
