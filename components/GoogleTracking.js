'use client'

import { useState, useEffect, Suspense, memo, useCallback } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { hasAnalyticsCookieConsent, hasMarketingCookieConsent } from '@/utils/cookieUtils'

const GA_MEASUREMENT_ID = 'G-9YLKY3BK26'
const ADS_CONVERSION_ID = 'AW-742615805'
const DEBUG_MODE = true // Toggle this for debugging
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

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
  
  // Check for consent each time we're about to track
  const checkConsent = useCallback(() => {
    const hasAnalyticsConsent = hasAnalyticsCookieConsent()
    const hasMarketingConsent = hasMarketingCookieConsent()
    
    logAnalytics('Checking consent', { 
      analytics: hasAnalyticsConsent, 
      marketing: hasMarketingConsent 
    })
    
    return {
      analytics: hasAnalyticsConsent,
      marketing: hasMarketingConsent
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const consent = checkConsent()
      
      // Only track if user has given analytics consent
      if (typeof window.gtag === 'function' && consent.analytics) {
        const url = pathname + searchParams.toString()
        
        // Debug log before sending
        logAnalytics('Sending pageview', { 
          url, 
          title: document.title,
          GA_ID: GA_MEASUREMENT_ID,
          ADS_ID: consent.marketing ? ADS_CONVERSION_ID : null
        })
        
        // Prepare send_to array based on consent
        const sendTo = [GA_MEASUREMENT_ID]
        if (consent.marketing) {
          sendTo.push(ADS_CONVERSION_ID)
        }
        
        // Track pageview for both GA4 and Google Ads (if marketing consent given)
        window.gtag('event', 'page_view', {
          send_to: sendTo,
          page_location: window.location.href,
          page_path: url,
          page_title: document.title,
          debug_mode: DEBUG_MODE
        })
      } else {
        if (typeof window.gtag !== 'function') {
          logAnalytics('Error', 'gtag not found')
        } else {
          logAnalytics('Tracking skipped', 'No analytics consent')
        }
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams, checkConsent])

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
  // Always call hooks at the top level, regardless of whether we'll use their values
  const shouldLoadGA = useDelayedLoad()

  // Always render the tracking, but with consent mode
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
            
            // Setup consent mode
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
            
            // Check initial consent state
            const hasAnalyticsConsent = document.cookie.indexOf('gdcgroup-analytics-consent=true') !== -1;
            const hasMarketingConsent = document.cookie.indexOf('gdcgroup-marketing-consent=true') !== -1;
            
            // Update consent based on cookies
            gtag('consent', 'update', {
              'analytics_storage': hasAnalyticsConsent ? 'granted' : 'denied',
              'ad_storage': hasMarketingConsent ? 'granted' : 'denied',
              'ad_user_data': hasMarketingConsent ? 'granted' : 'denied',
              'ad_personalization': hasMarketingConsent ? 'granted' : 'denied'
            });

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