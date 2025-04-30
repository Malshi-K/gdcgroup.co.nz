// pages/cookie-preferences.js
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  updateAllConsentStates,
  trackConsentSelection,
} from "@/utils/cookieUtils";

export default function CookiePreferences() {
  const [preferences, setPreferences] = useState({
    essential: true, // Always enabled
    analytics: false,
    marketing: false,
  });

  // Track initial preferences for comparison
  const [initialPreferences, setInitialPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Load current preferences
    const currentAnalytics =
      Cookies.get("gdcgroup-analytics-consent") === "true";
    const currentMarketing =
      Cookies.get("gdcgroup-marketing-consent") === "true";

    setPreferences({
      essential: true,
      analytics: currentAnalytics,
      marketing: currentMarketing,
    });

    // Save initial state for comparison when saving
    setInitialPreferences({
      analytics: currentAnalytics,
      marketing: currentMarketing,
    });

    // Track page view with custom dimension
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "Cookie Preferences Page",
        cookie_preferences_page: true,
      });
    }
  }, []);

  const savePreferences = () => {
    // Essential cookies are always enabled
    Cookies.set("gdcgroup-essential-consent", "true", { expires: 150 });

    // Set analytics cookies based on preference
    Cookies.set(
      "gdcgroup-analytics-consent",
      preferences.analytics ? "true" : "false",
      { expires: 150 }
    );

    // Set marketing cookies based on preference
    Cookies.set(
      "gdcgroup-marketing-consent",
      preferences.marketing ? "true" : "false",
      { expires: 150 }
    );

    // Update all consent states
    updateAllConsentStates();

    // Track preferences update event
    if (typeof window !== "undefined" && window.gtag) {
      // Track the save action
      window.gtag("event", "preferences_page_action", {
        action: "save_preferences",
        non_interaction: false,
      });

      // Track if any preferences changed
      if (initialPreferences.analytics !== preferences.analytics) {
        trackConsentSelection("analytics", preferences.analytics);
        window.gtag("event", "preferences_changed", {
          preference_type: "analytics",
          new_value: preferences.analytics ? "accepted" : "declined",
          previous_value: initialPreferences.analytics
            ? "accepted"
            : "declined",
        });
      }

      if (initialPreferences.marketing !== preferences.marketing) {
        trackConsentSelection("marketing", preferences.marketing);
        window.gtag("event", "preferences_changed", {
          preference_type: "marketing",
          new_value: preferences.marketing ? "accepted" : "declined",
          previous_value: initialPreferences.marketing
            ? "accepted"
            : "declined",
        });
      }
    }

    alert("Your cookie preferences have been saved.");
  };

  const handleCancel = () => {
    // Track cancel action
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "preferences_page_action", {
        action: "cancel",
        non_interaction: false,
      });
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-customBlue">
        Cookie Preferences
      </h1>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8 max-w-2xl">
        <div className="mb-6 pb-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-medium text-customBlue">
                Essential Cookies
              </h3>
              <p className="text-gray-600 text-sm">
                These cookies are necessary for the website to function
                properly.
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.essential}
              disabled={true}
              className="h-5 w-5"
            />
          </div>
        </div>

        <div className="mb-6 pb-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-medium text-customBlue">
                Analytics Cookies
              </h3>
              <p className="text-gray-600 text-sm">
                These cookies help us understand how visitors interact with our
                website.
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={() => {
                const newValue = !preferences.analytics;
                // Track checkbox toggle interaction
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "preference_checkbox_toggle", {
                    preference_type: "analytics",
                    new_state: newValue ? "checked" : "unchecked",
                  });
                }
                setPreferences({
                  ...preferences,
                  analytics: newValue,
                });
              }}
              className="h-5 w-5"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-medium text-customBlue">
                Marketing Cookies
              </h3>
              <p className="text-gray-600 text-sm">
                These cookies are used to deliver relevant advertisements and
                track conversions.
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() => {
                const newValue = !preferences.marketing;
                // Track checkbox toggle interaction
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "preference_checkbox_toggle", {
                    preference_type: "marketing",
                    new_state: newValue ? "checked" : "unchecked",
                  });
                }
                setPreferences({
                  ...preferences,
                  marketing: newValue,
                });
              }}
              className="h-5 w-5"
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={savePreferences}
            className="bg-customBlue text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Save Preferences
          </button>
          <Link
            href="/"
            onClick={handleCancel}
            className="border border-customBlue text-customBlue px-6 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>

      <div>
        <Link
          href="/privacy-policy"
          onClick={() => {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "preferences_page_action", {
                action: "view_privacy_policy",
                non_interaction: false,
              });
            }
          }}
          className="text-customBlue underline"
        >
          View our Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export const generateMetadata = async () => {
  return {
    title: "Cookie Preferences | GDC Group",
    description: "Manage your cookie preferences for GDC Group website",
    keywords:
      "GDC careers, engineering jobs, architectural jobs, New Zealand engineering careers, project management jobs, engineering consultant positions",
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://gdcgroup.co.nz/cookie-preferences",
      languages: {
        "en-NZ": "https://gdcgroup.co.nz/cookie-preferences",
        en: "https://gdcgroup.co.nz/cookie-preferences",
      },
    },
  };
};
