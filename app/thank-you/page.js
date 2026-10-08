"use client";

import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-black p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-navy mb-4">
        Thank you for your message!
      </h1>
      <p className="text-lg text-dark mb-6">
        We appreciate you contacting GDC Group. Our team will get back
        to you as soon as possible.
      </p>
      <Link
        href="/"
        className="text-primary-navy underline hover:text-primary-blue"
      >
        Return to Home
      </Link>
    </div>
  );
}
