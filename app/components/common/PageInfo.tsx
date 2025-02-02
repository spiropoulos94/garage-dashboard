interface PageInfoProps {
  title: string;
  description?: string;
}

const PageInfo = ({ title, description }: PageInfoProps) => {
  return (
    <div className="pageInfo mb-8 text-start">
      <p className="mb-2 text-xl font-medium leading-7">{title}</p>
      <p className="text-sm font-normal leading-5">{description}</p>
    </div>
  );
};

export default PageInfo;
