"use client";

import { useRef, useState, useEffect } from "react";

interface PinInputProps {
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  error?: string;
}

const PinInput = ({ setValue, className, error }: PinInputProps) => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (char: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = char.slice(-1); // Only take the last character entered to prevent multiple characters
    setPin(newPin);
    setValue?.(newPin.join(""));

    // Set focus to the next input if there's a character and the next input exists
    if (char && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    } else {
      handleCaretToEnd(index); // Ensure the caret stays at the end if focus remains on this cell
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newPin = [...pin];
      newPin[index - 1] = "";
      setPin(newPin);
      setValue?.(newPin.join(""));
    } else {
      handleCaretToEnd(index);
    }
  };

  const focusFirstEmptyCell = () => {
    const firstEmptyIndex = pin.findIndex((char) => char === "");
    if (firstEmptyIndex !== -1) {
      inputRefs.current[firstEmptyIndex]?.focus(); // Focus on the first empty cell
    } else {
      inputRefs.current[pin.length - 1]?.focus(); // Focus on the last cell
    }
  };

  useEffect(() => {
    focusFirstEmptyCell();
  }, [pin, focusFirstEmptyCell]);

  const handleFocus = (index: number) => {
    // Focus on the first empty cell if the user tries to focus beyond it
    const firstEmptyIndex = pin.findIndex((char) => char === "");
    if (index >= firstEmptyIndex && firstEmptyIndex !== -1) {
      inputRefs.current[firstEmptyIndex]?.focus();
    }

    // Ensure caret is at the end of the input field
    handleCaretToEnd(index);
  };

  // Function to force the caret to stay at the end of the input
  const handleCaretToEnd = (index: number) => {
    const input = inputRefs.current[index];
    if (input && document.activeElement === input) {
      // Use requestAnimationFrame to avoid flickering/glitching in Safari
      requestAnimationFrame(() => {
        input.setSelectionRange(input.value.length, input.value.length);
      });
    }
  };

  return (
    <div className={`pinInput flex flex-col items-center ${className}`}>
      <div
        className={`mx-auto flex h-fit w-fit flex-row flex-nowrap gap-2 ${error && "text-red-500"}`}
      >
        {pin.map((char, index) => (
          <input
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            autoFocus={index === 0}
            key={index}
            maxLength={1}
            className="flex h-12 w-10 flex-1 items-center justify-center rounded-md bg-gray-100 text-center"
            value={char}
            onFocus={() => handleFocus(index)}
            onClick={() => handleCaretToEnd(index)} // Ensure caret at end on click
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{ userSelect: "none" }} // Disable text selection
          />
        ))}
      </div>
      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default PinInput;
