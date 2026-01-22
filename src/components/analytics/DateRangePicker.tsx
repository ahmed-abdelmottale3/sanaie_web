"use client";

import { useState } from "react";
import type { DateRange } from "../../types/analytics";

interface DateRangePickerProps {
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  className?: string;
}

export default function DateRangePicker({
  onDateRangeChange,
  className = "",
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartDate(value);
    if (value && endDate) {
      onDateRangeChange({ startDate: value, endDate });
    } else {
      onDateRangeChange(undefined);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndDate(value);
    if (startDate && value) {
      onDateRangeChange({ startDate, endDate: value });
    } else {
      onDateRangeChange(undefined);
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    onDateRangeChange(undefined);
  };

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <label htmlFor="start-date" className="text-sm font-semibold text-slate-700">
          From:
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="end-date" className="text-sm font-semibold text-slate-700">
          To:
        </label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      {(startDate || endDate) && (
        <button
          onClick={handleClear}
          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
        >
          Clear
        </button>
      )}
    </div>
  );
}
