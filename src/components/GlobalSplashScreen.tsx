"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "./landing/SplashScreen";
import { useSplash } from "../contexts/SplashContext";

export default function GlobalSplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const { setSplashComplete } = useSplash();

  useEffect(() => {
    setShowSplash(true);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setSplashComplete();
  };

  return (
    <AnimatePresence>
      {showSplash && (
        <SplashScreen
          isVisible={showSplash}
          onComplete={handleSplashComplete}
        />
      )}
    </AnimatePresence>
  );
}
