"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface RippleLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface RippleEffect {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function RippleLink({ href, children, className = "", onClick }: RippleLinkProps) {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={href}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}

      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </Link>
  );
}
