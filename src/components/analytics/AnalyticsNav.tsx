"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Users, Briefcase, ShoppingBag, FileText, Megaphone, FolderTree } from "lucide-react";

const navItems = [
  { href: "/", label: "Overview", icon: BarChart3 },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/providers", label: "Providers", icon: Briefcase },
  { href: "/services", label: "Services", icon: ShoppingBag },
  { href: "/requests", label: "Requests", icon: FileText },
  { href: "/ads", label: "Ads", icon: Megaphone },
  { href: "/categories", label: "Categories", icon: FolderTree },
];

export default function AnalyticsNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">Analytics Dashboard</h2>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
