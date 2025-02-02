import React from "react";

interface SearchbarProps {
  handleInput: (value: string) => void;
  placeholder?: string;
  className?: string;
  value?: string;
}

const Searchbar = ({ handleInput, placeholder = "Suche...", className, value = "" }: SearchbarProps) => {
  return (
    <div className={`relative  w-[280px] ${className}`}>
      <input
        type="text"
        className="block w-full rounded-lg border border-gray-300 bg-white p-2 pl-10 text-sm text-gray-900"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInput(e.target.value)}
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      {value && (
        <button
          type="button"
          onClick={() => handleInput("")} // Clear input value
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
        >
          <i className="fa-solid fa-times"></i>
        </button>
      )}
    </div>
  );
};

export default Searchbar;