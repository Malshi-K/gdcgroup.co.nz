import AboutSection from "./AboutSection";
import ContactDetails from "./ContactDetails";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ServicesBar from "./ServicesBar";
import ServicesSection from "./ServicesSection";

const LandingPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesBar />
      <AboutSection />
      <ServicesSection />
      <ContactDetails />
    </>
  );
};

export default LandingPage;
