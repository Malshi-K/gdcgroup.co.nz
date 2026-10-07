import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
import "@/app/globals.css";
import ProjectHeader from "@/components/projects/ProjectHeader";
import GetInTouch from "@/components/GetInTouch";
import ProjectsFilterView from "@/components/projects/ProjectsFilterView";
import { Crosshair } from "@/components/home/homeTheme";

export const generateMetadata = async () => {
  return {
    metadataBase: new URL(SITE_URL),
    title: "Engineering Projects | GDC Group",
    description:
      "Discover cutting-edge engineering solutions with GDC Group. Our innovative projects and expert consultancy services drive success in every endeavor.",
    keywords:
      "engineering projects, GDC Group, architectural projects, New Zealand construction, engineering solutions, heritage buildings, educational facilities, medical facilities",
    openGraph: {
      title: "Engineering Projects | GDC Group",
      description:
        "Explore our portfolio of cutting-edge engineering and architectural projects across New Zealand.",
      type: "website",
      url: "https://gdcgroup.co.nz/portfolio/all-projects",
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
      canonical: "https://gdcgroup.co.nz/portfolio/all-projects",
      languages: {
        "en-NZ": "https://gdcgroup.co.nz/portfolio/all-projects",
        en: "https://gdcgroup.co.nz/portfolio/all-projects",
      },
    },
  };
};

const ProjectsPage = () => {
  return (
    <>
      <ProjectHeader />
      <section className="relative -mt-5 bg-off-white pt-8 md:-mt-14 md:pt-16">
        <Crosshair className="absolute left-6 top-24 hidden opacity-40 md:block" />
        <Crosshair className="absolute right-6 top-24 hidden opacity-40 md:block" />
        <ProjectsFilterView />
      </section>
      <GetInTouch />
    </>
  );
};

export default ProjectsPage;
