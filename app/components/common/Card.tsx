interface CardProps {
  className?: string;
  children?: React.ReactNode;
  borderClass?: string;
}

const Card = ({ className, children, borderClass }: CardProps) => {
  return (
    <div
      className={`${className} card block rounded-lg border p-6 ${borderClass || " border-gray-200 "}`}
    >
      {children}
    </div>
  );
};

export default Card;
