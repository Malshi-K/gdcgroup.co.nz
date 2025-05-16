'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function ClarityScript() {
  const pathname = usePathname();
  
  // Track route changes
  useEffect(() => {
    if (window.clarity) {
      window.clarity("newPage");
    }
  }, [pathname]);
  
  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "rk8ue5lw7f");
      `}
    </Script>
  );
}