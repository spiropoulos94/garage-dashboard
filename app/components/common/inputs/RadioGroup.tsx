"use client";

import { useState } from "react";

interface RadioGroupProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: {
    value: string;
    label: string | JSX.Element;
    name: string;
  }[];
}

const RadioGroup = ({ onChange, options }: RadioGroupProps) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <div className={`flex flex-col items-center dark:border-gray-700`}>
      {options.map(({ value, name, label }) => (
        <div
          key={name}
          className="mb-2 flex w-full cursor-pointer flex-row items-center justify-start rounded-md border border-gray-300  ps-4"
        >
          <input
            checked={selectedOption === value}
            id={name}
            type="radio"
            value={value}
            name={name}
            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-blue-600  "
            onChange={handleOptionChange}
          />
          <label
            htmlFor={name}
            className="ms-3 w-full cursor-pointer py-4 text-sm font-medium leading-5 text-gray-900 dark:text-gray-300 "
          >
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
