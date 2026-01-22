"use client";

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface LineChartProps {
  data: Array<{ name: string; value: number; [key: string]: string | number }>;
  dataKey?: string;
  color?: string;
  className?: string;
  height?: number;
}

export default function LineChart({
  data,
  dataKey = "value",
  color = "#3b82f6",
  className = "",
  height = 300,
}: LineChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            dot={{ fill: color, r: 5 }}
            activeDot={{ r: 8 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
