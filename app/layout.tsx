'use client'

import type { Metadata, Viewport } from "next";
import { Suspense } from 'react'
import "./globals.css";
import { Providers } from "./providers";
import { usePathname } from 'next/navigation';

import MasterFooter from "@/components/MasterFooter";
import TrackingScripts from "@/components/analytics/TrackingScripts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // Cinematic Portals should be exclusive and full-screen without the global footer
  const isPortal = pathname?.includes('/portal/') || pathname?.includes('/lever-pioneer/');

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
          <Suspense fallback={<div className="bg-black min-h-screen" />}>
            {children}
          </Suspense>
          {!isPortal && <MasterFooter />}
        </Providers>
      </body>
    </html>
  );
}

