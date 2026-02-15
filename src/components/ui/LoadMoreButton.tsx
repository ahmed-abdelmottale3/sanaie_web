import React from "react";

type Props = {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
};

export default function LoadMoreButton({ onClick, isLoading = false, disabled = false, label = "Load more" }: Props) {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`inline-flex items-center px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
        aria-label={label}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        ) : null}
        <span>{label}</span>
      </button>
    </div>
  );
}
