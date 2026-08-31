'use client'

import Script from 'next/script'

export default function TrackingScripts() {
    return (
        <>
            {/* Google Analytics 4 - Commented out until real ID is provided to prevent console errors */}
            {/* 
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XXXXXXXXXX', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
            */}
        </>
    )
}
