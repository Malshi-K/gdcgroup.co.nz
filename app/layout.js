"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleTracking from "@/components/GoogleTracking";
import {
  initializeEssentialCookies,
  updateAllConsentStates,
} from "@/utils/cookieUtils";
import CookieConsent from "@/components/cookie/CookieConsent";
import "@/app/globals.css";
import { usePathname } from "next/navigation";
import ClarityScript from "@/components/ClarityScript";

export default function RootLayout({ children }) {
  // Get the current pathname
  const pathname = usePathname();

  // Check if we're on the engineering-services page
  const isEngineeringServicesPage = pathname === "/engineering-services";

  useEffect(() => {
    const trackingScriptId = "hs-tracking-code";
    if (!document.getElementById(trackingScriptId)) {
      const trackingScript = document.createElement("script");
      trackingScript.src = `https://js.hs-scripts.com/6187835.js`;
      trackingScript.id = trackingScriptId;
      trackingScript.async = true;
      trackingScript.defer = true;
      document.head.appendChild(trackingScript);
    }

    const chatbotScriptId = "hs-chatbot-loader";
    if (!document.getElementById(chatbotScriptId)) {
      const chatbotScript = document.createElement("script");
      chatbotScript.src = `https://js.hs-scripts.com/6187835.js`;
      chatbotScript.id = chatbotScriptId;
      chatbotScript.async = true;
      chatbotScript.defer = true;
      chatbotScript.onload = () => {
        setTimeout(() => {
          window.HubSpotConversations?.widget.load({
            chatflowId: 244224,
            portalId: 6187835,
          });
        }, 2000); // Add a 2-second delay
      };
      document.body.appendChild(chatbotScript);
    }
  }, []);

  useEffect(() => {
    // Initialize essential cookies
    initializeEssentialCookies();

    // Check and update all consent states
    const timeoutId = setTimeout(() => {
      updateAllConsentStates();
    }, 2500); // Wait for GA to be fully initialized

    return () => clearTimeout(timeoutId);
  }, []);

  // Google Ads Conversion Tracking (Footer Script)
  useEffect(() => {
    const footerScriptId = "google-ads-conversion-footer";
    if (!document.getElementById(footerScriptId)) {
      const footerScript = document.createElement("script");
      footerScript.id = footerScriptId;
      footerScript.innerHTML = `
        window.addEventListener("load", function () {
          var contactTimer = setInterval(function () {
            if (document.querySelectorAll(" .opacity-100.translate-y-0 > p").length != 0) {
              gtag("event", "conversion", {
                send_to: "AW-742615805/RGWiCIamnIEbEP3VjeIC",
              })
              clearInterval(contactTimer)
            }
          }, 1000)
        })
      `;
      document.body.appendChild(footerScript);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <GoogleTracking />
        {/* Google tag (gtag.js) - Header Section */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-742615805"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-742615805');
            `,
          }}
        />
      </head>
      <body className="font-sans">
        {!isEngineeringServicesPage && <Header />}
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <CookieConsent />
        <ClarityScript />
        
        {/* Phone Call Conversion Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                document.addEventListener('click', function(e){
                  if(e.target.closest('a[href^="tel:"]')){
                    gtag('event', 'conversion', {'send_to': 'AW-742615805/He2gCNrli9IbEP3VjeIC'});
                  }
                });
              })();
            `,
          }}
        />
        
        {/* Email Click Conversion Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                document.addEventListener('click', function(e){
                  if(e.target.closest('a[href^="mailto:"]')){
                    gtag('event', 'conversion', {'send_to': 'AW-742615805/rLvLCKu9hdIbEP3VjeIC'});
                  }
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
