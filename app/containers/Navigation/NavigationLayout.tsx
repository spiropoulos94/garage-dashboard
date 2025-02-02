"use client";

import { MenuItemProps } from "@/app/components/common/MenuItem";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import IconButton from "@/app/components/common/buttons/IconButton";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavigationLayoutProps {
  navItems: MenuItemProps[];
  children: React.ReactNode;
}

const sidebarWidthClass = "max-w-[320px] xl:max-w-[224px]";

const NavigationLayout = ({ navItems, children }: NavigationLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  }, [pathname, setIsOpen]);

  return (
    <div className={`dashboardLayout flex h-full flex-col overflow-hidden  xl:flex-row`}>
      <div
        className={`mobileAppBar fixed z-20 flex h-16 w-full  flex-row items-center justify-between  bg-gray-100 xl:hidden`}
      >
        <div className="pl-6">
          <Image src={"/images/png/logoBlack.png"} width={124} height={32} alt="logo" priority />
        </div>
        <IconButton
          onClick={handleClick}
          icon={<i className="fa-solid fa-bars text-xl text-gray-800"></i>}
        />
      </div>
      <div
        className={`sidebarWraper 
          fixed
          z-40 
          h-full
          w-full
          transition-transform
          duration-500 
          xl:relative 
          xl:block 
          ${sidebarWidthClass}
          ${isOpen ? "translate-x-0 xl:-translate-x-full" : "-translate-x-full"}
          flex
          flex-row items-start 
          xl:translate-x-0
          `}
      >
        <Sidebar className="h-full w-full" items={navItems} setIsOpen={setIsOpen} />
        {isOpen && (
          <IconButton
            icon={<i className="fa-solid fa-xmark text-xl"></i>}
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
      <div className={`mainWrapper mt-16 h-full w-full overflow-y-auto  xl:mt-0`}>
        <main className="mx-auto w-full max-w-screen-xl px-6 pb-6 pt-4">{children}</main>
        {isOpen && (
          <div className="openSidebarOverlay fixed inset-0 z-30 bg-gray-900/50 xl:hidden "></div>
        )}
      </div>
    </div>
  );
};

export default NavigationLayout;
