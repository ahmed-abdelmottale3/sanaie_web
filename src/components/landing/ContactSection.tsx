"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "../../i18n/I18nProvider";
import { Mail, Send, Check } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
  // WhatsApp expects international format without + or leading zeros
  const waNumberIntl = "201111194176"; // +20 1111194176 -> 201111194176
  const waMessage = (() => {
    const msg = t("contact.whatsapp_msg");
    return typeof msg === "string"
      ? msg
      : Array.isArray(msg)
      ? msg.join(" ")
      : "";
  })();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
            <p className="text-center text-slate-700 dark:text-slate-300 font-medium mb-6">
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
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20 shadow-lg"
                    : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-red-300 dark:hover:border-red-500 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-4 rounded-full p-4 ${
                      selectedMethod === "email" ? "bg-red-100 dark:bg-red-900/40" : "bg-slate-100 dark:bg-slate-700"
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
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {t("contact.email_title")}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {t("contact.email_desc")}
                  </p>
                  {selectedMethod === "email" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="w-full"
                    >
                      <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
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
                            className="px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
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
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {t("contact.copy")}
                              </span>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 break-all">
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
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg"
                    : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-green-300 dark:hover:border-green-500 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-4 rounded-full p-4 ${
                      selectedMethod === "phone"
                        ? "bg-green-100 dark:bg-green-900/40"
                        : "bg-slate-100 dark:bg-slate-700"
                    }`}
                  >
                    <WhatsAppIcon
                      className={`h-8 w-8 ${
                        selectedMethod === "phone"
                          ? "text-green-600"
                          : "text-slate-600"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {t("contact.phone_title")}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {t("contact.phone_desc")}
                  </p>
                  {selectedMethod === "phone" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="w-full"
                    >
                      <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                          {t("contact.phone_number")}
                        </p>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${waNumberIntl}?text=${encodeURIComponent(
                              waMessage,
                            )}`}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={(() => {
                              const label = t("contact.whatsapp_now");
                              return typeof label === "string"
                                ? label
                                : Array.isArray(label)
                                ? label.join(" ")
                                : "Message on WhatsApp";
                            })()}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors font-medium"
                          >
                            <WhatsAppIcon className="h-4 w-4" />
                            {t("contact.whatsapp_now")}
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(phone);
                            }}
                            className="px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
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
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {t("contact.copy")}
                              </span>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3" dir="ltr">
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
            <div className="inline-block bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-600 px-8 py-6 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                {t("contact.visit_us")}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t("footer.address")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
