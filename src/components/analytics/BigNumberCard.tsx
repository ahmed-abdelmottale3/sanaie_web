"use client";

import CounterAnimation from "./CounterAnimation";
import { LucideIcon } from "lucide-react";

interface BigNumberCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor?: string;
  gradient?: string;
  className?: string;
}

export default function BigNumberCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-600",
  gradient = "from-blue-500 to-purple-600",
  className = "",
}: BigNumberCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${className}`}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-600">{title}</p>
          <div className="mt-3">
            <CounterAnimation
              value={value}
              className="text-4xl font-extrabold text-slate-900"
            />
          </div>
        </div>
        <div className={`rounded-xl bg-slate-50 p-3 transition-colors duration-300 group-hover:bg-slate-100 ${iconColor}`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
