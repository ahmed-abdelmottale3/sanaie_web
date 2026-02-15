"use client";

import { useParams, useRouter } from "next/navigation";
import { useAdById } from "../../../hooks/useAds";
import Header from "../../../components/landing/Header";
import Footer from "../../../components/landing/Footer";
import PageHero from "../../../components/landing/PageHero";
import LoadingSpinner from "../../../components/analytics/LoadingSpinner";
import ErrorMessage from "../../../components/analytics/ErrorMessage";
import { ArrowLeft, Calendar, Users, Eye, MousePointerClick, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdDetailPage() {
  const params = useParams();
  const router = useRouter();
  const adId = params?.id as string;
  const { data: ad, loading, error, refetch } = useAdById(adId);

  if (loading) {
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

  if (!ad) {
    return (
      <>
        <Header />
        <div className="flex min-h-[400px] items-center justify-center bg-white dark:bg-slate-900">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ad not found</h2>
            <Link href="/ads" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500">
              Go back to Ads
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const isActive = ad.isActive && 
    new Date(ad.startDate) <= new Date() && 
    new Date(ad.endDate) >= new Date();

  const imageUrl = ad.imageUrl?.startsWith('http') 
    ? ad.imageUrl 
    : `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || ''}${ad.imageUrl}`;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <PageHero
          title={ad.title}
          description={ad.description || "Advertisement details"}
        />

        <section className="py-12 bg-slate-50 dark:bg-slate-800/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href="/ads"
              className="inline-flex items-center gap-2 mb-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Ads</span>
            </Link>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
              {/* Ad Image */}
              <div className="relative h-64 sm:h-80 md:h-96 bg-slate-200 dark:bg-slate-700">
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
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📢</div>
                      <p className="text-slate-400 dark:text-slate-500">No image available</p>
                    </div>
                  </div>
                )}
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                  isActive 
                    ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' 
                    : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
                }`}>
                  {isActive ? 'Active' : 'Inactive'}
                </div>
              </div>

              {/* Ad Details */}
              <div className="p-6 sm:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                    {ad.title}
                  </h1>
                  
                  {ad.description && (
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                      {ad.description}
                    </p>
                  )}

                  {/* Ad Information Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Target Audience</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{ad.targetUserType}</p>
                    </div>

                    <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Campaign Period</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Views</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{ad.views.toLocaleString()}</p>
                    </div>

                    <div className="rounded-lg bg-slate-50 dark:bg-slate-700 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MousePointerClick className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Clicks</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{ad.clicks.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="border-t border-slate-200 dark:border-slate-600 pt-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                        <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Click-Through Rate</div>
                        <div className="text-2xl font-bold text-red-600">
                          {ad.views > 0 ? ((ad.clicks / ad.views) * 100).toFixed(2) : 0}%
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Average Views</div>
                        <div className="text-2xl font-bold text-blue-600">{ad.views.toLocaleString()}</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Engagement</div>
                        <div className="text-2xl font-bold text-green-600">
                          {(ad.views + ad.clicks).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div>
                        <span className="font-semibold">Created:</span> {new Date(ad.createdAt).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-semibold">Last Updated:</span> {new Date(ad.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
