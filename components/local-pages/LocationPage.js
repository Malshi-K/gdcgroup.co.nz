// components/LocationPage.js

import React from 'react';
import HeroSection from '@/components/local-pages/HeroSection';
import LocalKnowledgeSection from '@/components/local-pages/LocalKnowledgeSection';
import ServicesSection from '@/components/local-pages/ServicesSection';
import FeaturedProjectsSection from '@/components/local-pages/FeaturedProjectsSection';
import SpecialtyExpertiseSection from '@/components/local-pages/SpecialtyExpertiseSection';
import WhyChooseSection from '@/components/local-pages/WhyChooseSection';
import AreasServedSection from '@/components/local-pages/AreasServedSection';
import CTASection from '@/components/local-pages/CTASection';
import ContactSection from '@/components/local-pages/ContactSection';
import FAQSection from '@/components/local-pages/FAQSection';
import AdditionalLinksSection from '@/components/local-pages/AdditionalLinksSection';

const LocationPage = ({ locationData }) => {
  if (!locationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">Location not found</h1>
          <p className="text-gray-500 mt-2">The requested location page could not be found.</p>
        </div>
      </div>
    );
  }

  const {
    title,
    subtitle,
    description,
    introduction,
    locationDescription,
    serviceArea,
    localKnowledge,
    services,
    featuredProjects,
    specialtyExpertise,
    whyChoose,
    areasServed,
    ctaSection,
    contact,
    faq,
    additionalLinks,
    locationImage
  } = locationData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection 
        title={title}
        subtitle={subtitle}
        description={description}
        introduction={introduction}
        locationDescription={locationDescription}
        serviceArea={serviceArea}
        backgroundImage={locationData.locationImage}
      />

      {/* Local Knowledge Section (Wellington specific) */}
      <LocalKnowledgeSection localKnowledge={localKnowledge} />

      {/* Services Section */}
      <ServicesSection services={services} />

      {/* Featured Projects Section */}
      <FeaturedProjectsSection featuredProjects={featuredProjects} />

      {/* Specialty Expertise Section (for locations like Rotorua, Thames & Napier) */}
      <SpecialtyExpertiseSection specialtyExpertise={specialtyExpertise} />

      {/* Why Choose Section */}
      <WhyChooseSection whyChoose={whyChoose} />

      {/* Areas Served Section */}
      <AreasServedSection areasServed={areasServed} />

      {/* CTA Section (Wellington specific) */}
      <CTASection ctaSection={ctaSection} />

      {/* Contact Section */}
      <ContactSection contact={contact} locationImage={locationImage}/>

      {/* FAQ Section */}
      <FAQSection faq={faq} />

      {/* Additional Links */}
      <AdditionalLinksSection additionalLinks={additionalLinks} />
    </div>
  );
};

export default LocationPage;