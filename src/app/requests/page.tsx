"use client";

import { useState } from "react";
import { useRequestStatistics } from "../../hooks/useAnalytics";
import { useI18n } from "../../i18n/I18nProvider";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import PageHero from "../../components/landing/PageHero";
import StatCard from "../../components/analytics/StatCard";
import LoadingSpinner from "../../components/analytics/LoadingSpinner";
import ErrorMessage from "../../components/analytics/ErrorMessage";
import BarChart from "../../components/analytics/charts/BarChart";
import { FileText, Clock, CheckCircle, XCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function RequestsPage() {
  const { t } = useI18n();
  const { data, loading, error, refetch } = useRequestStatistics();

  if (loading && !data) {
    return (
      <>
        <Header />
        <div className="flex min-h-[400px] items-center justify-center">
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
        <div className="flex min-h-[400px] items-center justify-center">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
        <Footer />
      </>
    );
  }

  const stats = data?.requestStats;

  if (!stats) {
    return null;
  }

  const chartData = [
    { name: t("requests.chart_pending"), value: stats.pending },
    { name: t("requests.chart_approved"), value: stats.approved },
    { name: t("requests.chart_rejected"), value: stats.rejected },
    { name: t("requests.chart_completed"), value: stats.completed },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <PageHero
          title={t("requests.title")}
          description={t("requests.description")}
        />

        <section className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
              <StatCard
                title={t("requests.stat_total")}
                value={stats.total}
                icon={FileText}
                iconColor="text-blue-600"
                bgColor="bg-blue-50"
              />
              <StatCard
                title={t("requests.stat_pending")}
                value={stats.pending}
                icon={Clock}
                iconColor="text-yellow-600"
                bgColor="bg-yellow-50"
              />
              <StatCard
                title={t("requests.stat_approved")}
                value={stats.approved}
                icon={CheckCircle}
                iconColor="text-green-600"
                bgColor="bg-green-50"
              />
              <StatCard
                title={t("requests.stat_rejected")}
                value={stats.rejected}
                icon={XCircle}
                iconColor="text-red-600"
                bgColor="bg-red-50"
              />
              <StatCard
                title={t("requests.stat_completed")}
                value={stats.completed}
                icon={CheckCircle}
                iconColor="text-purple-600"
                bgColor="bg-purple-50"
              />
              <StatCard
                title={t("requests.stat_avg_rating")}
                value={stats.averageRating}
                icon={Star}
                iconColor="text-orange-600"
                bgColor="bg-orange-50"
                suffix="/5"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">{t("requests.chart_title")}</h3>
                <BarChart data={chartData} color="#ef4444" height={300} />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">{t("requests.performance_title")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("requests.metric_completion_rate")}</span>
                    <span className="text-xl font-bold text-slate-900">{stats.completionRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("requests.metric_avg_rating")}</span>
                    <span className="text-xl font-bold text-slate-900">{stats.averageRating.toFixed(1)} / 5</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("requests.metric_approval_rate")}</span>
                    <span className="text-xl font-bold text-slate-900">
                      {stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("requests.metric_rejection_rate")}</span>
                    <span className="text-xl font-bold text-slate-900">
                      {stats.total > 0 ? ((stats.rejected / stats.total) * 100).toFixed(1) : 0}%
                    </span>
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
