import Image from "next/image";
import Card from "./Card";
import BoxIcon from "./BoxIcon";
import React from "react";

interface BannerWithIconProps {
  icon: React.ReactNode;
  topText: string;
  bottomText: string;
}

const BannerWithIcon = ({ icon, topText, bottomText }: BannerWithIconProps) => {
  return (
    <Card
      borderClass="border-blue-700"
      className="confirmation mt-4 flex flex-row items-center justify-start rounded-md  bg-blue-100 py-3 text-blue-700"
    >
      <BoxIcon icon={icon} alt="arrow right icon" className="min-w-10" dark />
      <div className="ml-4">
        <h5 className="mb-2 text-sm font-medium leading-5">{topText}</h5>
        <p className="text-sm font-normal leading-5">{bottomText}</p>
      </div>
    </Card>
  );
};

export default BannerWithIcon;
