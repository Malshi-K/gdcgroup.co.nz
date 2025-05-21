import "@/app/globals.css";
import ProjectHeader from "@/components/projects/ProjectHeader";
import GetInTouch from "@/components/GetInTouch";
import ProjectsFilterView from "@/components/projects/ProjectsFilterView";

export const generateMetadata = async () => {
  return {
    title: "Engineering Projects | GDC Consultants",
    description:
      "Discover cutting-edge engineering solutions with GDC Consultant. Our innovative projects and expert consultancy services drive success in every endeavor.",
    keywords:
      "engineering projects, GDC consultants, architectural projects, New Zealand construction, engineering solutions, heritage buildings, educational facilities, medical facilities",
    openGraph: {
      title: "Engineering Projects | GDC Consultants",
      description:
        "Explore our portfolio of cutting-edge engineering and architectural projects across New Zealand.",
      type: "website",
      url: "https://gdcgroup.co.nz/portfolio/all-projects",
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
      <ProjectsFilterView />
      <GetInTouch />
    </>
  );
};

export default ProjectsPage;
