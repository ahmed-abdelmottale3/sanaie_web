"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

type Messages = typeof en;

const locales: Record<string, Messages> = { en, ar };

type I18nContextValue = {
  locale: "en" | "ar";
  setLocale: (l: "en" | "ar") => void;
  t: (key: string) => string | string[];
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function useI18n() {
  const c = useContext(I18nContext);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<"en" | "ar">("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sanaie_lang");
      if (saved === "en" || saved === "ar") setLocaleState(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    // set html lang and dir
    try {
      document.documentElement.lang = locale === "ar" ? "ar" : "en";
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
      if (locale === "ar") {
        document.documentElement.classList.add("lang-ar");
        document.documentElement.classList.remove("lang-en");
      } else {
        document.documentElement.classList.add("lang-en");
        document.documentElement.classList.remove("lang-ar");
      }
    } catch (e) {}
  }, [locale]);

  const setLocale = (l: "en" | "ar") => {
    setLocaleState(l);
    try {
      localStorage.setItem("sanaie_lang", l);
    } catch (e) {}
  };

  const messages = useMemo(() => locales[locale], [locale]);

  const t = (key: string) => {
    const parts = key.split(".");
    let cur: any = messages as any;
    for (const p of parts) {
      cur = cur?.[p];
      if (cur === undefined) return key;
    }
    return cur;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
  );
}

export default I18nProvider;
