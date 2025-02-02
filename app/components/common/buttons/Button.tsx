"use client";

import ButtonSpinner from "@/app/components/common/buttons/ButtonSpinner";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface ButtonProps {
  onClick?: (e?: any) => void;
  size?: "standard" | "large" | "fullwidth" | "responsive";
  color?: "primary" | "secondary" | "plain" | "link";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  title?: string;
  disabled?: boolean;
  href?: string;
  isLoading?: boolean;
  refProp?: React.RefObject<HTMLButtonElement>;
}

const Button = ({
  onClick,
  size,
  color = "primary",
  iconRight,
  iconLeft,
  title,
  disabled,
  href,
  isLoading,
  refProp,
}: ButtonProps) => {
  let variantClass = " px-3 py-2.5 text-sm leading-5 font-medium shadow-sm";
  const disabledClass = " cursor-not-allowed opacity-50 ";

  const router = useRouter();

  switch (size) {
    case "standard":
      variantClass += " w-[140px] min-w-[140px]";
      break;
    case "large":
      variantClass += " w-52 min-w-52";
      break;
    case "fullwidth":
      variantClass += " w-full";
      break;
    case "responsive":
      variantClass += "w-[140px] min-w-[140px] xl:w-52 xl:min-w-52";
      break;
    default:
      break;
  }

  switch (color) {
    case "primary":
      variantClass += " bg-blue-600 font-medium text-white hover:bg-blue-800 ";
      break;
    case "secondary":
      variantClass += " bg-blue-50 font-medium text-blue-700 hover:bg-blue-200";
      break;
    case "plain":
      variantClass += " text-black bg-white hover:bg-gray-50 border border-grey-300";
      break;
    case "link":
      variantClass += " text-blue-600 bg-white hover:text-blue-800 border-0 ";
      break;
    default:
      break;
  }

  const ButtonContent = () => {
    if (isLoading) {
      return <ButtonSpinner color="blue" />;
    } else {
      return (
        <>
          {iconLeft}
          {title}
          {iconRight}
        </>
      );
    }
  };

  return (
    <button
      ref={refProp}
      onClick={(e) => {
        e.preventDefault();
        if (href) {
          router.push(href);
        }
        onClick && onClick();
      }}
      type="button"
      className={`relative flex h-9 w-fit flex-row items-center justify-center text-nowrap rounded-lg ${variantClass} ${disabled ? disabledClass : ""}`}
      disabled={disabled || isLoading}
    >
      <ButtonContent />
    </button>
  );
};

export default Button;
