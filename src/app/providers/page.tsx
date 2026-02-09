"use client";

import { useState } from "react";
import { useProviderStatistics } from "../../hooks/useAnalytics";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import PageHero from "../../components/landing/PageHero";
import StatCard from "../../components/analytics/StatCard";
import LoadingSpinner from "../../components/analytics/LoadingSpinner";
import ErrorMessage from "../../components/analytics/ErrorMessage";
import BarChart from "../../components/analytics/charts/BarChart";
import { Briefcase, UserCheck, UserX, Trash2, Ban } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";

export default function ProvidersPage() {
  const { data, loading, error, refetch } = useProviderStatistics();
  const { t } = useI18n();

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

  const stats = data?.providerStats;

  if (!stats) {
    return null;
  }

  const chartData = [
    { name: "Active", value: stats.active },
    { name: "Inactive", value: stats.inactive },
    { name: "Deleted", value: stats.deleted },
    { name: "Blacklisted", value: stats.blacklisted },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <PageHero title={t("providers.title") as string} description={t("providers.description") as string} />

        <section className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <StatCard
                title={t("providers.stat_total") as string}
                value={stats.total}
                icon={Briefcase}
                iconColor="text-purple-600"
                bgColor="bg-purple-50"
              />
              <StatCard
                title={t("providers.stat_active") as string}
                value={stats.active}
                icon={UserCheck}
                iconColor="text-green-600"
                bgColor="bg-green-50"
              />
              <StatCard
                title={t("providers.stat_inactive") as string}
                value={stats.inactive}
                icon={UserX}
                iconColor="text-yellow-600"
                bgColor="bg-yellow-50"
              />
              <StatCard
                title={t("providers.stat_deleted") as string}
                value={stats.deleted}
                icon={Trash2}
                iconColor="text-red-600"
                bgColor="bg-red-50"
              />
              <StatCard
                title={t("providers.stat_blacklisted") as string}
                value={stats.blacklisted}
                icon={Ban}
                iconColor="text-orange-600"
                bgColor="bg-orange-50"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">{t("providers.status_distribution")}</h3>
                <BarChart data={chartData} color="#ea580c" height={300} />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">{t("providers.key_metrics")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("providers.active_rate")}</span>
                    <span className="text-xl font-bold text-slate-900">
                      {stats.total > 0 ? ((stats.active / stats.total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("providers.inactive_rate")}</span>
                    <span className="text-xl font-bold text-slate-900">
                      {stats.total > 0 ? ((stats.inactive / stats.total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("providers.blacklist_rate")}</span>
                    <span className="text-xl font-bold text-slate-900">
                      {stats.total > 0 ? ((stats.blacklisted / stats.total) * 100).toFixed(1) : 0}%
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
