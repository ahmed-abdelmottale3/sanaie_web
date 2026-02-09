"use client";

import { useState } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import LoadMoreButton from "../ui/LoadMoreButton";

const faqs = [
  "what_is",
  "find_book",
  "providers_verified",
  "payments",
  "cancellation",
  "become_provider",
  "advertise",
  "availability",
  "support",
];

export default function FAQSection() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const PAGE_SIZE = 4;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleFaqs = faqs.slice(0, visibleCount);
  const hasMore = visibleCount < faqs.length;
  const loadMore = () => setVisibleCount((c) => Math.min(c + PAGE_SIZE, faqs.length));

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            {t("faq.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t("faq.subtitle")}
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {visibleFaqs.map((key, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
              >
                  <span className="font-semibold text-gray-900 text-lg">
                  {t(`faq.${key}`)}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                  {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                      {t(`faq.${key}_answer`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          {hasMore && (
            <LoadMoreButton onClick={loadMore} label={t("faq.show_more") as string} />
          )}

          {!hasMore && visibleCount > PAGE_SIZE && (
            <div className="mt-3">
              <LoadMoreButton
                onClick={() => {
                  setVisibleCount(PAGE_SIZE);
                  setOpenIndex(null);
                }}
                label={t("faq.show_less") as string}
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
