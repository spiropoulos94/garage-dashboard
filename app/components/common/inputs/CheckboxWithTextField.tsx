"use client";

import { useState } from "react";
import { CheckboxWithLabelBoxProps } from "@/app/components/common/inputs/CheckboxWithLabelBox";

interface CheckboxWithTextFieldProps extends CheckboxWithLabelBoxProps {
  onChange?: (status: boolean, value?: string | null) => void; // Overrides the onChange method
}

const CheckboxWithTextField = ({
  title,
  onChange,
  checked,
  setChecked,
}: CheckboxWithTextFieldProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked;
    setChecked(status);
    if (onChange) {
      onChange(status, status ? inputValue : null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (onChange && checked) {
      onChange(true, value);
    }
  };

  return (
    <div className="flex h-[38px] flex-row items-center rounded-md border border-gray-300">
      <div className="flex h-full items-center justify-center border-r-2 border-gray-300 px-[9px]">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 ring-0 focus:ring-transparent"
        />
      </div>
      <div className="px-[9px] text-sm font-medium leading-5">
        <input
          className="m-0 px-1"
          placeholder={title}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CheckboxWithTextField;
