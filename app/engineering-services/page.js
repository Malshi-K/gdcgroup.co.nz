import { SITE_URL } from "@/lib/siteConfig";
import LandingPage from "@/components/engineering-services/LandingPage";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Engineering Services | GDC Group",
  description:
    "Engineering services from GDC Group, Chartered Professional Engineers delivering structural, geotechnical and seismic engineering solutions across New Zealand.",
  alternates: {
    canonical: "https://gdcgroup.co.nz/engineering-services",
  },
};

export default function EngineeringServices() {
  return <LandingPage />;
}
