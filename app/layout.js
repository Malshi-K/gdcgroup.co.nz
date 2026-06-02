"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleTracking from "@/components/GoogleTracking";
import ClarityScript from "@/components/ClarityScript";
import CookieConsent from "@/components/cookie/CookieConsent";
import "@/app/globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isEngineeringServicesPage = pathname === "/engineering-services";

  // Global click event listeners for phone & email clicks
  useEffect(() => {
    const verifyAndTrack = (conversionId) => {
      // Check for marketing consent straight from cookies to prevent consent law violations
      const hasConsent =
        document.cookie.indexOf("gdcgroup-marketing-consent=true") !== -1;

      if (hasConsent && typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: conversionId,
        });
        console.log(`[Conversion Debug] Sent conversion to ${conversionId}`);
      } else {
        console.log(
          "[Conversion Debug] Click tracked locally, but Google transmission blocked (No Consent/No Gtag).",
        );
      }
    };

    const handlePhoneClick = (e) => {
      if (e.target.closest('a[href^="tel:"]')) {
        console.log("[Conversion Debug] Phone click detected");
        verifyAndTrack("AW-742615805/He2gCNrli9IbEP3VjeIC");
      }
    };

    const handleEmailClick = (e) => {
      if (e.target.closest('a[href^="mailto:"]')) {
        console.log("[Conversion Debug] Email click detected");
        verifyAndTrack("AW-742615805/rLvLCKu9hdIbEP3VjeIC");
      }
    };

    document.addEventListener("click", handlePhoneClick);
    document.addEventListener("click", handleEmailClick);

    return () => {
      document.removeEventListener("click", handlePhoneClick);
      document.removeEventListener("click", handleEmailClick);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MZRZLZ9G');`}
        </Script>
        {/* End Google Tag Manager */}
        <GoogleTracking />
        <Script
          src="https://js.hs-scripts.com/6187835.js"
          strategy="afterInteractive"
          id="hs-tracking-code"
        />
      </head>
      <body className="font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MZRZLZ9G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {!isEngineeringServicesPage && <Header />}
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <ScrollToTop />
        <ClarityScript />
      </body>
    </html>
  );
}
