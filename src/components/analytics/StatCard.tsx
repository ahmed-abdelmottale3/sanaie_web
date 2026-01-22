"use client";

import { LucideIcon } from "lucide-react";
import CounterAnimation from "./CounterAnimation";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-600",
  bgColor = "bg-blue-50",
  className = "",
  prefix = "",
  suffix = "",
}: StatCardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-slate-500">{title}</p>
          <div className="mt-2">
            <CounterAnimation
              value={value}
              prefix={prefix}
              suffix={suffix}
              className="text-2xl font-bold text-slate-900"
            />
          </div>
        </div>
        <div className={`rounded-lg ${bgColor} p-2.5 ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
