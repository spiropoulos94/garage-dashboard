"use client";

export interface CheckboxWithLabelBoxProps {
  title: string;
  onChange?: (status: boolean) => void;
  checked: boolean;
  setChecked: (status: boolean) => void;
  className?: string;
}

export const CheckboxWithLabelBox = ({
  title,
  onChange,
  checked,
  setChecked,
  className,
}: CheckboxWithLabelBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked;
    setChecked(status);
    if (onChange) {
      onChange(status);
    }
  };
  return (
    <div
      className={`${className} flex h-[38px] flex-row items-center rounded-md border border-gray-300`}
    >
      <div className="flex h-full items-center justify-center border-r-2 border-gray-300 px-[9px]">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={checked}
          onChange={(v) => handleChange(v)}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 ring-0 focus:ring-transparent"
        ></input>
      </div>
      <div className="px-[9px] text-sm font-medium leading-5">{title}</div>
    </div>
  );
};

// used to create a checkbox with a title
// e.g. const WithoutVinCheckboxFilter = createCheckboxWithTitle(bookings.withoutVin);
// so then we can render it like this: <WithoutVinCheckboxFilter {...props} />
export const createCheckboxWithTitle = (title: string) => {
  const Component = (props: Omit<CheckboxWithLabelBoxProps, "title">) => (
    <CheckboxWithLabelBox {...props} title={title} />
  );

  Component.displayName = `CheckboxWithTitle(${title})`; // Assign a display name

  return Component;
};
