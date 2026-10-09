import { SITE_URL } from "@/lib/siteConfig";
import Hero from "@/components/home/Hero";
import CardsSection from "@/components/home/CardsSection";
import ServicesSection from "@/components/home/ServicesSectionHome";
import BlogSection from "@/components/home/BlogSection";
import "../app/globals.css";

// Metadata generation
export const generateMetadata = async () => {
  return {
    metadataBase: new URL(SITE_URL),
    title: "GDC Group | Infrastructure & Engineering Consultants",
    description:
      "GDC Group provides structural, geotechnical, civil, seismic, fire and infrastructure engineering consultancy across New Zealand. We deliver together.",
    keywords:
      "GDC Group, engineering consultants, infrastructure engineering, structural engineering, geotechnical engineering, civil engineering, seismic engineering, fire engineering, New Zealand",
    openGraph: {
      title: "GDC Group | Infrastructure & Engineering Consultants",
      description:
        "GDC Group provides structural, geotechnical, civil, seismic, fire and infrastructure engineering consultancy across New Zealand. We deliver together.",
      type: "website",
      url: "https://gdcgroup.co.nz",
      siteName: "GDC Group",
      locale: "en_NZ",
      images: [
        {
          url: "/images/gdc-og-image.jpg", // Replace with your actual OG image path
          width: 1200,
          height: 630,
          alt: "GDC Group – Infrastructure & Engineering Consultants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GDC Group | Infrastructure & Engineering Consultants",
      description:
        "GDC Group provides structural, geotechnical, civil, seismic, fire and infrastructure engineering consultancy across New Zealand. We deliver together.",
      images: [
        {
          url: "/images/gdc-og-image.jpg",
          alt: "GDC Group – Infrastructure & Engineering Consultants",
        },
      ],
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
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: "https://gdcgroup.co.nz",
    },
  };
};

async function fetchBlogs() {
  try {
    const response = await fetch("https://gdcgroup.co.nz/api/blogs", {
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await response.json();
    // Get only the first 3 blogs
    return {
      blogs: data.results?.slice(0, 3) || [],
      error: null,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      blogs: [],
      error: "Failed to load blogs",
    };
  }
}

export default async function HomePage() {
  const { blogs, error } = await fetchBlogs();

  return (
    <>
      <Hero />
      <CardsSection />
      <ServicesSection />
      <BlogSection blogs={blogs} error={error} />
    </>
  );
}
