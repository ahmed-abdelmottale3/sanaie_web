"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface GrowthIndicatorProps {
  value: number;
  label?: string;
  className?: string;
}

export default function GrowthIndicator({
  value,
  label = "Growth",
  className = "",
}: GrowthIndicatorProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {isPositive && <TrendingUp className="h-4 w-4 text-green-600" />}
      {isNegative && <TrendingDown className="h-4 w-4 text-red-600" />}
      {isNeutral && <Minus className="h-4 w-4 text-slate-400" />}
      <span
        className={`text-sm font-semibold ${
          isPositive
            ? "text-green-600"
            : isNegative
            ? "text-red-600"
            : "text-slate-400"
        }`}
      >
        {isPositive ? "+" : ""}
        {value.toFixed(1)}%
      </span>
      {label && (
        <span className="text-xs text-slate-500">{label}</span>
      )}
    </div>
  );
}
