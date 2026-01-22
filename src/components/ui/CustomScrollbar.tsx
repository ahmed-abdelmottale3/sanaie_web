import { ReactNode } from "react";

interface CustomScrollbarProps {
  children: ReactNode;
  className?: string;
  maxHeight?: string;
}

export default function CustomScrollbar({
  children,
  className = "",
  maxHeight = "400px"
}: CustomScrollbarProps) {
  return (
    <div
      className={`custom-scrollbar overflow-y-auto ${className}`}
      style={{
        maxHeight,
        scrollbarWidth: 'thin',
        scrollbarColor: '#dc2626 #f1f5f9'
      }}
    >
      {children}
    </div>
  );
}
