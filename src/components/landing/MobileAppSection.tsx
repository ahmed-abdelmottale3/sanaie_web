"use client";

import { motion } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";

export default function MobileAppSection() {
  const { t, locale } = useI18n();

  const features = Array.isArray(t("mobile.features")) ? (t("mobile.features") as string[]) : [];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`text-3xl font-extrabold text-gray-900 sm:text-4xl ${locale === 'ar' ? 'text-ar-right' : ''}`}
            >
              {t("mobile.download_title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className={`mt-4 text-lg text-gray-600 ${locale === 'ar' ? 'text-ar-right' : ''}`}
            >
              {t("mobile.download_sub")}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 space-y-3 text-left"
            >
              {features.map((f, i) => (
                <li key={i} className="flex items-center text-gray-700">
                  <span className="mr-3 text-red-600">✓</span>
                  {f}
                </li>
              ))}
            </motion.ul>

            {/* Google Play Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className={`mt-8 ${locale === 'ar' ? 'text-ar-right' : ''}`}
            >
              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
              >
                <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className={`text-xs ${locale === 'ar' ? 'text-ar-right' : ''}`}>{t("mobile.get_on")}</div>
                  <div className="text-xl font-semibold -mt-1">{t("mobile.get_on_play")}</div>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-[280px] h-[570px] bg-gray-900 rounded-[3rem] shadow-2xl border-[14px] border-gray-800">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>

                {/* Screen */}
                <div className="absolute inset-0 rounded-[2.3rem] bg-gradient-to-br from-red-50 to-slate-50 overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-12 bg-white/80 backdrop-blur-sm"></div>

                  {/* Logo Display */}
                  <div className="flex items-center justify-center h-[calc(100%-3rem)] p-8">
                    <div className="relative w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center">
                      <img
                        src="/sanaie-logo.png"
                        alt="Sanaie App"
                        className="w-40 h-40 object-contain rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/logo.png";
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Home Button */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -z-10 bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
