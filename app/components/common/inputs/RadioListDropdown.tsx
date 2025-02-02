import React, { useEffect, useRef, useState } from "react";

interface DropdownOption {
  label: string;
  value: string;
  group?: string; // Optional group to enforce exclusivity
}

interface RadioListDropdownProps {
  options: DropdownOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  title: string;
  className?: string;
}

const RadioListDropdown = ({ options, selectedOptions, onChange, title, className }: RadioListDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (value: string, group?: string) => {
    let updatedSelection: string[];

    if (group) {
      // If the option is part of a group, remove all other group options
      updatedSelection = selectedOptions.filter(
        (selectedValue) => options.find((opt) => opt.value === selectedValue)?.group !== group,
      );
      if (!selectedOptions.includes(value)) {
        updatedSelection.push(value);
      }
    } else {
      // For non-grouped options, toggle the selection
      updatedSelection = selectedOptions.includes(value)
        ? selectedOptions.filter((option) => option !== value)
        : [...selectedOptions, value];
    }

    onChange(updatedSelection);
  };

  const clearSelection = () => {
    onChange([]);
  };

  // Helper to group options by `group`
  const groupedOptions = options.reduce(
    (acc, option) => {
      const group = option.group || "ungrouped";
      if (!acc[group]) acc[group] = [];
      acc[group].push(option);
      return acc;
    },
    {} as Record<string, DropdownOption[]>,
  );

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        onClick={toggleDropdown}
        className={`inline-flex w-full justify-between rounded-lg border  px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ${selectedOptions.length > 0 ? "bg-blue-100 hover:bg-blue-100 border-blue-700" : "bg-white hover:bg-gray-50 border-gray-300 "
          }`}
      >
        {title}{" "}
        <div className="ml-2 flex items-center">
          {selectedOptions.length > 0 && (<>
            <div className="flex px-2.5 py-0.5 items-center justify-center rounded-full bg-blue-200 text-xs text-blue-700">
              {selectedOptions.length}
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              className="ml-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white"
              title="Clear Selection"
            >
              <i className="fa-solid fa-times text-xs"></i>
            </div>
          </>
          )}
        </div>
        {selectedOptions.length < 1 &&
          <i
            className={`fa-solid fa-chevron-down align-center ml-2 flex h-5 w-5 items-center justify-center text-xs transition-transform ${isOpen ? "rotate-180" : ""
              }`}
          ></i>
        }
      </button>
      {isOpen && (
        <div className="absolute z-50  mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-2">
            {Object.keys(groupedOptions).map((group, groupIndex) => (
              <div key={group}>
                {groupedOptions[group].map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span>{option.label}</span>
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value, option.group)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
                {groupIndex < Object.keys(groupedOptions).length - 1 && (
                  <hr className="my-2 border-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RadioListDropdown;