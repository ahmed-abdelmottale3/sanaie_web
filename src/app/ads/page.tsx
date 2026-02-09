"use client";

// removed unused useState import
import { useAdStatistics } from "../../hooks/useAnalytics";
import { useAllAds } from "../../hooks/useAds";
import { useI18n } from "../../i18n/I18nProvider";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import PageHero from "../../components/landing/PageHero";
import StatCard from "../../components/analytics/StatCard";
import LoadingSpinner from "../../components/analytics/LoadingSpinner";
import ErrorMessage from "../../components/analytics/ErrorMessage";
import PieChart from "../../components/analytics/charts/PieChart";
import Link from "next/link";
import { Megaphone, Eye, MousePointerClick, CheckCircle, XCircle, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AdsPage() {
  const { t } = useI18n();
  const { data, loading, error, refetch } = useAdStatistics();
  const { data: ads, loading: adsLoading, error: adsError, refetch: refetchAds } = useAllAds();

  const getString = (key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result[0] : result;
  };

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

  const stats = data?.adStats;

  if (!stats) {
    return null;
  }

  const chartData = [
    { name: getString("ads.chart_active"), value: stats.active },
    { name: getString("ads.chart_inactive"), value: stats.inactive },
  ];

  const clickThroughRate = stats.totalViews > 0 
    ? ((stats.totalClicks / stats.totalViews) * 100).toFixed(2) 
    : "0";

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <PageHero
          title={getString("ads.title")}
          description={getString("ads.description")}
        />

        <section className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
              <StatCard
                title={getString("ads.stat_total")}
                value={stats.total}
                icon={Megaphone}
                iconColor="text-pink-600"
                bgColor="bg-pink-50"
              />
              <StatCard
                title={getString("ads.stat_active")}
                value={stats.active}
                icon={CheckCircle}
                iconColor="text-green-600"
                bgColor="bg-green-50"
              />
              <StatCard
                title={getString("ads.stat_inactive")}
                value={stats.inactive}
                icon={XCircle}
                iconColor="text-red-600"
                bgColor="bg-red-50"
              />
              <StatCard
                title={getString("ads.stat_total_views")}
                value={stats.totalViews}
                icon={Eye}
                iconColor="text-blue-600"
                bgColor="bg-blue-50"
              />
              <StatCard
                title={getString("ads.stat_total_clicks")}
                value={stats.totalClicks}
                icon={MousePointerClick}
                iconColor="text-purple-600"
                bgColor="bg-purple-50"
              />
              <StatCard
                title={getString("ads.stat_avg_views")}
                value={stats.averageViews}
                icon={Eye}
                iconColor="text-indigo-600"
                bgColor="bg-indigo-50"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">{t("ads.chart_title")}</h3>
                <PieChart data={chartData} height={300} />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">{t("ads.engagement_title")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("ads.metric_avg_clicks")}</span>
                    <span className="text-xl font-bold text-slate-900">{stats.averageClicks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("ads.metric_avg_views")}</span>
                    <span className="text-xl font-bold text-slate-900">{stats.averageViews.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("ads.metric_ctr")}</span>
                    <span className="text-xl font-bold text-slate-900">{clickThroughRate}%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("ads.metric_total_engagement")}</span>
                    <span className="text-xl font-bold text-slate-900">
                      {(stats.totalViews + stats.totalClicks).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ads Display Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6">{t("ads.all_ads_title")}</h2>
              
              {adsLoading && (
                <div className="flex items-center justify-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              )}

              {adsError && (
                <div className="flex items-center justify-center py-12">
                  <ErrorMessage message={adsError} onRetry={refetchAds} />
                </div>
              )}

              {!adsLoading && !adsError && ads && (
                <>
                  {ads.length === 0 ? (
                    <div className="text-center py-12">
                      <Megaphone className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                      <p className="text-lg font-semibold text-slate-600">{t("ads.no_ads_found")}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {ads.map((ad, index) => {
                        const isActive = ad.isActive && 
                          new Date(ad.startDate) <= new Date() && 
                          new Date(ad.endDate) >= new Date();
                        
                        const imageUrl = ad.imageUrl?.startsWith('http') 
                          ? ad.imageUrl 
                          : `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || ''}${ad.imageUrl}`;

                        return (
                          <Link
                            key={ad._id}
                            href={`/ads/${ad._id}`}
                            className="block"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: index * 0.1 }}
                              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                            <div className="relative h-48 bg-slate-100">
                              {ad.imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={ad.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder-ad.png';
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-200">
                                  <Megaphone className="h-12 w-12 text-slate-400" />
                                </div>
                              )}
                              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                                isActive 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {isActive ? t("ads.active") : t("ads.inactive")}
                              </div>
                            </div>
                            
                            <div className="p-4">
                              <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-2">
                                {ad.title}
                              </h3>
                              
                              {ad.description && (
                                <p className="text-sm font-medium text-slate-500 mb-4 line-clamp-2">
                                  {ad.description}
                                </p>
                              )}

                              <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Users className="h-4 w-4" />
                                  <span>{t("ads.target")}: {ad.targetUserType}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                  <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{ad.views.toLocaleString()} {t("ads.views")}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MousePointerClick className="h-4 w-4" />
                                    <span>{ad.clicks.toLocaleString()} {t("ads.clicks")}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </motion.div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
