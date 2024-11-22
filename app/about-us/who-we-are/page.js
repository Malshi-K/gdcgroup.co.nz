// 1. page.js (Server Component)
import AboutCardSection from "@/components/about/AboutCardSection";
import OurValues from "@/components/about/OurValues";
import LogoSlider from "@/components/about/LogoSlider";
import SubContact from "@/components/SubContact";
import "@/app/globals.css";

export const generateMetadata = async () => {
  return {
    title: "Who We Are | GDC Consultants - Development Engineering Excellence",
    description:
      "Discover expert Development Engineering Consultants dedicated to delivering innovative solutions. Our team ensures quality and efficiency in every project across New Zealand.",
    keywords:
      "GDC consultants, development engineering, New Zealand engineers, engineering consultancy, professional engineers, engineering expertise, engineering solutions",
    openGraph: {
      title:
        "Who We Are | GDC Consultants - Development Engineering Excellence",
      description:
        "Leading engineering consultancy delivering innovative solutions across New Zealand. Meet our expert team and discover our values.",
      type: "website",
      url: "https://www.gdcgroup.co.nz/about-us/who-we-are",
      siteName: "GDC Consultants",
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
      canonical: "https://www.gdcgroup.co.nz/about-us/who-we-are",
      languages: {
        "en-NZ": "https://www.gdcgroup.co.nz/about-us/who-we-are",
        en: "https://www.gdcgroup.co.nz/about-us/who-we-are",
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
