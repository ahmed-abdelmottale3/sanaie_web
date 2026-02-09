"use client";

import { useState } from "react";
import { useCategoryStatistics } from "../../hooks/useAnalytics";
import { useAllCategories } from "../../hooks/useCategories";
import { useServicesByCategoryId } from "../../hooks/useServices";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import PageHero from "../../components/landing/PageHero";
import StatCard from "../../components/analytics/StatCard";
import LoadingSpinner from "../../components/analytics/LoadingSpinner";
import ErrorMessage from "../../components/analytics/ErrorMessage";
import { FolderTree, TrendingUp, TrendingDown, ChevronRight, X, Package, MousePointer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";

export default function CategoriesPage() {
  const { t } = useI18n();
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const { data, loading, error, refetch } = useCategoryStatistics();
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useAllCategories();
  const { data: services, loading: servicesLoading, error: servicesError } = useServicesByCategoryId(selectedCategoryId || "");

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

  const stats = data?.categoryStats;

  if (!stats) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <PageHero title={t("categories.title") as string} description={t("categories.description") as string} />

        <section className="py-12 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div
                onClick={() => setShowCategories(!showCategories)}
                className="cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg relative group ring-2 ring-transparent hover:ring-red-200 hover:ring-opacity-50 rounded-xl"
                title={t("categories.click_view_services") as string}
              >
                <StatCard
                  title={t("categories.stat_total") as string}
                  value={stats.total}
                  icon={FolderTree}
                  iconColor="text-indigo-600"
                  bgColor="bg-indigo-50"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 animate-pulse">
                  <MousePointer className="h-3 w-3" />
                  <span>{t("categories.click_explore")}</span>
                </div>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                  <MousePointer className="h-3 w-3" />
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
              <StatCard
                title={t("categories.stat_avg_services") as string}
                value={stats.averageServicesPerCategory}
                icon={TrendingUp}
                iconColor="text-green-600"
                bgColor="bg-green-50"
              />
              <StatCard
                title={t("categories.stat_max_services") as string}
                value={stats.maxServicesInCategory}
                icon={TrendingUp}
                iconColor="text-blue-600"
                bgColor="bg-blue-50"
              />
              <StatCard
                title={t("categories.stat_min_services") as string}
                value={stats.minServicesInCategory}
                icon={TrendingDown}
                iconColor="text-orange-600"
                bgColor="bg-orange-50"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">{t("categories.overview_title")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("categories.total_categories")}</span>
                    <span className="text-xl font-bold text-slate-900">{stats.total}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("categories.avg_services_per_category")}</span>
                    <span className="text-xl font-bold text-slate-900">
                      {stats.averageServicesPerCategory.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-semibold text-slate-600">{t("categories.service_range")}</span>
                    <span className="text-sm font-bold text-slate-900">
                      {stats.minServicesInCategory} - {stats.maxServicesInCategory}
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">{t("categories.distribution_title")}</h3>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-600 mb-2">{t("categories.category_diversity")}</p>
                    <p className="text-sm text-slate-600">
                      {(t("categories.diversity_desc") as string).replace('{total}', stats.total.toString())}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-600 mb-2">{t("categories.service_distribution")}</p>
                    <p className="text-sm text-slate-600">
                      {(t("categories.distribution_desc") as string)
                        .replace('{min}', stats.minServicesInCategory.toString())
                        .replace('{max}', stats.maxServicesInCategory.toString())
                        .replace('{avg}', stats.averageServicesPerCategory.toFixed(1))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories List Section */}
            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-12"
                >
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-extrabold text-slate-900">{t("categories.all_categories")}</h2>
                        <button
                          onClick={() => {
                            setShowCategories(false);
                            setSelectedCategoryId(null);
                          }}
                          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                          aria-label={t("categories.close_categories") as string}
                        >
                          <X className="h-5 w-5 text-slate-600" />
                        </button>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        <MousePointer className="h-4 w-4" />
                        <span>{t("categories.interactive_hint")}</span>
                      </div>
                    </div>

                    {categoriesLoading && (
                      <div className="flex items-center justify-center py-12">
                        <LoadingSpinner size="lg" />
                      </div>
                    )}

                    {categoriesError && (
                      <div className="flex items-center justify-center py-12">
                        <ErrorMessage message={categoriesError} />
                      </div>
                    )}

                    {!categoriesLoading && !categoriesError && categories && (
                      <>
                        {categories.length === 0 ? (
                          <div className="text-center py-12">
                            <FolderTree className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                            <p className="text-lg font-semibold text-slate-600">{t("categories.no_categories_found")}</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category, index) => {
                              const categoryId = category._id || '';
                              const isSelected = selectedCategoryId === categoryId;
                              
                              return (
                                <motion.div
                                  key={categoryId}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  onClick={() => setSelectedCategoryId(isSelected ? null : categoryId)}
                                  className={`rounded-xl border-2 p-4 cursor-pointer transition-all group ${
                                    isSelected
                                      ? 'border-red-600 bg-red-50 shadow-lg'
                                      : 'border-slate-200 bg-white hover:border-red-300 hover:bg-red-50 hover:shadow-md'
                                  }`}
                                  title={isSelected ? (t("categories.click_deselect") as string) : (t("categories.click_view_services") as string)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-lg font-bold text-slate-900">
                                          {category.categoryNameEnglish || category.categoryName}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs text-red-600 font-medium">
                                          <MousePointer className="h-3 w-3" />
                                          <span>{isSelected ? t("categories.selected") : t("categories.click")}</span>
                                        </div>
                                      </div>
                                      {category.description && (
                                        <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                                          {category.description}
                                        </p>
                                      )}
                                      {category.categoryImage && (
                                        <div className="mt-3 rounded-lg overflow-hidden">
                                          <img
                                            src={category.categoryImage.startsWith('http')
                                              ? category.categoryImage
                                              : `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || ''}${category.categoryImage}`}
                                            alt={category.categoryNameEnglish || category.categoryName}
                                            className="w-full h-32 object-cover"
                                            onError={(e) => {
                                              (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                          />
                                        </div>
                                      )}
                                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                                        <span>{t("categories.click_to_view")}</span>
                                        <ChevronRight
                                          className={`h-4 w-4 transition-transform ${
                                            isSelected ? 'rotate-90 text-red-600' : ''
                                          }`}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Services List Section */}
            <AnimatePresence>
              {selectedCategoryId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-extrabold text-slate-900">
                        {t("categories.services_in")} {categories?.find(c => c._id === selectedCategoryId)?.categoryNameEnglish || t("categories.category")}
                      </h2>
                      <button
                        onClick={() => setSelectedCategoryId(null)}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label={t("categories.close_services") as string}
                      >
                        <X className="h-5 w-5 text-slate-600" />
                      </button>
                    </div>

                    {servicesLoading && (
                      <div className="flex items-center justify-center py-12">
                        <LoadingSpinner size="lg" />
                      </div>
                    )}

                    {servicesError && (
                      <div className="flex items-center justify-center py-12">
                        <ErrorMessage message={servicesError} />
                      </div>
                    )}

                    {!servicesLoading && !servicesError && services && (
                      <>
                        {services.length === 0 ? (
                          <div className="text-center py-12">
                            <Package className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                            <p className="text-lg font-semibold text-slate-600">{t("categories.no_services_found")}</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service, index) => {
                              const serviceId = service._id || '';
                              const serviceImage = service.serviceImage && service.serviceImage.length > 0
                                ? service.serviceImage[0]
                                : null;
                              const imageUrl = serviceImage?.startsWith('http')
                                ? serviceImage
                                : `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || ''}${serviceImage}`;
                              
                              return (
                                <motion.div
                                  key={serviceId}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
                                >
                                  {serviceImage && (
                                    <div className="relative h-40 bg-slate-100">
                                      <img
                                        src={imageUrl}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div className="p-4">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                                      {service.title}
                                    </h3>
                                    {service.description && (
                                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                                        {service.description}
                                      </p>
                                    )}
                                    <div className="flex items-center justify-between">
                                      <div className="text-sm font-semibold text-slate-900">
                                        {service.priceRange?.from && service.priceRange?.to ? (
                                          <span>
                                            {t("categories.price_range").replace("{from}", service.priceRange.from.toLocaleString()).replace("{to}", service.priceRange.to.toLocaleString())}
                                          </span>
                                        ) : (
                                          <span className="text-slate-500">{t("categories.price_not_available")}</span>
                                        )}
                                      </div>
                                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        service.availability
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-red-100 text-red-700'
                                      }`}>
                                        {service.availability ? t("categories.available") : t("categories.unavailable")}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
