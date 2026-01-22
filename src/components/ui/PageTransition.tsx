"use client";

import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

// Simple fade-in animation for page content
export default function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={`min-h-screen ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Hook for navigation transitions
export function usePageTransition() {
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  };
}