"use client";

import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";
import { logOut } from "@/app/actions/auth";
import { getLocale, updateLocale } from "@/app/actions/locale";
import Popover from "@/app/components/common/Popover";
import Button from "@/app/components/common/buttons/Button";
import { DropdownOption } from "@/app/components/common/buttons/DropdownButton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SidebarUserSectionProps {
  dictionary: DictionaryRoot;
}

const SidebarUserSection = ({ dictionary }: SidebarUserSectionProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [currentLocale, setCurrentLocale] = useState<"de_DE" | "en_US">("de_DE");
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleSwitchLanguage = async (newLocale: "de_DE" | "en_US") => {
    await updateLocale(newLocale);
    location.reload();
  };

  const updateLocaleClient = async () => {
    const response = await getLocale();
    setCurrentLocale(response === "de_DE" ? "de_DE" : "en_US");
  };

  useEffect(() => {
    updateLocaleClient();
  }, []);

  const options: DropdownOption[] = [
    {
      title: dictionary.sidebar.switchLang,
      icon: <i className="fa-regular fa-language mr-1 "></i>,
      value: "localeSwitch",
      onClick: () => handleSwitchLanguage(currentLocale === "de_DE" ? "en_US" : "de_DE"),
    },
    {
      title: "Abmelden",
      icon: <i className="fa-regular fa-hand-wave mr-1 "></i>,
      value: "logout",
      className: "text-red-500",
      onClick: () => logOut(),
    },
  ];

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => setOpenMenu(!openMenu)}
        className="sidebarbottomSection flex cursor-pointer flex-row items-center border-t border-gray-200 px-3 py-4"
      >
        <i className="fa-thin fa-circle-user fa-fw mr-2 text-xl text-gray-700"></i>
        <div className=" text-sm font-medium leading-5">{dictionary.general.account}</div>
      </div>
      <Popover
        anchorRef={buttonRef}
        position="top"
        visible={openMenu}
        onClose={() => setOpenMenu(false)}
        className="ml-2 w-52"
      >
        <ul
          className=" rounded-md border border-gray-200 py-1 text-sm text-gray-700"
          aria-labelledby="dropdownDividerButton"
        >
          {options.map((option, index) => (
            <li key={index} className=" cursor-pointer">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  option.onClick && option.onClick();
                  setOpenMenu(false);
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
    </>
  );
};

export default SidebarUserSection;
