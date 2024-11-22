import "@/app/globals.css";
import TeamMembers from "@/components/team/TeamMembers";

export const generateMetadata = async () => {
  return {
    title: "Meet Our Team | GDC Consultants - Leadership & Experts",
    description:
      "Get to know the experienced leadership and expert team members at GDC Consultants. We are industry leaders in architecture, engineering, and project management across New Zealand.",
    keywords:
      "GDC team, engineering experts, New Zealand consultants, architectural team, project management specialists",
    openGraph: {
      title: "Meet Our Team | GDC Consultants - Leadership & Experts",
      description:
        "Get to know the experienced leadership and expert team members at GDC Consultants.",
      type: "website",
      url: "https://www.gdcgroup.co.nz/team",
      siteName: "GDC Consultants",
      locale: "en_NZ",
      images: [
        {
          url: "/images/team/team-og-image.jpg", // Replace with your actual team OG image
          width: 1200,
          height: 630,
          alt: "GDC Consultants Team",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Meet Our Team | GDC Consultants - Leadership & Experts",
      description:
        "Get to know the experienced leadership and expert team members at GDC Consultants.",
      images: ["/images/team/team-og-image.jpg"], // Replace with your actual team image
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
      canonical: "https://www.gdcgroup.co.nz/team",
      languages: {
        "en-NZ": "https://www.gdcgroup.co.nz/team",
        en: "https://www.gdcgroup.co.nz/team",
      },
    },
  };
};

const TeamPage = () => {
  return (
    <>
      <TeamMembers />
    </>
  );
};

export default TeamPage;
