"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleTracking from "@/components/GoogleTracking";

export default function RootLayout({ children }) {
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
        }, 2000); // Add a 1-second delay
      };
      document.body.appendChild(chatbotScript);
    }
  });

  return (
    <html lang="en">
      <head>
        <GoogleTracking />
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
