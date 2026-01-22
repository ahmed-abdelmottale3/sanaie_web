"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useActiveAds } from "../../hooks/useAds";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";
import LoadingSpinner from "../analytics/LoadingSpinner";
import ErrorMessage from "../analytics/ErrorMessage";

export default function AdsCarousel() {
  const { data: ads, loading, error, refetch } = useActiveAds();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter only active ads
  const activeAds = ads?.filter(ad => {
    const now = new Date();
    const startDate = new Date(ad.startDate);
    const endDate = new Date(ad.endDate);
    return ad.isActive && startDate <= now && endDate >= now;
  }) || [];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || activeAds.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAds.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeAds.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + activeAds.length) % activeAds.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % activeAds.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        </div>
      </section>
    );
  }

  if (!activeAds || activeAds.length === 0) {
    return null;
  }

  const currentAd = activeAds[currentIndex];
  const imageUrl = currentAd.imageUrl?.startsWith('http') 
    ? currentAd.imageUrl 
    : `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || ''}${currentAd.imageUrl}`;

  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
          >
            Our Advertisements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-slate-600"
          >
            Discover our latest promotions and featured content
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
            <AnimatePresence mode="wait">
              <Link
                href={`/ads/${activeAds[currentIndex]._id}`}
                className="block"
              >
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative cursor-pointer"
                >
                {/* Ad Image */}
                <div className="relative h-64 sm:h-80 md:h-96 bg-slate-200">
                  {currentAd.imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={currentAd.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-ad.png';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Megaphone className="h-16 w-16 text-slate-400" />
                    </div>
                  )}
                  
                  {/* Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Ad Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{currentAd.title}</h3>
                    {currentAd.description && (
                      <p className="text-lg font-medium text-white/80 line-clamp-2">{currentAd.description}</p>
                    )}
                  </div>
                </div>
                </motion.div>
              </Link>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {activeAds.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white transition-all z-10"
                  aria-label="Previous ad"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-slate-900 shadow-lg hover:bg-white transition-all z-10"
                  aria-label="Next ad"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {activeAds.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {activeAds.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Ad Counter */}
          {activeAds.length > 1 && (
            <div className="mt-4 text-center text-sm text-slate-600">
              {currentIndex + 1} / {activeAds.length}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
