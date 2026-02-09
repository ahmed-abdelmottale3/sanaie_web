"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import LoadMoreButton from "../ui/LoadMoreButton";

const faqs = [
  {
    question: "What is Sanaie and how does it work?",
    answer: "Sanaie is a local services marketplace that connects customers with verified service providers. Search by category or use the request page to get quotes, then book and pay securely through the platform."
  },
  {
    question: "How do I find and book a service?",
    answer: "Browse categories or use the search bar to find services. Open a provider's profile to view ratings, past work, and prices, then choose a time and confirm the booking from the service page."
  },
  {
    question: "How are service providers verified?",
    answer: "Providers go through identity and document verification before offering services. We also collect customer reviews and ratings to maintain quality and trust on the platform."
  },
  {
    question: "Which payment methods are supported?",
    answer: "We support secure online payments (credit/debit cards and local wallets) and may offer cash-on-delivery where applicable. All card payments are processed over encrypted connections."
  },
  {
    question: "What is the cancellation and refund policy?",
    answer: "When you cancel an order, you can get a refund and keep it as credit in the app."
  },
  {
    question: "How can I become a service provider on Sanaie?",
    answer: "Sign up as a provider from the 'Join as Service Provider' link, submit required documents, and complete the onboarding steps. Once verified, you can publish services and receive bookings."
  },
  {
    question: "How do I advertise or promote my service on the site?",
    answer: "Advertisers can create promotional ads via the Ads section. Contact our sales team or use the dashboard (if available) to set up campaigns and target your audience."
  },
  {
    question: "Is Sanaie available in my city?",
    answer: "Sanaie currently operates in major cities across Egypt."
  },
  {
    question: "How can I contact customer support?",
    answer: "Use the support/contact page, email us, or call the helpline listed in the footer. Provide booking or account details so we can help quickly."
  }
];

export default function FAQSection() {
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
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Answers to the most common questions about our platform
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {visibleFaqs.map((faq, index) => (
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
                  {faq.question}
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
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          {hasMore && (
            <LoadMoreButton onClick={loadMore} label="Show more FAQs" />
          )}

          {!hasMore && visibleCount > PAGE_SIZE && (
            <div className="mt-3">
              <LoadMoreButton
                onClick={() => {
                  setVisibleCount(PAGE_SIZE);
                  setOpenIndex(null);
                }}
                label="Show less"
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
