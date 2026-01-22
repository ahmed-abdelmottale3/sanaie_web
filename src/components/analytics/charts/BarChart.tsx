"use client";

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface BarChartProps {
  data: Array<{ name: string; value: number; [key: string]: string | number }>;
  dataKey?: string;
  color?: string;
  className?: string;
  height?: number;
}

export default function BarChart({
  data,
  dataKey = "value",
  color = "#3b82f6",
  className = "",
  height = 300,
}: BarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
