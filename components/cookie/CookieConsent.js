// components/cookie/CookieConsent.js
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { trackConsentSelection } from "@/utils/cookieUtils";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always enabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if essential cookie consent has been given
    const hasEssentialConsent =
      Cookies.get("gdcgroup-essential-consent") === "true";

    if (!hasEssentialConsent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      setCookiePreferences({
        essential: true,
        analytics: Cookies.get("gdcgroup-analytics-consent") === "true",
        marketing: Cookies.get("gdcgroup-marketing-consent") === "true",
      });
    }
  }, []);

  const acceptAllCookies = () => {
    // Set essential cookies consent
    Cookies.set("gdcgroup-essential-consent", "true", { expires: 150 });
    // Set analytics cookies consent
    Cookies.set("gdcgroup-analytics-consent", "true", { expires: 150 });
    // Set marketing cookies consent
    Cookies.set("gdcgroup-marketing-consent", "true", { expires: 150 });
    // Set session cookie
    Cookies.set("gdcgroup-session", generateSessionId(), { path: "/" });

    // Update consent state
    updateConsentState(true, true);

    // Track "Accept All" event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('event', 'cookie_banner_interaction', {
        'action': 'accept_all',
        'non_interaction': false
      });
      
      // Track individual consent types
      trackConsentSelection('essential', true);
      trackConsentSelection('analytics', true);
      trackConsentSelection('marketing', true);
    }

    setShowBanner(false);
  };

  const acceptSelectedCookies = () => {
    // Essential cookies are always set
    Cookies.set("gdcgroup-essential-consent", "true", { expires: 150 });
    Cookies.set("gdcgroup-session", generateSessionId(), { path: "/" });

    // Set analytics cookie based on user preference
    Cookies.set(
      "gdcgroup-analytics-consent",
      cookiePreferences.analytics ? "true" : "false",
      { expires: 150 }
    );

    // Set marketing cookie based on user preference
    Cookies.set(
      "gdcgroup-marketing-consent",
      cookiePreferences.marketing ? "true" : "false",
      { expires: 150 }
    );

    // Update consent state
    updateConsentState(
      cookiePreferences.analytics,
      cookiePreferences.marketing
    );
    
    // Track "Save Preferences" event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('event', 'cookie_banner_interaction', {
        'action': 'save_preferences',
        'non_interaction': false
      });
      
      // Track individual consent types
      trackConsentSelection('essential', true);
      trackConsentSelection('analytics', cookiePreferences.analytics);
      trackConsentSelection('marketing', cookiePreferences.marketing);
    }

    setShowBanner(false);
  };

  const updateConsentState = (analyticsConsent, marketingConsent) => {
    // Update gtag consent settings
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: analyticsConsent ? "granted" : "denied",
        ad_storage: marketingConsent ? "granted" : "denied",
        ad_user_data: marketingConsent ? "granted" : "denied",
        ad_personalization: marketingConsent ? "granted" : "denied",
      });
    }
  };

  const generateSessionId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  // Track UI interactions 
  const handleCustomizeClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag('event', 'cookie_banner_interaction', {
        'action': showOptions ? 'hide_options' : 'customize',
        'non_interaction': false
      });
    }
    setShowOptions(!showOptions);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-customBlue bg-opacity-95 text-white py-4 px-6 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col justify-between items-start">
        <div className="mb-4 text-sm md:text-base">
          This website uses cookies to ensure proper operation and enhance your
          experience. You can customize your preferences or accept all cookies.
        </div>

        {showOptions && (
          <div className="mb-4 w-full max-w-3xl">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg mb-3">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-white border-opacity-20">
                <div>
                  <h4 className="font-medium">Essential Cookies</h4>
                  <p className="text-sm text-gray-200">
                    These cookies are necessary for the website to function
                    properly.
                  </p>
                </div>
                <div className="ml-2">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.essential}
                    disabled={true}
                    className="h-5 w-5"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-3 pb-3 border-b border-white border-opacity-20">
                <div>
                  <h4 className="font-medium">Analytics Cookies</h4>
                  <p className="text-sm text-gray-200">
                    These cookies help us understand how visitors interact with
                    our website.
                  </p>
                </div>
                <div className="ml-2">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytics}
                    onChange={() => {
                      const newValue = !cookiePreferences.analytics;
                      // Track checkbox change
                      trackConsentSelection('analytics', newValue);
                      setCookiePreferences({
                        ...cookiePreferences,
                        analytics: newValue,
                      });
                    }}
                    className="h-5 w-5"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Marketing Cookies</h4>
                  <p className="text-sm text-gray-200">
                    These cookies are used to deliver relevant advertisements
                    and track conversions.
                  </p>
                </div>
                <div className="ml-2">
                  <input
                    type="checkbox"
                    checked={cookiePreferences.marketing}
                    onChange={() => {
                      const newValue = !cookiePreferences.marketing;
                      // Track checkbox change
                      trackConsentSelection('marketing', newValue);
                      setCookiePreferences({
                        ...cookiePreferences,
                        marketing: newValue,
                      });
                    }}
                    className="h-5 w-5"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCustomizeClick}
            className="text-white border border-white px-4 py-2 text-sm rounded hover:bg-white hover:text-customBlue transition-colors"
          >
            {showOptions ? "Hide Options" : "Customize"}
          </button>

          {showOptions ? (
            <button
              onClick={acceptSelectedCookies}
              className="bg-white text-customBlue px-6 py-2 text-sm rounded font-medium hover:bg-customYellow transition-colors"
            >
              Save Preferences
            </button>
          ) : (
            <>
              <Link
                href="/privacy-policy"
                className="text-white border border-white px-4 py-2 text-sm rounded hover:bg-white hover:text-customBlue transition-colors"
                onClick={() => {
                  if (typeof window !== "undefined" && window.gtag) {
                    window.gtag('event', 'cookie_banner_interaction', {
                      'action': 'learn_more',
                      'non_interaction': false
                    });
                  }
                }}
              >
                Learn More
              </Link>
              <button
                onClick={acceptAllCookies}
                className="bg-customYellow text-customBlue px-6 py-2 text-sm rounded font-medium hover:bg-white transition-colors"
              >
                Accept All
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}