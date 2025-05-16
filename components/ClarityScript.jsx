'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function ClarityScript() {
  const pathname = usePathname();
  const clarityId = "rk8ue5lw7f"; // Your Clarity project ID
  
  // Only track production environment
  const shouldLoadClarity = () => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname;
    return hostname === 'gdcgroup.co.nz';
  };
  
  // Track route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.clarity && shouldLoadClarity()) {
      window.clarity("newPage");
    }
  }, [pathname]);
  
  // Only render the script in production
  if (!shouldLoadClarity()) {
    return null;
  }
  
  return (
    <Script 
      id="microsoft-clarity" 
      strategy="afterInteractive"
      onLoad={() => {
        console.log('Clarity script loaded successfully');
      }}
    >
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarityId}");
      `}
    </Script>
  );
}