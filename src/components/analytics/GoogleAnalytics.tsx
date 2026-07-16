"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

/**
 * Google Analytics 4 component.
 * Only loads in production. Uses next/script with afterInteractive strategy.
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (process.env.NODE_ENV !== "production") return null;
  if (!measurementId) return null;

  return (
    <>
      <Script
        id="ga4-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}
