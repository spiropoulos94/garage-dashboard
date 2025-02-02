import React, { useState, ChangeEvent, useEffect } from "react";

interface TimePickerProps {
  onTimeChange?: (date: Date) => void;
  use24h?: boolean;
  date?: Date | null;
}

const TimePicker = ({ onTimeChange, use24h = false, date }: TimePickerProps) => {
  const [hour, setHour] = useState<string>(use24h ? "00" : "12");
  const [minute, setMinute] = useState<string>("00");
  const [period, setPeriod] = useState<string>("AM");

  useEffect(() => {
    const selectedDate = date ? new Date(date) : new Date();
    let hours = parseInt(hour);
    if (!use24h) {
      hours = period === "AM" ? hours % 12 : (hours % 12) + 12;
    }
    selectedDate.setHours(hours);
    selectedDate.setMinutes(parseInt(minute));
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);
    if (onTimeChange) {
      onTimeChange(selectedDate);
    }
  }, [hour, minute, period, onTimeChange, use24h, date]);

  const handleHourChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setHour(event.target.value);
  };

  const handleMinuteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMinute(event.target.value);
  };

  const handlePeriodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value);
  };

  return (
    <div className="flex items-center space-x-2 p-4">
      <select
        value={hour}
        onChange={handleHourChange}
        className="rounded border bg-white px-2 py-1 text-gray-700"
      >
        {use24h
          ? [...Array(24)].map((_, i) => {
              const hourValue = i.toString().padStart(2, "0");
              return (
                <option key={hourValue} value={hourValue}>
                  {hourValue}
                </option>
              );
            })
          : [...Array(12)].map((_, i) => {
              const hourValue = (i + 1).toString().padStart(2, "0");
              return (
                <option key={hourValue} value={hourValue}>
                  {hourValue}
                </option>
              );
            })}
      </select>
      <span className="text-gray-700">:</span>
      <select
        value={minute}
        onChange={handleMinuteChange}
        className="rounded border bg-white px-2 py-1 text-gray-700"
      >
        {[...Array(60)].map((_, i) => {
          const minuteValue = i.toString().padStart(2, "0");
          return (
            <option key={minuteValue} value={minuteValue}>
              {minuteValue}
            </option>
          );
        })}
      </select>
      {!use24h && (
        <select
          value={period}
          onChange={handlePeriodChange}
          className="rounded border bg-white px-2 py-1 text-gray-700"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      )}
    </div>
  );
};

export default TimePicker;
