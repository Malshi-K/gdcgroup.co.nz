"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
      const hubspotFormId =
        process.env.NEXT_PUBLIC_HUBSPOT_SUBSCRIBTION_FORM_ID;
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;

      const payload = {
        fields: [
          {
            name: "email",
            value: email,
          },
        ],
      };

      await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Error submitting to HubSpot:", error);
      setMessage("There was an error subscribing. Please try again.");
    }
  };

  const openPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  const openTermsModal = () => {
    setIsTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const linkClass =
    "text-sm text-white/75 hover:text-white transition-colors tracking-wide";

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-gradient-to-br from-primary-navy via-primary-navy to-[#0b2a4a] text-white"
    >
      {/* Main Footer Content */}
      <div className="site-x relative z-10 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1.7fr] gap-10 lg:gap-12">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <div className="transition-transform hover:scale-105">
              <Image
                src="/images/gdc-group-logo-white.png"
                alt="GDC Group"
                width={170}
                height={68}
                className="h-auto object-contain"
                // TODO: replace with official white/reversed logo
                style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>

          {/* COMPANY Section */}
          <div className="flex flex-col items-start">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-light-blue mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className={linkClass}>
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about-us/who-we-are" className={linkClass}>
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="/blogs" className={linkClass}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about-us/careers" className={linkClass}>
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* GET IN TOUCH Section */}
          <div className="flex flex-col items-start">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-light-blue mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact-us" className={linkClass}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/locations" className={linkClass}>
                  Our Locations
                </Link>
              </li>
              <li>
                <Link href="/about-us/review" className={linkClass}>
                  Leave Us a Review
                </Link>
              </li>
            </ul>
          </div>

          {/* PORTFOLIO Section */}
          <div className="flex flex-col items-start">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-light-blue mb-5">
              Portfolio
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/portfolio/all-projects" className={linkClass}>
                  All Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-bold tracking-wide mb-4">
              Subscribe to our Newsletter
            </h4>
            <div className="flex flex-row max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 px-4 py-3 rounded-l-lg rounded-r-none border-2 border-white outline-none text-dark bg-white placeholder:text-secondary focus:border-light-blue"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-primary-blue hover:bg-primary-blue-dark transition-colors text-white font-semibold px-6 py-3 rounded-r-lg rounded-l-none border-2 border-primary-blue hover:border-primary-blue-dark tracking-wide"
                onClick={handleSubscribe}
              >
                SUBSCRIBE
              </button>
            </div>
            {message && <p className="text-white/90 text-sm mt-3">{message}</p>}
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="relative z-10 border-t border-white/10 text-white/70 text-xs py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between site-x text-center sm:text-left gap-3">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
            <button
              onClick={openTermsModal}
              className="hover:text-white tracking-wide"
            >
              TERMS & CONDITIONS
            </button>
            <Link
              href="/privacy-policy"
              className="hover:text-white tracking-wide"
            >
              PRIVACY POLICY
            </Link>
            <Link
              href="/cookie-preferences"
              className="hover:text-white tracking-wide"
            >
              COOKIE SETTINGS
            </Link>
          </div>
          <span className="tracking-wide">
            © {currentYear}{" "}
            <a
              href="https://www.gdcdigital.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-blue hover:text-white"
            >
              GDC Digital Solutions
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex text-justify items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-3xl p-6 rounded shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-black font-bold"
              onClick={closeTermsModal}
            >
              <XMarkIcon className="h-6 w-6 text-black" />{" "}
              {/* Icon as the close button */}
            </button>
            <h2 className="text-2xl font-bold mb-4 text-primary-navy">
              Terms and Conditions
            </h2>
            <div className="overflow-y-auto max-h-96 pr-4 scrollbar-hide">
              <p className="text-dark">
                Welcome to&nbsp;
                <a
                  href="https://gdcgroup.co.nz"
                  className="text-primary-navy underline"
                >
                  gdcgroup.co.nz
                </a>
                &nbsp;(the &quot;Website&quot;). These terms and conditions
                (&quot;Terms&quot;) govern your access to and use of the Website
                operated by GDC Group trading as GDC Consultants (Asia) Limited (&quot;we,&quot;
                &quot;us,&quot; &quot;our&quot;). By accessing or using the
                Website, you agree to comply with and be bound by these Terms.
                If you do not agree to these Terms, please do not use our
                Website.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                1. Use of the Website
              </h3>
              <p className="text-dark">
                You agree to use the Website only for lawful purposes and in a
                manner that does not infringe the rights of, restrict, or
                inhibit anyone else&apos;s use and enjoyment of the Website.
              </p>
              <p className="text-dark">
                You agree not to disrupt the operation of the Website or
                transmit any harmful content such as viruses, malware, or any
                other destructive code.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                2. Intellectual Property
              </h3>
              <p className="text-dark">
                All content on the Website, including but not limited to text,
                graphics, logos, images, software, and other materials, is the
                intellectual property of GDC Group trading as GDC Consultants (Asia) Limited or its licensors.
                You may not reproduce, distribute, or use the content for any
                commercial purposes without our prior written consent.
              </p>
              <p className="text-dark">
                The trademarks, logos, and service marks displayed on the
                Website are the property of GDC Group trading as GDC Consultants (Asia) Limited or third
                parties. You are not permitted to use these marks without our
                prior written permission or the respective third-party
                owner&apos;s permission.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                3. Disclaimer of Warranties
              </h3>
              <p className="text-dark">
                The Website is provided on an &quot;as-is&quot; and
                &quot;as-available&quot; basis without any warranties of any
                kind, whether express or implied, including but not limited to
                implied warranties of merchantability, fitness for a particular
                purpose, or non-infringement.
              </p>
              <p className="text-dark">
                While we strive to ensure that the information on our Website is
                accurate and up to date, we do not warrant the completeness,
                accuracy, or reliability of any information or content found on
                the Website.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                4. Limitation of Liability
              </h3>
              <p className="text-dark">
                To the fullest extent permitted by law, GDC Group trading as GDC Consultants (Asia) Limited will not be liable for any direct, indirect, incidental,
                special, or consequential damages arising from your use of or
                inability to use the Website, including but not limited to
                damages for loss of profits, goodwill, data, or other intangible
                losses.
              </p>
              <p className="text-dark">
                We shall not be liable for any loss or damage caused by a
                distributed denial-of-service attack, viruses, or other
                technologically harmful material that may infect your computer
                equipment, programs, or data due to your use of the Website.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                5. Third-Party Links
              </h3>
              <p className="text-dark">
                The Website may contain links to third-party websites or
                services that are not owned or controlled by GDC Group trading as GDC Consultants (Asia) Limited. We have no control over and assume no responsibility for
                the content, privacy policies, or practices of any third-party
                websites or services.
              </p>
              <p className="text-dark">
                Your use of third-party websites is at your own risk, and you
                should review the terms and conditions of those websites before
                using them.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                6. User-Generated Content
              </h3>
              <p className="text-dark">
                If you submit or post any content, comments, or materials on the
                Website (&quot;User Content&quot;), you grant us a
                non-exclusive, royalty-free, perpetual, irrevocable, and fully
                sublicensable right to use, reproduce, modify, adapt, publish,
                translate, create derivative works from, distribute, and display
                such User Content in any media.
              </p>
              <p className="text-dark">
                You are solely responsible for any User Content you post and you
                agree not to post any content that is unlawful, defamatory,
                infringing, or otherwise objectionable.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                7. Privacy
              </h3>
              <p className="text-dark">
                Your use of the Website is also governed by our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary-navy underline"
                  onClick={closeTermsModal} // Close the Terms modal when navigating
                >
                  Privacy Policy
                </Link>
                . Please review it to understand how we collect, use, and
                protect your personal data.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                8. Termination
              </h3>
              <p className="text-dark">
                We reserve the right to suspend or terminate your access to the
                Website at any time without notice for any reason, including if
                we believe that you have violated these Terms.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                9. Indemnification
              </h3>
              <p className="text-dark">
                You agree to indemnify and hold harmless GDC Group trading as GDC Consultants (Asia) Limited and its affiliates, employees, agents, and licensors from
                any claims, damages, liabilities, losses, costs, or expenses
                (including reasonable legal fees) arising out of or related to
                your use of the Website, your violation of these Terms, or your
                violation of any rights of a third party.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                10. Governing Law
              </h3>
              <p className="text-dark">
                These Terms are governed by and construed in accordance with the
                laws of New Zealand. Any disputes arising from or relating to
                these Terms or your use of the Website will be subject to the
                exclusive jurisdiction of the courts of New Zealand.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                11. Changes to These Terms
              </h3>
              <p className="text-dark">
                We reserve the right to modify or update these Terms at any
                time. Any changes will be posted on this page with an updated
                effective date. Your continued use of the Website after any
                changes indicates your acceptance of the new Terms.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-primary-navy">
                12. Contact Us
              </h3>
              <p className="text-dark">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <p className="text-dark">GDC Group trading as GDC Consultants (Asia) Limited</p>
              <p className="text-dark">
                <a
                  href="mailto:info@gdcgroup.co.nz"
                  className="text-primary-navy underline"
                >
                  info@gdcgroup.co.nz
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
