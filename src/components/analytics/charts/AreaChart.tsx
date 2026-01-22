"use client";

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AreaChartProps {
  data: Array<{ name: string; value: number; [key: string]: string | number }>;
  dataKey?: string;
  color?: string;
  className?: string;
  height?: number;
}

export default function AreaChart({
  data,
  dataKey = "value",
  color = "#3b82f6",
  className = "",
  height = 300,
}: AreaChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={`url(#color${dataKey})`}
            strokeWidth={2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
