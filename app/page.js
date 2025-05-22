import Hero from "@/components/home/Hero";
import CardsSection from "@/components/home/CardsSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import BlogSection from "@/components/home/BlogSection";
import CertificationSection from "@/components/home/CertificationSection";
import "../app/globals.css";
// import AwardAnnouncement from "@/components/home/AwardAnnouncement";

// Metadata generation
export const generateMetadata = async () => {
  return {
    title: "GDC Consultants | Engineering & Architectural Design Solutions",
    description:
      "GDC Consultants provides innovative solutions and expert guidance in architectural and engineering design. Serving New Zealand with a commitment to excellence.",
    keywords:
      "engineering consultants, architectural design, New Zealand engineering, GDC Consultants, structural engineering, building design",
    openGraph: {
      title: "GDC Consultants | Engineering & Architectural Design Solutions",
      description:
        "Leading engineering and architectural design consultancy in New Zealand",
      type: "website",
      url: "https://gdcgroup.co.nz",
      siteName: "GDC Consultants",
      locale: "en_NZ",
      images: [
        {
          url: "/images/gdc-og-image.jpg", // Replace with your actual OG image path
          width: 1200,
          height: 630,
          alt: "GDC Consultants Engineering Solutions",
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
      {/* <AwardAnnouncement
        awardTitle="Gold Award Win"
        projectName="Waikato Hospital Molecular Biology Laboratory Project"
        description="We're proud to have been part of the project team behind the Waikato Hospital Molecular Biology Laboratory refurbishment, which has been recognised with a Gold Award at the Master Builders NZ Commercial Project Awards 2025."
        videoSrc="/images/awards/Award.mp4"
      /> */}
      <ServicesSection />
      <ProjectsSection />
      <BlogSection blogs={blogs} error={error} />

      <CertificationSection />
    </>
  );
}
