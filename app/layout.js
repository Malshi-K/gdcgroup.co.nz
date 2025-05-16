"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleTracking from "@/components/GoogleTracking";
import { initializeEssentialCookies, updateAllConsentStates } from '@/utils/cookieUtils';
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

  return (
    <html lang="en">
      <head>
        <GoogleTracking />
      </head>
      <body className="font-sans">
        {!isEngineeringServicesPage && <Header />}
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <CookieConsent />
        <ClarityScript />
      </body>
    </html>
  );
}