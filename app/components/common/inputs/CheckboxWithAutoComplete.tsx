"use client";

import { useState } from "react";
import { CheckboxWithLabelBoxProps } from "./CheckboxWithLabelBox";

interface CheckboxWithAutoCompleteProps extends CheckboxWithLabelBoxProps {
  onChange?: (status: boolean, value?: string | null) => void; // Overrides the onChange method
  options: string[]; // New prop for autocomplete options
}
const CheckboxWithAutoComplete = ({
  title,
  onChange,
  checked,
  setChecked,
  options,
}: CheckboxWithAutoCompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

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

    const filtered = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);

    if (onChange && checked) {
      onChange(true, value);
    }
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setFilteredOptions([]);
    if (onChange && checked) {
      onChange(true, option);
    }
  };

  return (
    <div className="relative flex h-[38px] flex-row items-center rounded-md border border-gray-300">
      <div className="flex h-full items-center justify-center border-r-2 border-gray-300 px-[9px]">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 ring-0 focus:ring-transparent"
        />
      </div>
      <div className="relative px-[9px] text-sm font-medium leading-5">
        <input
          className="m-0 px-1"
          placeholder={title}
          value={inputValue}
          onChange={handleInputChange}
        />
        {filteredOptions.length > 0 && (
          <div className="absolute left-0 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
            {filteredOptions.map((option) => (
              <div
                key={option}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-200"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckboxWithAutoComplete;
