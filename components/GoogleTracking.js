"use client";

import { useState, useEffect, Suspense, memo, useCallback } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { hasAnalyticsCookieConsent, hasMarketingCookieConsent } from "@/utils/cookieUtils";

const GA_MEASUREMENT_ID = "G-9YLKY3BK26";
const ADS_CONVERSION_ID = "AW-742615805";
const DEBUG_MODE = true; 
const IS_PRODUCTION =
  process.env.NODE_ENV === "production" &&
  typeof window !== "undefined" &&
  (window.location.hostname === "gdcgroup.co.nz" ||
    window.location.hostname === "www.gdcgroup.co.nz");
// const IS_PRODUCTION = true;

const logAnalytics = (action, data) => {
  if (DEBUG_MODE) {
    console.log(
      `%c[Analytics Debug] ${action}`,
      "background: #f0f0f0; color: #333; padding: 2px 5px; border-radius: 3px;",
      data,
    );
  }
};

const GoogleTrackingEvents = memo(function GoogleTrackingEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const checkConsent = useCallback(() => {
    return {
      analytics: hasAnalyticsCookieConsent(),
      marketing: hasMarketingCookieConsent(),
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const consent = checkConsent();

      if (typeof window.gtag === "function" && consent.analytics) {
        const url = pathname + searchParams.toString();
        const sendTo = [GA_MEASUREMENT_ID];
        if (consent.marketing) sendTo.push(ADS_CONVERSION_ID);

        window.gtag("event", "page_view", {
          send_to: sendTo,
          page_location: window.location.href,
          page_path: url,
          page_title: document.title,
          debug_mode: DEBUG_MODE,
        });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams, checkConsent]);

  return null;
});

export default function GoogleTracking() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShouldLoad(true), 100);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!IS_PRODUCTION || !shouldLoad) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            if (!window.gtag) {
              window.gtag = function(){ dataLayer.push(arguments); }
            }
            window.gtag('js', new Date());

            window.gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });

            const hasAnalytics = document.cookie.indexOf('gdcgroup-analytics-consent=true') !== -1;
            const hasMarketing = document.cookie.indexOf('gdcgroup-marketing-consent=true') !== -1;

            window.gtag('consent', 'update', {
              'analytics_storage': hasAnalytics ? 'granted' : 'denied',
              'ad_storage': hasMarketing ? 'granted' : 'denied',
              'ad_user_data': hasMarketing ? 'granted' : 'denied',
              'ad_personalization': hasMarketing ? 'granted' : 'denied'
            });

            window.gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false,
              cookie_flags: 'SameSite=None;Secure',
              debug_mode: ${DEBUG_MODE}
            });

            window.gtag('config', '${ADS_CONVERSION_ID}', {
              send_page_view: false,
              cookie_flags: 'SameSite=None;Secure',
              debug_mode: ${DEBUG_MODE}
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleTrackingEvents />
      </Suspense>
    </>
  );
}