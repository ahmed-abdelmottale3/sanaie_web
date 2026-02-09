"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";
import { Mail, Phone, Send, Check } from "lucide-react";

export default function ContactSection() {
  const { t } = useI18n();
  const [selectedMethod, setSelectedMethod] = useState<
    "email" | "phone" | null
  >(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const email = "info@afaq-global.com";
  const phone = "01111194176";

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-center text-slate-700 font-medium mb-6">
              {t("contact.choose_method")}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedMethod((prev) =>
                    prev === "email" ? null : "email",
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedMethod((prev) =>
                      prev === "email" ? null : "email",
                    );
                  }
                }}
                className={`relative overflow-hidden rounded-2xl border-2 p-8 transition-all duration-300 ${
                  selectedMethod === "email"
                    ? "border-red-500 bg-red-50 shadow-lg"
                    : "border-slate-200 bg-white hover:border-red-300 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-4 rounded-full p-4 ${
                      selectedMethod === "email" ? "bg-red-100" : "bg-slate-100"
                    }`}
                  >
                    <Mail
                      className={`h-8 w-8 ${
                        selectedMethod === "email"
                          ? "text-red-600"
                          : "text-slate-600"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {t("contact.email_title")}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {t("contact.email_desc")}
                  </p>
                  {selectedMethod === "email" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="w-full"
                    >
                      <div className="mt-4 pt-4 border-t border-red-200">
                        <p className="text-sm font-medium text-slate-700 mb-3">
                          {t("contact.email_address")}
                        </p>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={(() => {
                              const label = t("contact.send_email");
                              return typeof label === "string"
                                ? label
                                : Array.isArray(label)
                                  ? label.join(" ")
                                  : "Send Email";
                            })()}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                          >
                            <Send className="h-4 w-4" />
                            {t("contact.send_email")}
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(email);
                            }}
                            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            title={(() => {
                              const copyText = t("contact.copy");
                              return typeof copyText === "string"
                                ? copyText
                                : Array.isArray(copyText)
                                  ? copyText.join(" ")
                                  : "";
                            })()}
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <span className="text-sm font-medium text-slate-700">
                                {t("contact.copy")}
                              </span>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-3 break-all">
                          {email}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Phone Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                onClick={() =>
                  setSelectedMethod((prev) =>
                    prev === "phone" ? null : "phone",
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedMethod((prev) =>
                      prev === "phone" ? null : "phone",
                    );
                  }
                }}
                className={`relative overflow-hidden rounded-2xl border-2 p-8 transition-all duration-300 ${
                  selectedMethod === "phone"
                    ? "border-blue-500 bg-blue-50 shadow-lg"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-4 rounded-full p-4 ${
                      selectedMethod === "phone"
                        ? "bg-blue-100"
                        : "bg-slate-100"
                    }`}
                  >
                    <Phone
                      className={`h-8 w-8 ${
                        selectedMethod === "phone"
                          ? "text-blue-600"
                          : "text-slate-600"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {t("contact.phone_title")}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {t("contact.phone_desc")}
                  </p>
                  {selectedMethod === "phone" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="w-full"
                    >
                      <div className="mt-4 pt-4 border-t border-blue-200">
                        <p className="text-sm font-medium text-slate-700 mb-3">
                          {t("contact.phone_number")}
                        </p>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          >
                            <Phone className="h-4 w-4" />
                            {t("contact.call_now")}
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(phone);
                            }}
                            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            title={(() => {
                              const copyText = t("contact.copy");
                              return typeof copyText === "string"
                                ? copyText
                                : Array.isArray(copyText)
                                  ? copyText.join(" ")
                                  : "";
                            })()}
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <span className="text-sm font-medium text-slate-700">
                                {t("contact.copy")}
                              </span>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-3" dir="ltr">
                          {phone}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Address Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-white rounded-2xl border border-slate-200 px-8 py-6 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">
                {t("contact.visit_us")}
              </h4>
              <p className="text-sm text-slate-600">{t("footer.address")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
