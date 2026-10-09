import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
import AboutCardSection from "@/components/about/AboutCardSection";
import OurValues from "@/components/about/OurValues";
import LogoSlider from "@/components/about/LogoSlider";
import SubContact from "@/components/SubContact";
import "@/app/globals.css";

export const generateMetadata = async () => {
  return {
    metadataBase: new URL(SITE_URL),
    title: "Development Engineering Excellence | GDC Group",
    description:
      "Meet the engineering consultants at GDC Group, dedicated to delivering innovative, quality solutions and efficient outcomes on every project across New Zealand.",
    keywords:
      "GDC Group, development engineering, New Zealand engineers, engineering consultancy, professional engineers, engineering expertise, engineering solutions",
    openGraph: {
      title:
        "Development Engineering Excellence | GDC Group",
      description:
        "Leading engineering consultancy delivering innovative solutions across New Zealand. Meet our expert team and discover our values.",
      type: "website",
      url: "https://gdcgroup.co.nz/about-us/who-we-are",
      siteName: SITE_NAME,
      locale: "en_NZ",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://gdcgroup.co.nz/about-us/who-we-are",
      languages: {
        "en-NZ": "https://gdcgroup.co.nz/about-us/who-we-are",
        en: "https://gdcgroup.co.nz/about-us/who-we-are",
      },
    },
  };
};

export default function WhoWeArePage() {
  return (
    <>
      <AboutCardSection />
      <LogoSlider />
      <OurValues />
      <SubContact />
    </>
  );
}
