import type { Metadata, Viewport } from "next";
import { Suspense } from 'react'
import "./globals.css";
import { Providers } from "./providers";
import MasterFooter from "@/components/MasterFooter";
import TrackingScripts from "@/components/analytics/TrackingScripts";
import PortalLayoutWrapper from "@/components/PortalLayoutWrapper";

export const metadata: Metadata = {
  title: "EL NAFEER | Sovereign Real Estate & Industrial Tech",
  description: "Billionaire-grade real estate acquisition and industrial engineering portal.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <body className="bg-black text-white antialiased">
        <Providers>
          <TrackingScripts />
          <PortalLayoutWrapper>
            <Suspense fallback={<div className="bg-black min-h-screen" />}>
              {children}
            </Suspense>
          </PortalLayoutWrapper>
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('PWA ServiceWorker registration successful');
                  }, function(err) {
                    console.log('PWA ServiceWorker registration failed: ', err);
                  });
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
