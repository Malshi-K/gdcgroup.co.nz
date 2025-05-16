// app/components/ClarityScript.jsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ClarityScript() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Paste your Microsoft Clarity code here
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rk8ue5lw7f");
  }, []);
  
  // Track route changes
  useEffect(() => {
    if (window.clarity) {
      window.clarity("newPage");
    }
  }, [pathname, searchParams]);
  
  return null;
}