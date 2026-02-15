"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSplash } from "../../contexts/SplashContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: "blur(4px)",
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  out: {
    opacity: 0,
    y: -10,
    scale: 1.01,
    filter: "blur(2px)",
  },
};

const pageTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 40,
  mass: 0.6,
};

const progressVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      scaleX: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.3 }
    }
  },
  exit: {
    scaleX: 1,
    opacity: 0,
    transition: { duration: 0.3 }
  },
};

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isSplashComplete } = useSplash();
  const prevPathnameRef = useRef<string>(pathname);
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (!isSplashComplete) return;

    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      prevPathnameRef.current = pathname;
      return;
    }

    if (pathname !== prevPathnameRef.current) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
        prevPathnameRef.current = pathname;
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [pathname, isSplashComplete]);

  if (!isSplashComplete) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}