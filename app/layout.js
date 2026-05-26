"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleTracking from "@/components/GoogleTracking";
import ClarityScript from "@/components/ClarityScript";
import "@/app/globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isEngineeringServicesPage = pathname === "/engineering-services";

  // Global click event listeners for phone & email clicks
  useEffect(() => {
    const verifyAndTrack = (conversionId) => {
      // Check for marketing consent straight from cookies to prevent consent law violations
      const hasConsent = document.cookie.indexOf('gdcgroup-marketing-consent=true') !== -1;
      
      if (hasConsent && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': conversionId
        });
        console.log(`[Conversion Debug] Sent conversion to ${conversionId}`);
      } else {
        console.log('[Conversion Debug] Click tracked locally, but Google transmission blocked (No Consent/No Gtag).');
      }
    };

    const handlePhoneClick = (e) => {
      if (e.target.closest('a[href^="tel:"]')) {
        console.log('[Conversion Debug] Phone click detected');
        verifyAndTrack('AW-742615805/He2gCNrli9IbEP3VjeIC');
      }
    };

    const handleEmailClick = (e) => {
      if (e.target.closest('a[href^="mailto:"]')) {
        console.log('[Conversion Debug] Email click detected');
        verifyAndTrack('AW-742615805/rLvLCKu9hdIbEP3VjeIC');
      }
    };

    document.addEventListener('click', handlePhoneClick);
    document.addEventListener('click', handleEmailClick);

    return () => {
      document.removeEventListener('click', handlePhoneClick);
      document.removeEventListener('click', handleEmailClick);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <GoogleTracking />
        {/* Next.js optimally manages script execution priorities */}
        <Script 
          src="https://js.hs-scripts.com/6187835.js" 
          strategy="afterInteractive" 
          id="hs-tracking-code"
        />
      </head>
      <body className="font-sans">
        {!isEngineeringServicesPage && <Header />}
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <ClarityScript />
      </body>
    </html>
  );
}