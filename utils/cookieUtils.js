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

// New function to track cookie consent events
export const trackConsentSelection = (consentType, isAccepted) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cookie_consent_update', {
      'consent_type': consentType,
      'consent_value': isAccepted ? 'accepted' : 'declined',
      'non_interaction': false
    });
    
    // For debugging
    if (window.DEBUG_MODE) {
      console.log(
        `%c[Analytics Debug] Cookie Consent Event`,
        'background: #f0f0f0; color: #333; padding: 2px 5px; border-radius: 3px;',
        { consentType, isAccepted }
      );
    }
  }
}

// Update all consent states
export const updateAllConsentStates = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    const analyticsConsent = hasAnalyticsCookieConsent();
    const marketingConsent = hasMarketingCookieConsent();
    
    // Update consent mode
    window.gtag('consent', 'update', {
      'analytics_storage': analyticsConsent ? 'granted' : 'denied',
      'ad_storage': marketingConsent ? 'granted' : 'denied',
      'ad_user_data': marketingConsent ? 'granted' : 'denied',
      'ad_personalization': marketingConsent ? 'granted' : 'denied'
    });
    
    // Track analytics consent
    trackConsentSelection('analytics', analyticsConsent);
    
    // Track marketing consent
    trackConsentSelection('marketing', marketingConsent);
    
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