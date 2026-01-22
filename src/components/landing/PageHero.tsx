"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  description: string;
}

export default function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden text-white min-h-[300px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero.jpg')`,
            backgroundColor: '#dc2626', // Fallback red color
          }}
        />
      </div>
      
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-white/90 sm:text-xl max-w-2xl">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
