interface ListViewProps {
  children: React.ReactNode;
  className?: string;
}

const ListView = ({ children, className }: ListViewProps) => {
  return <div className={`${className} flex w-auto flex-col rounded-md border`}>{children}</div>;
};

export default ListView;
