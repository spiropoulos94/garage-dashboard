import { TextInputProps } from "./TextInput";

interface TextAreaProps extends TextInputProps {
  value?: string;
  rows?: number;
}

const TextArea = ({ label, disabled, onChange, placeholder, value, rows }: TextAreaProps) => {
  const disabledClass = "cursor-not-allowed bg-gray-200 opacity-50";
  return (
    <div className="textArea">
      <label
        htmlFor="reason"
        className="my-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id="reason"
        rows={rows || 3}
        onChange={onChange}
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 
        dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500
       ${disabled ? disabledClass : ""}`}
        placeholder={placeholder}
        disabled={disabled}
        value={value || ""}
      />
    </div>
  );
};

export default TextArea;
