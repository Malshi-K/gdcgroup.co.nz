"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

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

  useEffect(() => {
    const footer = document.getElementById("footer");
    const observer = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          footer.style.backgroundImage =
            "url('/images/GDC-OFFICE-EDIT-scaled.webp')";
          observer.disconnect();
        }
      },
      {
        root: null, // Observe the viewport
        threshold: 0.1, // Start loading when 10% of the footer is in view
      }
    );
    observer.observe(footer);
  }, []);

  return (
    <footer
      id="footer"
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: "none" }} // Initially no background image
    >
      {/* Dark Overlay for the Entire Footer */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Subscription Section */}
      <div className="relative z-10 flex flex-col items-center pt-10">
        <h4 className="text-white text-xl font-bold mb-4 tracking-wide text-center">
          Subscribe to our Newsletter
        </h4>
        <div className="flex flex-col sm:flex-row items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-3 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none outline-none w-80 text-black mb-2 sm:mb-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-customBlue text-white p-3 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none tracking-wide"
            onClick={handleSubscribe}
          >
            SUBSCRIBE
          </button>
        </div>
        {message && <p className="text-white mt-2">{message}</p>}
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto bg-customBlue bg-opacity-80 p-10 backdrop-blur-sm shadow-lg mt-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Company Info Column */}
          <div className="flex flex-col items-start">
            <Image
              src="/images/GDC logo 2024 white.webp"
              alt="GDC Logo"
              width={200}
              height={60}
              className="h-auto mb-4 object-contain"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* COMPANY Section */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold mb-4 text-md tracking-wide">
              COMPANY
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services"
                  className="hover:text-customYellow tracking-wide"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us/who-we-are"
                  className="hover:text-customYellow tracking-wide"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-customYellow tracking-wide"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us/careers"
                  className="hover:text-customYellow tracking-wide"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* GET IN TOUCH Section */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold mb-4 text-md tracking-wide">
              GET IN TOUCH
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/locations"
                  className="hover:text-customYellow tracking-wide"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="hover:text-customYellow tracking-wide"
                >
                  Our Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us/review"
                  className="hover:text-customYellow tracking-wide"
                >
                  Leave Us a Review
                </Link>
              </li>
            </ul>
          </div>

          {/* PORTFOLIO Section */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold mb-4 text-md tracking-wide">
              PORTFOLIO
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/portfolio/all-projects"
                  className="hover:text-customYellow tracking-wide"
                >
                  All Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* FOLLOW Section */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold mb-4 text-md tracking-wide">
              FOLLOW US
            </h4>
            <div
              className="flex space-x-4"
              role="navigation"
              aria-label="Social Media Links"
            >
              {/* Facebook Icon */}
              <a
                href="https://www.facebook.com/GdcConsultantsLtd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-customYellow transition-colors duration-300 p-2"
                aria-label="Visit GDC Consultants on Facebook"
              >
                <span className="sr-only">
                  Visit GDC Consultants on Facebook
                </span>
                <FaFacebookF size={24} aria-hidden="true" title="Facebook" />
              </a>

              {/* LinkedIn Icon */}
              <a
                href="https://nz.linkedin.com/company/gdcconsultants"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-customYellow transition-colors duration-300 p-2"
                aria-label="Connect with GDC Consultants on LinkedIn"
              >
                <span className="sr-only">
                  Connect with GDC Consultants on LinkedIn
                </span>
                <FaLinkedinIn size={24} aria-hidden="true" title="LinkedIn" />
              </a>

              {/* Instagram Icon */}
              <a
                href="https://www.instagram.com/gdc_consultants/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-customYellow transition-colors duration-300 p-2"
                aria-label="Follow GDC Consultants on Instagram"
              >
                <span className="sr-only">
                  Follow GDC Consultants on Instagram
                </span>
                <FaInstagram size={24} aria-hidden="true" title="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="relative z-10 bg-customBlue bg-opacity-80 text-gray-400 text-xs py-4 mx-auto backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between px-10 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
            <button
              onClick={openTermsModal}
              className="hover:text-white tracking-wide"
            >
              TERMS & CONDITIONS
            </button>
            <button
              onClick={openPrivacyModal}
              className="hover:text-white tracking-wide"
            >
              PRIVACY POLICY
            </button>
          </div>
          <span className="tracking-wide mt-2 sm:mt-0">
            © {currentYear}{" "}
            <a
              href="https://www.gdcdigital.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GDC Digital Solutions
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex text-justify items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-3xl p-6 rounded shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-black font-bold"
              onClick={closePrivacyModal}
            >
              <XMarkIcon className="h-6 w-6 text-black" />{" "}
              {/* Icon as the close button */}
            </button>
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Privacy Policy
            </h2>
            <div className="overflow-y-auto max-h-96 pr-4 scrollbar-hide">
              <p className="text-gray-800">
                At GDC Consultants Ltd. (&quot;we,&quot; &quot;us,&quot;
                &quot;our&quot;), we are committed to protecting your privacy
                and ensuring that your personal information is handled in a safe
                and responsible manner. This privacy policy explains how we
                collect, use, and protect the personal data you provide to us
                through our website (
                <a
                  href="https://www.gdcgroup.co.nz"
                  className="text-customBlue underline"
                >
                  www.gdcgroup.co.nz
                </a>
                ). Personal information refers to any information about an
                identifiable individual (a natural person).
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                1. Information We Collect
              </h3>
              <p className="text-gray-800">
                We may collect the following types of information from you:
              </p>
              <ul className="list-disc list-inside text-gray-800">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, mailing address, and other contact details when
                  you contact us or submit inquiries through our website.
                </li>
                <li>
                  <strong>Technical Information:</strong> IP address, browser
                  type, operating system, device information, and other data
                  related to your use of our website.
                </li>
                <li>
                  <strong>Cookies and Tracking Technologies:</strong> We use
                  cookies and similar technologies to enhance your browsing
                  experience and gather usage data for analytical purposes. You
                  can control cookies through your browser settings.
                </li>
              </ul>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                2. How We Use Your Information
              </h3>
              <p className="text-gray-800">
                We may use the information we collect for the following
                purposes:
              </p>
              <ul className="list-disc list-inside text-gray-800">
                <li>
                  To respond to your inquiries and provide you with requested
                  information about our services.
                </li>
                <li>
                  To process transactions and deliver services you request.
                </li>
                <li>
                  To improve our website and services through data analysis and
                  usage trends.
                </li>
                <li>
                  To send you newsletters, marketing communications, and
                  promotional offers, if you have opted in to receive these
                  communications.
                </li>
                <li>
                  To comply with legal obligations and enforce our agreements.
                </li>
              </ul>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                3. Sharing of Your Information
              </h3>
              <p className="text-gray-800">
                We do not sell, trade, or rent your personal information to
                third parties. However, we may share your information in the
                following situations:
              </p>
              <ul className="list-disc list-inside text-gray-800">
                <li>
                  <strong>Service Providers:</strong> We may share your
                  information with trusted service providers who assist us in
                  operating our website and providing our services, as long as
                  they agree to keep your information confidential.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your
                  personal information if required by law or in response to
                  legal requests, such as court orders or subpoenas.
                </li>
              </ul>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                4. Data Security
              </h3>
              <p className="text-gray-800">
                We implement a variety of security measures to maintain the
                safety of your personal information. However, no method of
                transmission over the internet or electronic storage is 100%
                secure, and we cannot guarantee absolute security.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                5. Your Rights
              </h3>
              <p className="text-gray-800">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-800">
                <li>Access the personal data we hold about you.</li>
                <li>
                  Request corrections to any inaccurate or incomplete
                  information.
                </li>
                <li>
                  Request the deletion of your personal data in certain
                  circumstances.
                </li>
                <li>
                  Object to the processing of your data for direct marketing
                  purposes.
                </li>
                <li>Withdraw your consent to data processing at any time.</li>
              </ul>
              <p className="text-gray-800">
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

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                6. Third-Party Links
              </h3>
              <p className="text-gray-800">
                Our website may contain links to third-party websites. These
                websites have their own privacy policies, and we do not assume
                any responsibility or liability for their content or privacy
                practices.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                7. Changes to This Privacy Policy
              </h3>
              <p className="text-gray-800">
                We may update this privacy policy from time to time. Any changes
                will be posted on this page with an updated effective date. We
                encourage you to review this policy regularly to stay informed
                about how we are protecting your information.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                8. Contact Us
              </h3>
              <p className="text-gray-800">
                If you have any questions about this privacy policy or your
                personal information, please contact us at:
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
                  href="https://www.gdcgroup.co.nz"
                  className="text-customBlue underline"
                >
                  www.gdcgroup.co.nz
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

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
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Terms and Conditions
            </h2>
            <div className="overflow-y-auto max-h-96 pr-4 scrollbar-hide">
              <p className="text-gray-800">
                Welcome to&nbsp;
                <a
                  href="https://www.gdcgroup.co.nz"
                  className="text-customBlue underline"
                >
                  www.gdcgroup.co.nz
                </a>
                &nbsp;(the &quot;Website&quot;). These terms and conditions
                (&quot;Terms&quot;) govern your access to and use of the Website
                operated by GDC Consultants Ltd. (&quot;we,&quot;
                &quot;us,&quot; &quot;our&quot;). By accessing or using the
                Website, you agree to comply with and be bound by these Terms.
                If you do not agree to these Terms, please do not use our
                Website.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                1. Use of the Website
              </h3>
              <p className="text-gray-800">
                You agree to use the Website only for lawful purposes and in a
                manner that does not infringe the rights of, restrict, or
                inhibit anyone else&apos;s use and enjoyment of the Website.
              </p>
              <p className="text-gray-800">
                You agree not to disrupt the operation of the Website or
                transmit any harmful content such as viruses, malware, or any
                other destructive code.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                2. Intellectual Property
              </h3>
              <p className="text-gray-800">
                All content on the Website, including but not limited to text,
                graphics, logos, images, software, and other materials, is the
                intellectual property of GDC Consultants Ltd. or its licensors.
                You may not reproduce, distribute, or use the content for any
                commercial purposes without our prior written consent.
              </p>
              <p className="text-gray-800">
                The trademarks, logos, and service marks displayed on the
                Website are the property of GDC Consultants Ltd. or third
                parties. You are not permitted to use these marks without our
                prior written permission or the respective third-party
                owner&apos;s permission.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                3. Disclaimer of Warranties
              </h3>
              <p className="text-gray-800">
                The Website is provided on an &quot;as-is&quot; and
                &quot;as-available&quot; basis without any warranties of any
                kind, whether express or implied, including but not limited to
                implied warranties of merchantability, fitness for a particular
                purpose, or non-infringement.
              </p>
              <p className="text-gray-800">
                While we strive to ensure that the information on our Website is
                accurate and up to date, we do not warrant the completeness,
                accuracy, or reliability of any information or content found on
                the Website.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                4. Limitation of Liability
              </h3>
              <p className="text-gray-800">
                To the fullest extent permitted by law, GDC Consultants Ltd.
                will not be liable for any direct, indirect, incidental,
                special, or consequential damages arising from your use of or
                inability to use the Website, including but not limited to
                damages for loss of profits, goodwill, data, or other intangible
                losses.
              </p>
              <p className="text-gray-800">
                We shall not be liable for any loss or damage caused by a
                distributed denial-of-service attack, viruses, or other
                technologically harmful material that may infect your computer
                equipment, programs, or data due to your use of the Website.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                5. Third-Party Links
              </h3>
              <p className="text-gray-800">
                The Website may contain links to third-party websites or
                services that are not owned or controlled by GDC Consultants
                Ltd. We have no control over and assume no responsibility for
                the content, privacy policies, or practices of any third-party
                websites or services.
              </p>
              <p className="text-gray-800">
                Your use of third-party websites is at your own risk, and you
                should review the terms and conditions of those websites before
                using them.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                6. User-Generated Content
              </h3>
              <p className="text-gray-800">
                If you submit or post any content, comments, or materials on the
                Website (&quot;User Content&quot;), you grant us a
                non-exclusive, royalty-free, perpetual, irrevocable, and fully
                sublicensable right to use, reproduce, modify, adapt, publish,
                translate, create derivative works from, distribute, and display
                such User Content in any media.
              </p>
              <p className="text-gray-800">
                You are solely responsible for any User Content you post and you
                agree not to post any content that is unlawful, defamatory,
                infringing, or otherwise objectionable.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                7. Privacy
              </h3>
              <p className="text-gray-800">
                Your use of the Website is also governed by our&nbsp;
                <button
                  onClick={() => {
                    closeTermsModal(); // Close the Terms modal
                    openPrivacyModal(); // Open the Privacy Policy modal
                  }}
                  className="text-customBlue underline"
                >
                  Privacy Policy
                </button>
                . Please review it to understand how we collect, use, and
                protect your personal data.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                8. Termination
              </h3>
              <p className="text-gray-800">
                We reserve the right to suspend or terminate your access to the
                Website at any time without notice for any reason, including if
                we believe that you have violated these Terms.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                9. Indemnification
              </h3>
              <p className="text-gray-800">
                You agree to indemnify and hold harmless GDC Consultants Ltd.
                and its affiliates, employees, agents, and licensors from any
                claims, damages, liabilities, losses, costs, or expenses
                (including reasonable legal fees) arising out of or related to
                your use of the Website, your violation of these Terms, or your
                violation of any rights of a third party.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                10. Governing Law
              </h3>
              <p className="text-gray-800">
                These Terms are governed by and construed in accordance with the
                laws of New Zealand. Any disputes arising from or relating to
                these Terms or your use of the Website will be subject to the
                exclusive jurisdiction of the courts of New Zealand.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                11. Changes to These Terms
              </h3>
              <p className="text-gray-800">
                We reserve the right to modify or update these Terms at any
                time. Any changes will be posted on this page with an updated
                effective date. Your continued use of the Website after any
                changes indicates your acceptance of the new Terms.
              </p>

              <h3 className="mt-4 font-semibold text-lg text-customBlue">
                12. Contact Us
              </h3>
              <p className="text-gray-800">
                If you have any questions about these Terms, please contact us
                at:
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
                  href="https://www.gdcgroup.co.nz"
                  className="text-customBlue underline"
                >
                  www.gdcgroup.co.nz
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
