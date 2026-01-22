"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SplashContextType {
  isSplashComplete: boolean;
  setSplashComplete: () => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export function SplashProvider({ children }: { children: ReactNode }) {
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  const setSplashComplete = () => {
    setIsSplashComplete(true);
  };

  return (
    <SplashContext.Provider value={{ isSplashComplete, setSplashComplete }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const context = useContext(SplashContext);
  if (context === undefined) {
    throw new Error("useSplash must be used within a SplashProvider");
  }
  return context;
}