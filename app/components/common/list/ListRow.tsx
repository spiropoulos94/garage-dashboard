interface ListRowProps {
  children: React.ReactNode;
  className?: string;
}

const ListRow = ({ children, className }: ListRowProps) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export default ListRow;
