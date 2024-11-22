// components/GoogleTracking.jsx
'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

const GA_MEASUREMENT_ID = 'G-9YLKY3BK26'
const ADS_CONVERSION_ID = 'AW-742615805'

function GoogleTrackingEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (window.gtag) {
      // Track pageview for both GA4 and Google Ads
      window.gtag('event', 'page_view', {
        send_to: [GA_MEASUREMENT_ID, ADS_CONVERSION_ID],
        page_location: window.location.href,
        page_path: pathname + searchParams.toString(),
        page_title: document.title
      });
    }
  }, [pathname, searchParams])

  return null
}

export default function GoogleTracking() {
  return (
    <>
      {/* Google tag (gtag.js) */}
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
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Configure GA4
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false,
              cookie_flags: 'SameSite=None;Secure'
            });

            // Configure Google Ads
            gtag('config', '${ADS_CONVERSION_ID}', {
              send_page_view: false,
              cookie_flags: 'SameSite=None;Secure'
            });

            // Link Google Ads with GA4
            gtag('config', '${GA_MEASUREMENT_ID}', {
              'link_google_ads': ['${ADS_CONVERSION_ID}']
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleTrackingEvents />
      </Suspense>
    </>
  )
}

// Optional: Export a helper function for manual conversion tracking if needed
export const trackConversion = (conversionLabel, value = 0) => {
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${ADS_CONVERSION_ID}/${conversionLabel}`,
      value: value,
      currency: 'NZD'
    });
  }
};