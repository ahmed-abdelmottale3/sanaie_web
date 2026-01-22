import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SplashProvider } from "../contexts/SplashContext";
import GlobalSplashScreen from "../components/GlobalSplashScreen";
import AppLayout from "../components/ui/AppLayout";
import ScrollToTop from "../components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sanaie Platform - Connecting Customers with Service Providers",
  description: "Join thousands of customers and service providers on Sanaie Platform. Discover services, connect with professionals, and get things done.",
  keywords: "services, providers, customers, platform, sanaie",
  authors: [{ name: "Sanaie Platform" }],
  creator: "Sanaie Platform",
  publisher: "Sanaie Platform",
  openGraph: {
    title: "Sanaie Platform - Connecting Customers with Service Providers",
    description: "Join thousands of customers and service providers on Sanaie Platform. Discover services, connect with professionals, and get things done.",
    url: "https://sanaie-platform.com",
    siteName: "Sanaie Platform",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanaie Platform - Connecting Customers with Service Providers",
    description: "Join thousands of customers and service providers on Sanaie Platform. Discover services, connect with professionals, and get things done.",
    creator: "@sanaieplatform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SplashProvider>
          <GlobalSplashScreen />
          <AppLayout>
            {children}
          </AppLayout>
          <ScrollToTop />
          <Toaster position="top-right" />
        </SplashProvider>
      </body>
    </html>
  );
}
