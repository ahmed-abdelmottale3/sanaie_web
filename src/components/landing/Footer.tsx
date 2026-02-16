"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "../../i18n/I18nProvider";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const { t } = useI18n();
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPrivacy(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Sanaie Platform"
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-slate-900 dark:text-white">Sanaie Platform</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              {t("footer.tagline")}
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">{t("footer.contact_us")}</h3>
              <a href={`mailto:${t("footer.email")}`} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors group">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-red-600" />
                <span>{t("footer.email")}</span>
              </a>
              <a href={`tel:${t("footer.phone")}`} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors group">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-red-600" />
                <span dir="ltr">{t("footer.phone")}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{t("footer.address")}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{t("footer.platform")}</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/services" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t("footer.statistics")}</Link></li>
              <li><Link href="/categories" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t("footer.features")}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {t("footer.privacy_policy")}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Sanaie Platform. {t("footer.copyright")}</p>
        </div>
      </div>
      {showPrivacy && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 z-[9998]"
            onClick={() => setShowPrivacy(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("footer.privacy_policy") as string}
            className="relative z-[10000] max-w-3xl w-full mx-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-auto max-h-[80vh] p-6"
          >
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute top-3 right-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              aria-label="Close"
            >
              Close
            </button>
            <div className="prose prose-sm text-slate-700 dark:text-slate-300 max-w-none [&_h2]:dark:text-white [&_p]:dark:text-slate-300">
              {(() => {
                const getString = (v: string | string[]) =>
                  Array.isArray(v) ? v.join("\n\n") : v;
                const title = getString(t("footer.privacy_title"));
                const content = getString(t("footer.privacy_content"));
                return (
                  <>
                    <h2>{title}</h2>
                    {content.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
        </div>,
        document.body
      )}
    </footer>
  );
}
