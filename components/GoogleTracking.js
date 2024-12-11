'use client'

import { useState, useEffect, Suspense, memo } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'

const GA_MEASUREMENT_ID = 'G-9YLKY3BK26'
const ADS_CONVERSION_ID = 'AW-742615805'
const DEBUG_MODE = true // Toggle this for debugging

// Debug logger with styled console output
const logAnalytics = (action, data) => {
  if (DEBUG_MODE) {
    console.log(
      `%c[Analytics Debug] ${action}`,
      'background: #f0f0f0; color: #333; padding: 2px 5px; border-radius: 3px;',
      data
    )
  }
}

const GoogleTrackingEvents = memo(function GoogleTrackingEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (typeof window.gtag === 'function') {
        const url = pathname + searchParams.toString()
        
        // Debug log before sending
        logAnalytics('Sending pageview', { 
          url, 
          title: document.title,
          GA_ID: GA_MEASUREMENT_ID,
          ADS_ID: ADS_CONVERSION_ID
        })
        
        // Track pageview for both GA4 and Google Ads
        window.gtag('event', 'page_view', {
          send_to: [GA_MEASUREMENT_ID, ADS_CONVERSION_ID],
          page_location: window.location.href,
          page_path: url,
          page_title: document.title,
          debug_mode: DEBUG_MODE
        })
      } else {
        logAnalytics('Error', 'gtag not found')
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams])

  return null
})

function useDelayedLoad() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    logAnalytics('Initializing', 'Starting delayed load')
    const timeoutId = setTimeout(() => {
      setShouldLoad(true)
      logAnalytics('Loaded', 'Analytics ready to load')
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [])

  return shouldLoad
}

export default function GoogleTracking() {
  const shouldLoadGA = useDelayedLoad()

  useEffect(() => {
    // Verify analytics installation
    if (DEBUG_MODE) {
      setTimeout(() => {
        if (typeof window.gtag === 'function') {
          logAnalytics('Status', 'Analytics installed and running')
          // Test basic event
          window.gtag('event', 'test_event', {
            debug_mode: true,
            send_to: [GA_MEASUREMENT_ID, ADS_CONVERSION_ID]
          })
        } else {
          logAnalytics('Error', 'Analytics not installed properly')
        }
      }, 2000)
    }
  }, [])

  if (!shouldLoadGA) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        onLoad={() => logAnalytics('Script loaded', 'Base script ready')}
        onError={() => logAnalytics('Script error', 'Base script failed to load')}
      />
      <Script
        id="google-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              dataLayer.push(arguments);
              if(${DEBUG_MODE}) {
                console.log('[Analytics Debug] dataLayer push:', arguments);
              }
            }
            gtag('js', new Date());

            // Configure GA4
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false,
              cookie_flags: 'SameSite=None;Secure',
              debug_mode: ${DEBUG_MODE}
            });

            // Configure Google Ads
            gtag('config', '${ADS_CONVERSION_ID}', {
              send_page_view: false,
              cookie_flags: 'SameSite=None;Secure',
              debug_mode: ${DEBUG_MODE}
            });

            // Link Google Ads with GA4
            gtag('config', '${GA_MEASUREMENT_ID}', {
              'link_google_ads': ['${ADS_CONVERSION_ID}']
            });
          `,
        }}
        onLoad={() => logAnalytics('Config loaded', 'Analytics configuration complete')}
        onError={() => logAnalytics('Config error', 'Analytics configuration failed')}
      />
      <Suspense fallback={null}>
        <GoogleTrackingEvents />
      </Suspense>
    </>
  )
}