"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Users, CheckCircle } from "lucide-react";
import { useI18n } from "../../i18n/I18nProvider";

export default function FeaturesSection() {
  const { t } = useI18n();

  const features = [
    {
      icon: Users,
      titleKey: "features.large_community_title",
      descKey: "features.large_community_desc",
    },
    {
      icon: Shield,
      titleKey: "features.trusted_platform_title",
      descKey: "features.trusted_platform_desc",
    },
    {
      icon: Zap,
      titleKey: "features.quick_easy_title",
      descKey: "features.quick_easy_desc",
    },
    {
      icon: CheckCircle,
      titleKey: "features.quality_services_title",
      descKey: "features.quality_services_desc",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex rounded-lg bg-red-50 dark:bg-red-900/30 p-4 mb-4">
                  <Icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {t(feature.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
