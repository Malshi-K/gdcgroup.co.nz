// components/ServiceDescription.js
const ServiceDescription = ({ title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg text-secondary mx-9 sm:mx-12 md:mx-14 lg:mx-16 mb-4 -mt-10 relative z-10 animate-fade-in-up">
      <h1 className="text-primary-blue text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-2">
        Services
      </h1>
      {/* Render the title */}
      <h2 className="text-primary-navy text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-2">
        {title}
      </h2>
      {/* Render description as a single paragraph */}
      <p className="text-lg text-secondary leading-relaxed">{description}</p>
    </div>
  );
};

export default ServiceDescription;
