"use client";

import { useState } from "react";
import { useServiceStatistics } from "../../hooks/useAnalytics";
import { useI18n } from "../../i18n/I18nProvider";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import PageHero from "../../components/landing/PageHero";
import StatCard from "../../components/analytics/StatCard";
import LoadingSpinner from "../../components/analytics/LoadingSpinner";
import ErrorMessage from "../../components/analytics/ErrorMessage";
import PieChart from "../../components/analytics/charts/PieChart";
import { ShoppingBag, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const { t } = useI18n();
  const { data, loading, error, refetch } = useServiceStatistics();

  if (loading && !data) {
    return (
      <>
        <Header />
        <div className="flex min-h-[400px] items-center justify-center bg-white dark:bg-slate-900">
          <LoadingSpinner size="lg" />
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex min-h-[400px] items-center justify-center bg-white dark:bg-slate-900">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
        <Footer />
      </>
    );
  }

  const stats = data?.serviceStats;

  if (!stats) {
    return null;
  }

  const s = (key: string) => {
    const v = t(key as any);
    return Array.isArray(v) ? v.join("") : (v as string);
  };

  const chartData = [
    { name: s("services.chart_available"), value: stats.available },
    { name: s("services.chart_unavailable"), value: stats.unavailable },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <PageHero
          title={s("services.title")}
          description={s("services.description")}
        />

        <section className="py-12 bg-slate-50 dark:bg-slate-800/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title={s("services.stat_total")}
                value={stats.total}
                icon={ShoppingBag}
                iconColor="text-green-600"
                bgColor="bg-green-50"
              />
              <StatCard
                title={s("services.stat_available")}
                value={stats.available}
                icon={CheckCircle}
                iconColor="text-green-600"
                bgColor="bg-green-50"
              />
              <StatCard
                title={s("services.stat_unavailable")}
                value={stats.unavailable}
                icon={XCircle}
                iconColor="text-red-600"
                bgColor="bg-red-50"
              />
              <StatCard
                title={s("services.stat_availability_rate")}
                value={stats.availabilityRate}
                icon={CheckCircle}
                iconColor="text-blue-600"
                bgColor="bg-blue-50"
                suffix="%"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">{s("services.chart_title")}</h3>
                <PieChart data={chartData} height={300} />
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">{s("services.metrics_title")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-700 p-4">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{s("services.metric_total")}</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{stats.total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-700 p-4">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{s("services.metric_available")}</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{stats.available.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-700 p-4">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{s("services.metric_unavailable")}</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{stats.unavailable.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-700 p-4">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{s("services.metric_availability_rate")}</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{stats.availabilityRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
