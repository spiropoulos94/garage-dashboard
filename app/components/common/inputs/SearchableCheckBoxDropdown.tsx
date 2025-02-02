import Searchbar from "@/app/components/common/inputs/Searchbar";
import React, { useState, useRef, useEffect } from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface SearchableCheckBoxDropdownProps {
  options: DropdownOption[];
  preSelectedValues?: string[];
  onChange: (selected: string[]) => void;
  title: string;
  className?: string;
}

const SearchableCheckBoxDropdown = ({
  options,
  preSelectedValues,
  onChange,
  title,
  className,
}: SearchableCheckBoxDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Sync state with preSelectedValues
  useEffect(() => {
    if (preSelectedValues) {
      setSelectedOptions(preSelectedValues);
    }
  }, [preSelectedValues]);

  const handleCheckboxChange = (value: string) => {
    const updatedSelection = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedSelection);
    onChange(updatedSelection);
  };

  const clearSelection = () => {
    setSelectedOptions([]);
    onChange([]);
  };

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

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Ensure selected options appear at the top
  const sortedOptions =
    filteredOptions.length > 7
      ? [
          ...filteredOptions.filter((option) => selectedOptions.includes(option.value)),
          ...filteredOptions.filter((option) => !selectedOptions.includes(option.value)),
        ]
      : filteredOptions;

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        onClick={toggleDropdown}
        className={`inline-flex w-full justify-between rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ${
          selectedOptions.length > 0
            ? "border-blue-700 bg-blue-100 hover:bg-blue-100"
            : "border-gray-300 bg-white hover:bg-gray-50"
        }`}
      >
        {title}
        <div className="ml-2 flex items-center">
          {selectedOptions.length > 0 && (
            <>
              <div className="flex items-center justify-center  rounded-full bg-blue-200 px-2.5 py-0.5 text-xs text-blue-700">
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
        {selectedOptions.length < 1 && (
          <i
            className={`fa-solid fa-chevron-down align-center ml-2 flex h-5 w-5 items-center justify-center text-xs transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          ></i>
        )}
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2  origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="pb-2">
            <div className="p-2">
              <Searchbar
                handleInput={(value) => setSearchTerm(value)} // Update searchTerm based on input
                value={searchTerm} // Bind value to searchTerm state
                placeholder="Search options..."
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {sortedOptions.length > 0 ? (
                sortedOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span>{option.label}</span>
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableCheckBoxDropdown;
