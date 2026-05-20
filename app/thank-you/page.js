"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ThankYouPage() {
  useEffect(() => {
    document.title = "Thank You | GDC Consultants";

    const transactionId =
      Date.now() + "-" + Math.random().toString(36).substring(2, 9);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-742615805/RGWiCIamnIEbEP3VjeIC",
        transaction_id: transactionId,
        value: 4.0,
        currency: "NZD",
      });

      console.log("Google Ads conversion triggered");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-black p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-customBlue mb-4">
        Thank you for your message!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        We appreciate you contacting GDC Consultants Ltd. Our team will get back
        to you as soon as possible.
      </p>
      <Link
        href="/"
        className="text-customBlue underline hover:text-customYellow"
      >
        Return to Home
      </Link>
    </div>
  );
}
