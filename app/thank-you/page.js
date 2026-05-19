"use client";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-black p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-customBlue mb-4">Thank you for your message!</h1>
      <p className="text-lg text-gray-700 mb-6">We appreciate you contacting GDC Consultants Ltd. Our team will get back to you as soon as possible.</p>
      <a href="/" className="text-customBlue underline hover:text-customYellow">Return to Home</a>
    </div>
  );
}
