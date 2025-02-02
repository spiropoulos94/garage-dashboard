interface BookingInfoSectionBodyProps {
  rows?: {
    title: string;
    value: string | React.ReactNode;
  }[];
  textContent?: string;
  className?: string;
}

const BookingInfoSectionBody = ({ textContent, rows, className }: BookingInfoSectionBodyProps) => {
  const rowsWithValues = rows?.filter((row) => row.value);

  if (!rowsWithValues && !textContent) return null;

  return (
    // @container is a tailwindcss class that sets this element as container on screens > md
    <div className={`content flex flex-col  ${className} md:@container`}>
      {textContent && <p className="mb-4 text-sm font-normal leading-5">{textContent}</p>}
      {rowsWithValues?.map((row, index) => {
        return (
          <div
            key={index}
            className={`grid w-full grid-cols-2   ${index !== rowsWithValues.length - 1 ? "mb-6 @sm:border-b sm:mb-8 " : ""}`}
          >
            {/* @xs means that it will apply this style only when the **container** - (NOT THE VIEWPORT) is bigger than xs (20rem) */}
            <div className="col-span-2  mb-1  text-sm font-medium capitalize leading-5  text-gray-500 @xs:col-span-1  @sm:text-black  ">
              {row.title}
            </div>
            <div className="col-span-2  break-words  text-sm font-normal leading-5  @xs:col-span-1 md:mb-1">
              {row.value || "-"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingInfoSectionBody;
