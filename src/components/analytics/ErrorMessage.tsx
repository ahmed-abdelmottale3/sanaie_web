"use client";

import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message,
  className = "",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 ${className}`}
    >
      <AlertCircle className="h-8 w-8 text-red-600" />
      <p className="mt-2 text-sm font-semibold text-red-700 dark:text-red-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}
