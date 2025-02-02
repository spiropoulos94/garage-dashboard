"use client";

import { useEffect, useRef, useState } from "react";
import Button, { ButtonProps } from "./Button";
import Image from "next/image";
import Popover from "@/app/components/common/Popover";

export interface DropdownOption {
  title: string;
  value: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

interface DropdownButtonProps extends ButtonProps {
  options: DropdownOption[];
}

const DropdownButton = (props: DropdownButtonProps) => {
  const { options } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: any) => {
    e && e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full flex-col">
      <Button refProp={buttonRef} onClick={(e) => handleClick(e)} {...props} />

      <div ref={dropdownRef} className="relative">
        <Popover
          visible={isOpen}
          onClose={() => setIsOpen(false)}
          className="w-44"
          anchorRef={buttonRef}
        >
          <ul className=" py-2 text-sm text-gray-700" aria-labelledby="dropdownDividerButton">
            {options.map((option, index) => (
              <li key={index} className=" cursor-pointer">
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    option.onClick && option.onClick();
                    setIsOpen(false);
                  }}
                  className={`flex cursor-pointer flex-row items-center px-4 py-2 hover:bg-gray-100  ${option.className}`}
                >
                  {option.icon}
                  {option.title}
                </span>
              </li>
            ))}
          </ul>
        </Popover>
      </div>
    </div>
  );
};

export default DropdownButton;
