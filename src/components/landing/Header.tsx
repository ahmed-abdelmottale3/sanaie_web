"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { BarChart3, Users, Briefcase, ShoppingBag, FileText, Megaphone, FolderTree, Menu, X, ChevronDown, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RippleLink from "../ui/RippleLink";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/providers", label: "Providers", icon: Briefcase },
  { href: "/categories", label: "Categories", icon: FolderTree },
  { href: "/services", label: "Services", icon: ShoppingBag },
  { href: "/requests", label: "Requests", icon: FileText },
  { href: "/ads", label: "Ads", icon: Megaphone },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

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
            <span className="text-lg font-bold text-slate-900">Sanaie Platform</span>
          </RippleLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
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
                  <span>{item.label}</span>
                </RippleLink>
              );
            })}
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
                    {navItems.map((item) => {
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
                          <span>{item.label}</span>
                        </RippleLink>
                      );
                    })}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
