"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { usePathname } from "next/navigation";
import { BarChart3, Users, Briefcase, ShoppingBag, FileText, Megaphone, FolderTree, Menu, X, ChevronDown, Home, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RippleLink from "../ui/RippleLink";

const primaryNav = [
  { href: "/", key: "home", icon: Home },
  { href: "/customers", key: "customers", icon: Users },
  { href: "/providers", key: "providers", icon: Briefcase },
  { href: "/categories", key: "categories", icon: FolderTree },
];

const moreNav = [
  { href: "/services", key: "services", icon: ShoppingBag },
  { href: "/requests", key: "requests", icon: FileText },
  { href: "/ads", key: "ads", icon: Megaphone },
];

export default function Header() {
  const { locale, setLocale, t } = useI18n();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const setLanguage = (next: "en" | "ar") => {
    setLocale(next);
    setIsLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            <RippleLink href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Sanaie Platform Logo"
              className="h-8 w-auto rounded-full"
              />
            <span className="text-lg font-bold text-slate-900">{t('header.platform_name')}</span>
          </RippleLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <RippleLink
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t(`nav.${item.key}`)}</span>
                </RippleLink>
              );
            })}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setIsMoreOpen((s) => !s)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-slate-600 hover:bg-slate-100 hover:text-slate-900`}
                aria-expanded={isMoreOpen}
              >
                <ChevronDown className="h-4 w-4" />
                <span>{t('nav.more')}</span>
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50 overflow-hidden"
                  >
                      {moreNav.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <RippleLink
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-red-50 text-red-600 border-r-2 border-red-600"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                          onClick={() => setIsMoreOpen(false)}
                        >
                          <Icon className={`h-4 w-4 ${isActive ? "text-red-600" : ""}`} />
                            <span>{t(`nav.${item.key}`)}</span>
                        </RippleLink>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="relative lg:hidden" ref={menuRef}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50 modal-scrollbar max-h-64 overflow-y-auto"
                >
                  <nav className="flex flex-col">
                    {primaryNav.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <RippleLink
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-red-50 text-red-600 border-r-2 border-red-600"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon className={`h-4 w-4 ${isActive ? "text-red-600" : ""}`} />
                          <span>{t(`nav.${item.key}`)}</span>
                        </RippleLink>
                      );
                    })}

                    {/* Mobile 'More' collapsible */}
                    <div className="border-t border-slate-100 mt-2 pt-2">
                      <button
                        onClick={() => setIsMobileMoreOpen((s) => !s)}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-3">
                          <ChevronDown className="h-4 w-4 rotate-90" />
                          More
                        </span>
                        <span className="text-slate-500">{isMobileMoreOpen ? "Hide" : "Show"}</span>
                      </button>

                      <AnimatePresence>
                        {isMobileMoreOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="mt-1 overflow-hidden"
                          >
                            {moreNav.map((item) => {
                              const Icon = item.icon;
                              const isActive = pathname === item.href;
                              return (
                                <RippleLink
                                  key={item.href}
                                  href={item.href}
                                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive
                                      ? "bg-red-50 text-red-600 border-r-2 border-red-600"
                                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                  }`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <Icon className={`h-4 w-4 ${isActive ? "text-red-600" : ""}`} />
                                  <span>{t(`nav.${item.key}`)}</span>
                                </RippleLink>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

            {/* Language toggle (far right) */}
            <div className="ml-3 relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen((s) => !s)}
                aria-label="Toggle language menu"
                className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-slate-50"
              >
                <span className="sr-only">Change language</span>
                <Globe className="h-5 w-5 text-slate-700" />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => setLanguage('en')}
                      className={`w-full text-left px-3 py-2 text-sm ${locale === 'en' ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLanguage('ar')}
                      className={`w-full text-left px-3 py-2 text-sm ${locale === 'ar' ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      AR
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </div>
    </header>
  );
}
