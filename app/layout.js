"use client";
import { useEffect } from "react";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleTracking from "@/components/GoogleTracking";

export default function RootLayout({ children }) {
  // HubSpot Chatbot widget initialization
  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window !== 'undefined') {
      // Add a delay to ensure HubSpot script is fully loaded
      const timer = setTimeout(() => {
        if (window.HubSpotConversations) {
          window.HubSpotConversations.widget.load({
            chatflowId: 244224,
            portalId: 6187835,
          });
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array ensures this only runs once

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTracking />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        
        {/* HubSpot Tracking Script */}
        <Script
          id="hs-tracking-code"
          src="https://js.hs-scripts.com/6187835.js"
          strategy="afterInteractive"
        />
        
        {/* HubSpot Chatbot Script */}
        <Script
          id="hs-chatbot-loader"
          src="https://js.hs-scripts.com/6187835.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}