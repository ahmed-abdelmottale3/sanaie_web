"use client";

import { motion } from "framer-motion";
import CounterAnimation from "../analytics/CounterAnimation";
import { Users, Briefcase, ShoppingBag, FileText, Megaphone, FolderTree } from "lucide-react";

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
  if (loading || !stats) {
    return null;
  }

  const totalUsers = stats.customers + stats.providers;

  const statItems = [
    {
      icon: Users,
      value: totalUsers,
      label: "Total Active Users",
      description: "Customers and providers actively using our platform",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Briefcase,
      value: stats.providers,
      label: "Service Providers",
      description: "Trusted professionals ready to serve you",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: ShoppingBag,
      value: stats.services,
      label: "Available Services",
      description: "Wide range of services across multiple categories",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      icon: FileText,
      value: stats.requests,
      label: "Completed Requests",
      description: "Successfully completed service requests",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Megaphone,
      value: stats.ads,
      label: "Active Advertisements",
      description: "Promotional content reaching our audience",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: FolderTree,
      value: stats.categories,
      label: "Service Categories",
      description: "Diverse categories to meet all your needs",
      color: "text-red-700",
      bgColor: "bg-red-50",
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
            Platform Statistics
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Real-time statistics showcasing our growing community and successful platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={
                  item.label === "Total Active Users" ? "/customers" :
                  item.label === "Service Providers" ? "/providers" :
                  item.label === "Available Services" ? "/services" :
                  item.label === "Completed Requests" ? "/requests" :
                  item.label === "Active Advertisements" ? "/ads" :
                  item.label === "Service Categories" ? "/categories" : "#"
                }
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
                  {item.label}
                </div>
                <div className="text-sm text-slate-600">
                  {item.description}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
