import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

import MasterFooter from "@/components/MasterFooter";
import TrackingScripts from "@/components/analytics/TrackingScripts";

export const metadata: Metadata = {
  title: "EL-NAFEER | Luxury Real Estate AI Orchestration - Sherif Rosas",
  description: "Advanced Real Estate Marketing Platform powered by AI Agent Orchestration, developed and owned by Sherif Rosas AI Dev.",
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <body className="bg-black text-white antialiased">
        <Providers>
          <TrackingScripts />
          {children}
          <MasterFooter />
        </Providers>
      </body>
    </html>
  );
}

