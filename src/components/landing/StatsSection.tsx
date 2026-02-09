"use client";

import { motion } from "framer-motion";
import CounterAnimation from "../analytics/CounterAnimation";
import { Users, Briefcase, ShoppingBag, FileText, Megaphone, FolderTree } from "lucide-react";
import { useI18n } from "../../i18n/I18nProvider";

interface StatsSectionProps {
  stats?: {
    customers: number;
    providers: number;
    services: number;
    requests: number;
    ads: number;
    categories: number;
  };
  loading?: boolean;
}

export default function StatsSection({ stats, loading = false }: StatsSectionProps) {
  const { t } = useI18n();

  if (loading || !stats) {
    return null;
  }

  const totalUsers = stats.customers + stats.providers;

  const statItems = [
    {
      icon: Users,
      value: totalUsers,
      labelKey: "stats.total_users",
      descKey: "stats.total_users_desc",
      color: "text-red-600",
      bgColor: "bg-red-50",
      link: "/customers",
    },
    {
      icon: Briefcase,
      value: stats.providers,
      labelKey: "stats.service_providers",
      descKey: "stats.service_providers_desc",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      link: "/providers",
    },
    {
      icon: ShoppingBag,
      value: stats.services,
      labelKey: "stats.available_services",
      descKey: "stats.available_services_desc",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      link: "/services",
    },
    {
      icon: FileText,
      value: stats.requests,
      labelKey: "stats.completed_requests",
      descKey: "stats.completed_requests_desc",
      color: "text-red-500",
      bgColor: "bg-red-50",
      link: "/requests",
    },
    {
      icon: Megaphone,
      value: stats.ads,
      labelKey: "stats.active_advertisements",
      descKey: "stats.active_advertisements_desc",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      link: "/ads",
    },
    {
      icon: FolderTree,
      value: stats.categories,
      labelKey: "stats.service_categories",
      descKey: "stats.service_categories_desc",
      color: "text-red-700",
      bgColor: "bg-red-50",
      link: "/categories",
    },
  ];

  return (
    <section id="stats" className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl">
            {t("stats.title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {t("stats.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.labelKey}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-105 cursor-pointer"
              >
                <div className={`inline-flex rounded-lg ${item.bgColor} p-3 mb-4`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                  <CounterAnimation value={item.value} />
                </div>
                <div className="text-base font-semibold text-slate-900 mb-2">
                  {t(item.labelKey)}
                </div>
                <div className="text-sm text-slate-600">
                  {t(item.descKey)}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
