"use client";

import { useAppStatistics } from "../hooks/useAnalytics";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import StatsSection from "../components/landing/StatsSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import AdsCarousel from "../components/landing/AdsCarousel";
import FAQSection from "../components/landing/FAQSection";
import MobileAppSection from "../components/landing/MobileAppSection";
import CTASection from "../components/landing/CTASection";
import ContactSection from "../components/landing/ContactSection";
import Footer from "../components/landing/Footer";
import LoadingSpinner from "../components/analytics/LoadingSpinner";
import ErrorMessage from "../components/analytics/ErrorMessage";

export default function HomePage() {
  const { data, loading, error, refetch } = useAppStatistics();
  const stats = data?.stats;

  return (
    <>
      <Header />

      {/* Loading and error states - shown while data is being fetched */}
      {loading && !stats && (
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {error && (
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      )}

      {/* Main content sections requiring stats data */}
      {stats && (
        <>
          <Hero stats={stats} loading={loading} />
          <StatsSection stats={stats} loading={loading} />
        </>
      )}

      {/* Static sections - always visible regardless of data state */}
      <FeaturesSection />
      <AdsCarousel />
      <MobileAppSection />
      <FAQSection />

      {/* Call-to-action section requiring stats data */}
      {stats && (
        <>
          <CTASection />
        </>
      )}

      {/* Contact section */}
      <ContactSection />

      <Footer />
    </>
  );
}
