import Badge from "@/app/components/common/Badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface MenuItemProps {
  href: string;
  title: string;
  icon?: React.ReactNode;
  className?: string;
  isActive?: boolean;
  target?: string;
  totalItems?: number;
}

const MenuItem = ({
  href,
  title,
  icon,
  className,
  isActive,
  target,
  totalItems,
}: MenuItemProps) => {
  return (
    <Link href={href} target={target}>
      <div
        className={`menuItem flex items-center rounded-lg p-2 px-3 text-black hover:bg-gray-200 ${className} ${isActive ? "bg-gray-200" : ""}`}
      >
        {icon}
        <span>{title}</span>
        {totalItems ? (
          <Badge
            status="custom"
            className="ml-1 items-center !rounded-full bg-red-500 px-2.5 text-white "
            text={totalItems}
          ></Badge>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default MenuItem;
