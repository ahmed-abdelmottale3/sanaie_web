"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Users, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Large Community",
    description: "Join thousands of active users and service providers in our growing community.",
  },
  {
    icon: Shield,
    title: "Trusted Platform",
    description: "Verified service providers and secure transactions for peace of mind.",
  },
  {
    icon: Zap,
    title: "Quick & Easy",
    description: "Find and connect with service providers quickly and effortlessly.",
  },
  {
    icon: CheckCircle,
    title: "Quality Services",
    description: "Access a wide range of professional services across multiple categories.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl">
            Why Choose Sanaie Platform?
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Discover what makes us the preferred choice for customers and service providers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex rounded-lg bg-red-50 p-4 mb-4">
                  <Icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
