// pages/privacy-policy.js
"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-customBlue max-w-4xl mx-auto">
        Privacy Policy
      </h1>
      <div className="text-justify max-w-4xl mx-auto space-y-6">
        <p className="text-gray-800 mb-6">
          At GDC Consultants Ltd. (&quot;we,&quot; &quot;us,&quot;
          &quot;our&quot;), we are committed to protecting your privacy and
          ensuring that your personal information is handled in a safe and
          responsible manner. This privacy policy explains how we collect, use,
          and protect the personal data you provide to us through our website (
          <a
            href="https://gdcgroup.co.nz"
            className="text-customBlue underline"
          >
            gdcgroup.co.nz
          </a>
          ). Personal information refers to any information about an
          identifiable individual (a natural person).
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6 text-customBlue">
          Data Privacy
        </h2>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-customBlue">
          1. Information We Collect
        </h3>
        <p className="text-gray-800 mb-4">
          We may collect the following types of information from you:
        </p>
        <ul className="list-disc list-inside text-gray-800 space-y-3 pl-4">
          <li className="mb-2">
            <strong>Personal Information:</strong> Name, email address, phone
            number, mailing address, and other contact details when you contact
            us or submit inquiries through our website.
          </li>
          <li className="mb-2">
            <strong>Technical Information:</strong> IP address, browser type,
            operating system, device information, and other data related to your
            use of our website.
          </li>
          <li className="mb-2">
            <strong>Cookies and Tracking Technologies:</strong> We use cookies
            and similar technologies to enhance your browsing experience and
            gather usage data for analytical purposes. You can control cookies
            through your browser settings.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-customBlue">
          2. How We Use Your Information
        </h3>
        <p className="text-gray-800 mb-4">
          We may use the information we collect for the following purposes:
        </p>
        <ul className="list-disc list-inside text-gray-800 space-y-3 pl-4">
          <li className="mb-2">
            To respond to your inquiries and provide you with requested
            information about our services.
          </li>
          <li className="mb-2">
            To process transactions and deliver services you request.
          </li>
          <li className="mb-2">
            To improve our website and services through data analysis and usage
            trends.
          </li>
          <li className="mb-2">
            To send you newsletters, marketing communications, and promotional
            offers, if you have opted in to receive these communications.
          </li>
          <li className="mb-2">
            To comply with legal obligations and enforce our agreements.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-customBlue">
          3. Sharing of Your Information
        </h3>
        <p className="text-gray-800 mb-4">
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share your information in the following
          situations:
        </p>
        <ul className="list-disc list-inside text-gray-800 space-y-3 pl-4">
          <li className="mb-2">
            <strong>Service Providers:</strong> We may share your information
            with trusted service providers who assist us in operating our
            website and providing our services, as long as they agree to keep
            your information confidential.
          </li>
          <li className="mb-2">
            <strong>Legal Requirements:</strong> We may disclose your personal
            information if required by law or in response to legal requests,
            such as court orders or subpoenas.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-customBlue">
          4. Data Security
        </h3>
        <p className="text-gray-800 mb-4">
          We implement a variety of security measures to maintain the safety of
          your personal information. However, no method of transmission over the
          internet or electronic storage is 100% secure, and we cannot guarantee
          absolute security.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-customBlue">
          5. Your Rights
        </h3>
        <p className="text-gray-800 mb-3">You have the right to:</p>
        <ul className="list-disc list-inside text-gray-800 space-y-3 pl-4">
          <li>Access the personal data we hold about you.</li>
          <li>
            Request corrections to any inaccurate or incomplete information.
          </li>
          <li>
            Request the deletion of your personal data in certain circumstances.
          </li>
          <li>
            Object to the processing of your data for direct marketing purposes.
          </li>
          <li>Withdraw your consent to data processing at any time.</li>
        </ul>
        <p className="text-gray-800 mt-4">
          To exercise any of these rights, please contact us at{" "}
          <a
            href="mailto:info@gdcgroup.co.nz"
            className="text-customBlue underline"
          >
            info@gdcgroup.co.nz
          </a>{" "}
          or{" "}
          <a href="tel:078380090" className="text-customBlue underline">
            07 838 0090
          </a>
          .
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-customBlue">
          6. Third-Party Links
        </h3>
        <p className="text-gray-800 mb-4">
          Our website may contain links to third-party websites. These websites
          have their own privacy policies, and we do not assume any
          responsibility or liability for their content or privacy practices.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-customBlue">
          7. Changes to This Privacy Policy
        </h3>
        <p className="text-gray-800 mb-4">
          We may update this privacy policy from time to time. Any changes will
          be posted on this page with an updated effective date. We encourage
          you to review this policy regularly to stay informed about how we are
          protecting your information.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6 text-customBlue">
          Cookie Policy
        </h2>
        <p className="text-gray-800 mb-6">
          Our website uses cookies to enhance your browsing experience and help
          us improve our website. Cookies are small text files stored on your
          device that enable certain features and functionality.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-customBlue">
          Types of Cookies We Use
        </h3>

        <h4 className="text-lg font-medium mt-6 mb-3 text-customBlue">
          Essential Cookies
        </h4>
        <p className="text-gray-800 mb-6">
          These cookies are necessary for the website to function properly. They
          enable core functionality such as security, network management, and
          account access. You may disable these by changing your browser
          settings, but this may affect how the website functions.
        </p>

        <h4 className="text-lg font-medium mt-6 mb-3 text-customBlue">
          Analytics Cookies
        </h4>
        <p className="text-gray-800 mb-6">
          We use Google Analytics to collect anonymous information about how
          visitors use our website. These cookies help us understand user
          behavior, such as which pages are visited most frequently and how
          users navigate through our site. The information collected doesn't
          identify users personally and helps us make improvements to our
          website.
        </p>

        <h4 className="text-lg font-medium mt-6 mb-3 text-customBlue">
          Marketing Cookies
        </h4>
        <p className="text-gray-800 mb-3">
          Marketing cookies are used to track visitors across websites. The
          intention is to display ads that are relevant and engaging for the
          individual user and thereby more valuable for publishers and
          third-party advertisers. These cookies help us deliver targeted
          advertisements to you and measure the effectiveness of our advertising
          campaigns.
        </p>
        <p className="text-gray-800 mb-6">
          We use Google Ads and other advertising networks that may use cookies
          to personalize the ads you see. This helps us show you more relevant
          advertisements based on your interests and browsing history.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-customBlue">
          Managing Your Cookie Preferences
        </h3>
        <p className="text-gray-800 mb-6">
          You can choose whether to accept cookies through our cookie consent
          banner or by visiting our{" "}
          <Link
            href="/cookie-preferences"
            className="text-customBlue underline"
          >
            Cookie Preferences
          </Link>{" "}
          page. Additionally, most web browsers allow some control of cookies
          through browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-6 text-customBlue">
          Contact Us
        </h2>
        <div className="space-y-2 mb-8">
          <p className="text-gray-800">
            If you have any questions about this privacy policy or your personal
            information, please contact us at:
          </p>
          <p className="text-gray-800">GDC Consultants Ltd.</p>
          <p className="text-gray-800">89 Church Road, Pukete, Hamilton</p>
          <p className="text-gray-800">
            <a
              href="mailto:info@gdcgroup.co.nz"
              className="text-customBlue underline"
            >
              info@gdcgroup.co.nz
            </a>
          </p>
          <p className="text-gray-800">
            <a href="tel:078380090" className="text-customBlue underline">
              07 838 0090
            </a>
          </p>
          <p className="text-gray-800">
            <a
              href="https://gdcgroup.co.nz"
              className="text-customBlue underline"
            >
              gdcgroup.co.nz
            </a>
          </p>
        </div>
      </div>

      <div className="mt-10 mb-8 text-center">
        <Link
          href="/"
          className="bg-customBlue text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
