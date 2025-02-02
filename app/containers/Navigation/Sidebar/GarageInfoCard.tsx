interface GarageInfoCardProps {
  name: string;
  address: string;
}

const GarageInfoCard = ({ name, address }: GarageInfoCardProps) => {
  return (
    <div className="block rounded-lg border border-gray-200 bg-white p-2">
      <p className="mb-1 truncate text-sm font-medium leading-5">{name}</p>
      <p className="truncate text-sm font-normal leading-5">{address}</p>
    </div>
  );
};

export default GarageInfoCard;
