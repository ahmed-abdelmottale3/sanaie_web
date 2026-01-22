"use client";

import { motion } from "framer-motion";
import CounterAnimation from "./CounterAnimation";
import { Users, Briefcase, ShoppingBag, FileText, Megaphone, FolderTree } from "lucide-react";

interface HeroSectionProps {
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

export default function HeroSection({ stats, loading = false }: HeroSectionProps) {
  const totalUsers = (stats?.customers || 0) + (stats?.providers || 0);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-8 text-white shadow-2xl md:p-12">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold md:text-5xl lg:text-6xl">
            Welcome to Sanaie Platform
          </h1>
          <p className="mt-4 text-lg text-blue-100 md:text-xl">
            A leading platform connecting customers with service providers
          </p>
        </motion.div>

        {!loading && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
          >
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <Users className="mb-2 h-6 w-6" />
              <div className="text-2xl font-bold">
                <CounterAnimation value={totalUsers} />
              </div>
              <div className="text-xs text-blue-100">Active Users</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <Briefcase className="mb-2 h-6 w-6" />
              <div className="text-2xl font-bold">
                <CounterAnimation value={stats.providers} />
              </div>
              <div className="text-xs text-blue-100">Service Providers</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <ShoppingBag className="mb-2 h-6 w-6" />
              <div className="text-2xl font-bold">
                <CounterAnimation value={stats.services} />
              </div>
              <div className="text-xs text-blue-100">Available Services</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <FileText className="mb-2 h-6 w-6" />
              <div className="text-2xl font-bold">
                <CounterAnimation value={stats.requests} />
              </div>
              <div className="text-xs text-blue-100">Completed Requests</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <Megaphone className="mb-2 h-6 w-6" />
              <div className="text-2xl font-bold">
                <CounterAnimation value={stats.ads} />
              </div>
              <div className="text-xs text-blue-100">Active Ads</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <FolderTree className="mb-2 h-6 w-6" />
              <div className="text-2xl font-bold">
                <CounterAnimation value={stats.categories} />
              </div>
              <div className="text-xs text-blue-100">Categories</div>
            </div>
          </motion.div>
        )}

        {loading && (
          <div className="mt-8 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          </div>
        )}
      </div>
    </div>
  );
}
