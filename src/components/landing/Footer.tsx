"use client";

import { useI18n } from "../../i18n/I18nProvider";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Sanaie Platform"
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-slate-900">Sanaie Platform</span>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              {t("footer.tagline")}
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">{t("footer.contact_us")}</h3>
              <a href={`mailto:${t("footer.email")}`} className="flex items-start gap-3 text-sm text-slate-600 hover:text-red-600 transition-colors group">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-red-600" />
                <span>{t("footer.email")}</span>
              </a>
              <a href={`tel:${t("footer.phone")}`} className="flex items-start gap-3 text-sm text-slate-600 hover:text-red-600 transition-colors group">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-red-600" />
                <span dir="ltr">{t("footer.phone")}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{t("footer.address")}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">{t("footer.platform")}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#stats" className="hover:text-slate-900 transition-colors">{t("footer.statistics")}</a></li>
              <li><a href="#features" className="hover:text-slate-900 transition-colors">{t("footer.features")}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/documentation" className="hover:text-slate-900 transition-colors">{t("footer.documentation")}</a></li>
              <li><a href="/support" className="hover:text-slate-900 transition-colors">{t("footer.support")}</a></li>
              <li><a href="/contact" className="hover:text-slate-900 transition-colors">{t("footer.contact")}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/privacy-policy" className="hover:text-slate-900 transition-colors">{t("footer.privacy_policy")}</a></li>
              <li><a href="/terms-of-service" className="hover:text-slate-900 transition-colors">{t("footer.terms_of_service")}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} Sanaie Platform. {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
