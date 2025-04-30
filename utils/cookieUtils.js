// utils/cookieUtils.js
import Cookies from 'js-cookie';

// Check if essential cookies consent is given
export const hasEssentialCookieConsent = () => {
  return Cookies.get('gdcgroup-essential-consent') === 'true';
};

// Check if analytics cookies consent is given
export const hasAnalyticsCookieConsent = () => {
  return Cookies.get('gdcgroup-analytics-consent') === 'true';
};

// Check if marketing cookies consent is given
export const hasMarketingCookieConsent = () => {
  return Cookies.get('gdcgroup-marketing-consent') === 'true';
};

// Set a session cookie
export const setSessionCookie = () => {
  if (hasEssentialCookieConsent()) {
    const sessionId = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
    Cookies.set('gdcgroup-session', sessionId, { path: '/' });
    return sessionId;
  }
  return null;
};

// Get current session ID
export const getSessionId = () => {
  return Cookies.get('gdcgroup-session');
};

// Initialize essential cookies when needed
export const initializeEssentialCookies = () => {
  if (hasEssentialCookieConsent() && !getSessionId()) {
    return setSessionCookie();
  }
  return getSessionId();
};

// Update all consent states
export const updateAllConsentStates = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    const analyticsConsent = hasAnalyticsCookieConsent();
    const marketingConsent = hasMarketingCookieConsent();
    
    // The existing consent update code
    window.gtag('consent', 'update', {
      'analytics_storage': analyticsConsent ? 'granted' : 'denied',
      'ad_storage': marketingConsent ? 'granted' : 'denied',
      'ad_user_data': marketingConsent ? 'granted' : 'denied',
      'ad_personalization': marketingConsent ? 'granted' : 'denied'
    });
    
    // Add this new event to track consent type
    let consentType = 'essential_only';
    if (analyticsConsent && marketingConsent) {
      consentType = 'all_consents';
    } else if (analyticsConsent) {
      consentType = 'analytics_consent';
    } else if (marketingConsent) {
      consentType = 'marketing_consent';
    }
    
    // Send a custom event with the consent type
    window.gtag('event', 'cookie_consent_updated', {
      'cookie_consent_type': consentType
    });

    window.gtag('set', 'user_properties', {
      'cookie_consent_type': consentType
    });
    
    return {
      analytics: analyticsConsent,
      marketing: marketingConsent
    };
  }
  
  return {
    analytics: false,
    marketing: false
  };
};