import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const Avatar = ({ src, alt, width, height }: AvatarProps) => {
  return (
    <Image
      className="avatar h-10 w-10 rounded-full"
      src={src}
      alt={alt}
      width={width || 32}
      height={height || 32}
    />
  );
};

export default Avatar;
