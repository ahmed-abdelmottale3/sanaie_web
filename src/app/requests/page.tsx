"use client";

import { useState } from "react";
import { useRequestStatistics } from "../../hooks/useAnalytics";
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
    { name: "Pending", value: stats.pending },
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
    { name: "Completed", value: stats.completed },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <PageHero
          title="Request Statistics"
          description="Monitor request status, completion rates, and customer satisfaction metrics"
        />

        <section className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
              <StatCard
                title="Total Requests"
                value={stats.total}
                icon={FileText}
                iconColor="text-blue-600"
                bgColor="bg-blue-50"
              />
              <StatCard
                title="Pending"
                value={stats.pending}
                icon={Clock}
                iconColor="text-yellow-600"
                bgColor="bg-yellow-50"
              />
              <StatCard
                title="Approved"
                value={stats.approved}
                icon={CheckCircle}
                iconColor="text-green-600"
                bgColor="bg-green-50"
              />
              <StatCard
                title="Rejected"
                value={stats.rejected}
                icon={XCircle}
                iconColor="text-red-600"
                bgColor="bg-red-50"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                icon={CheckCircle}
                iconColor="text-purple-600"
                bgColor="bg-purple-50"
              />
              <StatCard
                title="Average Rating"
                value={stats.averageRating}
                icon={Star}
                iconColor="text-orange-600"
                bgColor="bg-orange-50"
                suffix="/5"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Request Status Distribution</h3>
                <BarChart data={chartData} color="#ef4444" height={300} />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">Completion Rate</span>
                    <span className="text-xl font-bold text-slate-900">{stats.completionRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">Average Rating</span>
                    <span className="text-xl font-bold text-slate-900">{stats.averageRating.toFixed(1)} / 5</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">Approval Rate</span>
                    <span className="text-xl font-bold text-slate-900">
                      {stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">Rejection Rate</span>
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
