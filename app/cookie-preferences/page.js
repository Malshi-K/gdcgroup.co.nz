// pages/cookie-preferences.js
"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { updateAllConsentStates } from '@/utils/cookieUtils';

export default function CookiePreferences() {
  const [preferences, setPreferences] = useState({
    essential: true, // Always enabled
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Load current preferences
    setPreferences({
      essential: true,
      analytics: Cookies.get('gdcgroup-analytics-consent') === 'true',
      marketing: Cookies.get('gdcgroup-marketing-consent') === 'true'
    });
  }, []);

  const savePreferences = () => {
    // Essential cookies are always enabled
    Cookies.set('gdcgroup-essential-consent', 'true', { expires: 150 });
    
    // Set analytics cookies based on preference
    Cookies.set('gdcgroup-analytics-consent', preferences.analytics ? 'true' : 'false', { expires: 150 });
    
    // Set marketing cookies based on preference
    Cookies.set('gdcgroup-marketing-consent', preferences.marketing ? 'true' : 'false', { expires: 150 });
    
    // Update all consent states
    updateAllConsentStates();
    
    alert('Your cookie preferences have been saved.');
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-customBlue">Cookie Preferences</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8 max-w-2xl">
        <div className="mb-6 pb-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-medium text-customBlue">Essential Cookies</h3>
              <p className="text-gray-600 text-sm">These cookies are necessary for the website to function properly.</p>
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
              <h3 className="text-lg font-medium text-customBlue">Analytics Cookies</h3>
              <p className="text-gray-600 text-sm">These cookies help us understand how visitors interact with our website.</p>
            </div>
            <input 
              type="checkbox" 
              checked={preferences.analytics} 
              onChange={() => setPreferences({
                ...preferences,
                analytics: !preferences.analytics
              })}
              className="h-5 w-5"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-medium text-customBlue">Marketing Cookies</h3>
              <p className="text-gray-600 text-sm">These cookies are used to deliver relevant advertisements and track conversions.</p>
            </div>
            <input 
              type="checkbox" 
              checked={preferences.marketing} 
              onChange={() => setPreferences({
                ...preferences,
                marketing: !preferences.marketing
              })}
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
            className="border border-customBlue text-customBlue px-6 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
      
      <div>
        <Link 
          href="/privacy-policy"
          className="text-customBlue underline"
        >
          View our Privacy Policy
        </Link>
      </div>
    </div>
  );
}