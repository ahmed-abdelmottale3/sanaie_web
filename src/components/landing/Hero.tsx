"use client";

import { motion } from "framer-motion";
import CounterAnimation from "../analytics/CounterAnimation";
import { Users, Briefcase, ShoppingBag, FileText, Megaphone, FolderTree, ArrowRight } from "lucide-react";

interface HeroProps {
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

export default function Hero({ stats, loading = false }: HeroProps) {
  const totalUsers = (stats?.customers || 0) + (stats?.providers || 0);

  return (
    <section className="relative overflow-hidden text-white min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero.jpg')`,
            backgroundColor: '#dc2626', // Fallback red color
          }}
        />
      </div>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-red-300/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Welcome to Sanaie Platform
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mx-auto mt-6 max-w-2xl text-lg text-red-100 sm:text-xl md:text-2xl"
          >
            A leading platform connecting customers with trusted service providers.
            Join thousands of satisfied users and discover quality services.
          </motion.p>
          
          {!loading && stats && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
            >
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <Users className="mx-auto mb-2 h-6 w-6" />
                <div className="text-2xl font-bold">
                  <CounterAnimation value={totalUsers} />
                </div>
                <div className="text-xs text-red-100">Active Users</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <Briefcase className="mx-auto mb-2 h-6 w-6" />
                <div className="text-2xl font-bold">
                  <CounterAnimation value={stats.providers} />
                </div>
                <div className="text-xs text-red-100">Providers</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <ShoppingBag className="mx-auto mb-2 h-6 w-6" />
                <div className="text-2xl font-bold">
                  <CounterAnimation value={stats.services} />
                </div>
                <div className="text-xs text-red-100">Services</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <FileText className="mx-auto mb-2 h-6 w-6" />
                <div className="text-2xl font-bold">
                  <CounterAnimation value={stats.requests} />
                </div>
                <div className="text-xs text-red-100">Completed</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <Megaphone className="mx-auto mb-2 h-6 w-6" />
                <div className="text-2xl font-bold">
                  <CounterAnimation value={stats.ads} />
                </div>
                <div className="text-xs text-red-100">Active Ads</div>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <FolderTree className="mx-auto mb-2 h-6 w-6" />
                <div className="text-2xl font-bold">
                  <CounterAnimation value={stats.categories} />
                </div>
                <div className="text-xs text-red-100">Categories</div>
              </div>
            </motion.div>
          )}

          {loading && (
            <div className="mt-12 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#stats"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-red-600 shadow-lg transition-all hover:bg-red-50 hover:shadow-xl"
            >
              View Statistics
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
