"use client";

import { useI18n } from "../../i18n/I18nProvider";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Sanaie Platform"
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-slate-900">Sanaie Platform</span>
            </div>
            <p className="text-sm text-slate-600">
              {t("footer.tagline")}
            </p>
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
              <li><a href="#" className="hover:text-slate-900">{t("footer.documentation")}</a></li>
              <li><a href="#" className="hover:text-slate-900">{t("footer.support")}</a></li>
              <li><a href="#" className="hover:text-slate-900">{t("footer.contact")}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">{t("footer.privacy_policy")}</a></li>
              <li><a href="#" className="hover:text-slate-900">{t("footer.terms_of_service")}</a></li>
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
