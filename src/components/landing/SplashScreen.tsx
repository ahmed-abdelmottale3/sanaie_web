"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
  isVisible: boolean;
}

export default function SplashScreen({ onComplete, isVisible }: SplashScreenProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const timer1 = setTimeout(() => setShowLogo(true), 200);
    const timer2 = setTimeout(() => setShowText(true), 600);

    const completeTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(completeTimer);
    };
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-800 to-red-900" />
          
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)",
                "radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 60%)",
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          />

          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0, y: -30, rotate: -180 }}
              animate={showLogo ? { 
                scale: 1, 
                opacity: 1,
                y: 0,
                rotate: 0
              } : { 
                scale: 0, 
                opacity: 0,
                y: -30,
                rotate: -180
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.8
              }}
              className="relative mb-12"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/20 via-white/15 to-red-400/20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ width: '160%', height: '160%', left: '-30%', top: '-30%' }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full bg-white/10 blur-2xl"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                style={{ width: '140%', height: '140%', left: '-20%', top: '-20%' }}
              />

              <motion.div
                className="relative bg-gradient-to-br from-white via-white to-red-50 rounded-2xl p-6 shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #fef2f2 100%)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(239, 68, 68, 0.1), 0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8)",
                    "0 0 0 2px rgba(239, 68, 68, 0.2), 0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8)",
                    "0 0 0 0px rgba(239, 68, 68, 0.1), 0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8)",
                  ],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 opacity-50" />
                
                <motion.div
                  className="relative z-10"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.img
                    src="/logo.png"
                    alt="Sanaie Platform"
                    className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover shadow-lg"
                    style={{
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {showText && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.1
                  }}
                  className="space-y-2"
                >
                  <motion.h1
                    className="text-5xl md:text-7xl font-bold text-white tracking-tight"
                    initial={{ opacity: 0, letterSpacing: "0.05em" }}
                    animate={{ opacity: 1, letterSpacing: "0.02em" }}
                    transition={{ 
                      delay: 0.2, 
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{
                      textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                      fontWeight: 700
                    }}
                  >
                    Sanaie Platform
                  </motion.h1>
                  
                  <motion.div
                    className="h-0.5 bg-white/30 mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: "120px" }}
                    transition={{ 
                      delay: 0.5, 
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white/5 to-transparent blur-3xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
