"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-red-600 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-red-100 max-w-2xl mx-auto">
            Join our platform today and experience the difference. Whether you're looking for services or offering them, we're here to help.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 text-base font-semibold text-red-600 shadow-lg transition-all hover:bg-red-50 hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#stats"
              className="inline-flex items-center rounded-lg border-2 border-white px-8 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              View Statistics
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
