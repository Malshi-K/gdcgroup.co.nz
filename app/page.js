import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
import Hero from "@/components/home/Hero";
import CardsSection from "@/components/home/CardsSection";
import ServicesSection from "@/components/home/ServicesSectionHome";
import BlogSection from "@/components/home/BlogSection";
import "../app/globals.css";

// Metadata generation
export const generateMetadata = async () => {
  return {
    metadataBase: new URL(SITE_URL),
    title: "GDC Group | Engineering & Architectural Design Solutions",
    description:
      "GDC Group provides innovative solutions and expert guidance in architectural and engineering design. Serving New Zealand with a commitment to excellence.",
    keywords:
      "engineering consultants, architectural design, New Zealand engineering, GDC Group, structural engineering, building design",
    openGraph: {
      title: "GDC Group | Engineering & Architectural Design Solutions",
      description:
        "Leading engineering and architectural design consultancy in New Zealand",
      type: "website",
      url: "https://gdcgroup.co.nz",
      siteName: SITE_NAME,
      locale: "en_NZ",
      images: [
        {
          url: "/images/gdc-og-image.jpg", // Replace with your actual OG image path
          width: 1200,
          height: 630,
          alt: "GDC Group Engineering Solutions",
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
