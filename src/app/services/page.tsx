"use client";

import { useState } from "react";
import { useServiceStatistics } from "../../hooks/useAnalytics";
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
  const { data, loading, error, refetch } = useServiceStatistics();

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

  const stats = data?.serviceStats;

  if (!stats) {
    return null;
  }

  const chartData = [
    { name: "Available", value: stats.available },
    { name: "Unavailable", value: stats.unavailable },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <PageHero
          title="Service Statistics"
          description="Track the availability and performance of services offered on our platform"
        />

        <section className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Services"
                value={stats.total}
                icon={ShoppingBag}
                iconColor="text-green-600"
                bgColor="bg-green-50"
              />
              <StatCard
                title="Available"
                value={stats.available}
                icon={CheckCircle}
                iconColor="text-green-600"
                bgColor="bg-green-50"
              />
              <StatCard
                title="Unavailable"
                value={stats.unavailable}
                icon={XCircle}
                iconColor="text-red-600"
                bgColor="bg-red-50"
              />
              <StatCard
                title="Availability Rate"
                value={stats.availabilityRate}
                icon={CheckCircle}
                iconColor="text-blue-600"
                bgColor="bg-blue-50"
                suffix="%"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Service Availability</h3>
                <PieChart data={chartData} height={300} />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Service Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">Total Services</span>
                    <span className="text-xl font-bold text-slate-900">{stats.total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">Available Services</span>
                    <span className="text-xl font-bold text-slate-900">{stats.available.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">Unavailable Services</span>
                    <span className="text-xl font-bold text-slate-900">{stats.unavailable.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">Availability Rate</span>
                    <span className="text-xl font-bold text-slate-900">{stats.availabilityRate.toFixed(1)}%</span>
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
