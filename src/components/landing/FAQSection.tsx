"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How can I register on the platform?",
    answer: "You can register easily by clicking the 'Join Us' button at the top of the page. You'll need to enter your phone number and basic information, and your account will be activated within minutes."
  },
  {
    question: "Are the platform's services safe and guaranteed?",
    answer: "Yes, all services on our platform are guaranteed. We verify the identity of service providers and provide warranties on all work. You can also read reviews from previous customers before booking."
  },
  {
    question: "What payment methods are available?",
    answer: "We offer several secure payment methods including: credit cards, bank transfers, cash on delivery, and electronic wallets. All transactions are protected by advanced encryption systems."
  },
  {
    question: "How can I rate a service provider?",
    answer: "After the service is completed, you'll receive a text message or notification in the app to rate the service. You can add a comment and rate from 1-5 stars."
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking for free up to 24 hours before the service time. If canceled after that, a small cancellation fee may apply."
  },
  {
    question: "How can I become a service provider on the platform?",
    answer: "You can register as a service provider by selecting 'Join as Service Provider' during registration. You'll need to submit your ID documents and professional certificates for verification."
  },
  {
    question: "Is the platform available in all cities?",
    answer: "Yes, our platform covers all major cities and areas in the Kingdom. If your area is not covered, you can contact us to add your area."
  },
  {
    question: "What is the refund policy?",
    answer: "If you're not satisfied with the service, you can request a full or partial refund within 48 hours of service completion. We'll review your request and respond within 24 hours."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          {faqs.map((faq, index) => (
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

      </div>
    </section>
  );
}
