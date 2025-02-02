"use client";

export interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
}

const TextInput = ({ label, disabled, onChange, placeholder, type, name }: TextInputProps) => {
  const disabledClass = "cursor-not-allowed bg-gray-200 opacity-50";
  return (
    <div className="textInput">
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        name={name}
        id={name}
        className={`block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 ${disabled && disabledClass}`}
        placeholder={placeholder}
        required
        disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
