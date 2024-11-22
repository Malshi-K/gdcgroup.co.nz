import "@/app/globals.css";
import Image from "next/image";
import GetInTouch from "@/components/GetInTouch";
import ServiceDescription from "@/components/services/ServiceDescription";
import ServiceSections from "@/components/services/ServiceSections";
import services from "@/data/servicesData";
import {
  ElectricalEngineeringUniqueContent,
  InternshipsUniqueContent,
  LandscapingUniqueContent,
  PavementDesignUniqueContent,
  PlanningUniqueContent,
  SeismicEngineeringUniqueContent,
  WatersUniqueContent,
} from "@/components/services/UniqueContent";
import { notFound } from 'next/navigation';

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const serviceData = services[params.service];
  
  if (!serviceData) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.'
    };
  }

  return {
    title: serviceData.metaTitle,
    description: serviceData.metaDescription,
    alternates: {
      canonical: `https://www.gdcgroup.co.nz/services/${serviceData.slug}`,
      languages: {
        'en-NZ': `https://www.gdcgroup.co.nz/services/${serviceData.slug}`,
        'en': `https://www.gdcgroup.co.nz/services/${serviceData.slug}`,
        'x-default': `https://www.gdcgroup.co.nz/services/${serviceData.slug}`,
      },
    },
  };
}

// Main page component
export default function Page({ params }) {
  const serviceData = services[params.service];

  // Handle 404 for unknown services
  if (!serviceData) {
    notFound();
  }

  // Mapping of unique content components
  const uniqueContentComponents = {
    watersUniqueContent: WatersUniqueContent,
    landscapingUniqueContent: LandscapingUniqueContent,
    electricalEngineeringUniqueContent: ElectricalEngineeringUniqueContent,
    internshipsUniqueContent: InternshipsUniqueContent,
    pavementDesignUniqueContent: PavementDesignUniqueContent,
    seismicEngineeringUniqueContent: SeismicEngineeringUniqueContent,
    PlanningUniqueContent: PlanningUniqueContent,
  };

  // Get the appropriate unique content component
  const UniqueContentComponent = uniqueContentComponents[serviceData.uniqueContent];

  return (
    <main>
      <div className="relative">
        <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] relative">
          <Image
            src={serviceData.image}
            alt={serviceData.title}
            fill
            priority
            quality={90}
            className="object-cover transition-opacity duration-700 ease-in-out"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>

      <ServiceDescription
        title={serviceData.title}
        description={serviceData.description}
      />

      <ServiceSections sections={serviceData.sections} />

      {UniqueContentComponent && <UniqueContentComponent />}

      <GetInTouch />
    </main>
  );
}

// Optional: Generate static params if you want to statically generate some pages
export async function generateStaticParams() {
  return Object.keys(services).map((service) => ({
    service: service,
  }));
}