// Dynamic service data with alternating content sections
"use client"
import Image from "next/image";

import useInView from "../services/useInView"; // Import the custom hook

export const WatersUniqueContent = () => {
  const [ref, isVisible] = useInView({ threshold: 0.2 }); // Use the hook inside the component

  return (
    <div className="mt-10 px-4 md:px-6 lg:px-15">
      {/* First Unique Section */}
      <div
        ref={ref} // Attach the ref to the section
        className={`relative w-full h-64 md:h-72 flex items-center justify-center bg-cover bg-center shadow-md rounded-md mb-6 md:mb-10 transition-all duration-700 ease-in-out ${
          isVisible ? "animate-slide-up" : "opacity-0" // Apply animations only when visible
        }`}
        style={{ backgroundImage: `url('/images/services/1/3 Waters and Contamination 2.webp')` }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
        <div className="relative z-10 text-center text-white p-4 md:p-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            Stormwater Modelling and On-Site Carpark Stormwater Design for
            Claudelands Arena
          </h2>
          <p className="text-sm md:text-base mb-4 md:mb-6">
            GDC Consultants are experts in delivering quality services. We have
            access to the right resources in all contaminated land disciplines
            including soil science, hydrogeology, geotechnical, toxicology, risk
            analysis, and remedial technologies.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-10 px-6 lg:px-10">
        <h1 className="text-4xl text-customBlue font-bold text-center mb-8">
          3 Waters Engineering
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 justify-center">
          {[
            {
              title: "Storm Water",
              description:
                "GDC Consultants can help with technical design plans, strategy development, cohesive catchment planning, and fit-for-purpose design solutions.",
              image: "/images/services/storm-water.webp",
            },
            {
              title: "Waste Water",
              description:
                "We are experts in wastewater network performance analysis. We can assist in choosing an affordable containment option and help identify the most cost-effective combination for improvement works.",
              image: "/images/services/waste-water.webp",
            },
            {
              title: "Water Supply",
              description:
                "We provide a wide variety of professional services for onsite water supply systems, including surface and groundwater supplies.",
              image: "/images/services/water-supply.webp",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="group relative w-full rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer transition-transform transform hover:scale-105 animate-scale-up duration-500 ease-in-out"
            >
              {/* Image Section */}
              <div className="relative w-full h-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={320} // Set width and height explicitly
                  height={384} // Adjust these values to fit your design
                  className="w-full h-full object-cover"
                />
                {/* Dark Gradient Overlay for Better Text Visibility */}
                <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-white z-10 animate-fade-in">
                <h3 className="text-lg md:text-2xl text-center font-bold mb-2 drop-shadow-lg">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-center drop-shadow-lg">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LandscapingUniqueContent = () => {
  const [ref, isVisible] = useInView({ threshold: 0.2 }); // Set the threshold as needed

  return (
    <div className="mt-10 px-6 lg:px-15">
      {/* First Unique Section */}
      <div
        ref={ref} // Attach the ref to the section to observe
        className={`relative w-full h-72 flex items-center justify-center bg-cover bg-center shadow-md rounded-md transition-all duration-700 ease-in-out ${
          isVisible ? "animate-fade-in-up" : "opacity-0" // Apply animation only when visible
        }`}
        style={{
          backgroundImage: `url('/images/services/mmexport1567995357055.webp')`,
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>
        <div
          className={`relative z-10 text-center text-white p-6 transition-opacity duration-500 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-4 transition-opacity duration-500 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            Landscaping
          </h2>
          <p
            className={`mb-6 transition-opacity duration-500 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            We take pride in creating beautiful surroundings for your property
            that meet your every need and want. We have a wide range of designs
            for backyard, patio, and paving options. We are also happy to meet
            any of our custom requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ElectricalEngineeringUniqueContent = () => {
  const [ref, isVisible] = useInView({ threshold: 0.2 }); // Set the threshold as needed

  return (
    <div className="mt-10">
      {/* Image section with flex layout for left text and right cards */}
      <div
        ref={ref} // Attach the ref to the section to observe
        className={`relative w-full h-96 flex flex-col md:flex-row items-center justify-center bg-cover bg-center shadow-md rounded-md transition-all duration-700 ease-in-out ${
          isVisible ? "animate-fade-in-up" : "opacity-0" // Apply animation only when visible
        }`}
        style={{
          backgroundImage: `url('/images/services/2/Electrical Engineering 4.webp')`,
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>

        {/* Flex container to position left text and right cards */}
        <div className="relative z-10 flex flex-col md:flex-row w-full h-full p-4 md:p-6">
          {/* Left Side: Text Content */}
          <div
            className={`flex flex-col justify-center w-full md:w-1/2 text-white pr-0 md:pr-4 transition-opacity duration-500 ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
              Electrical Engineering Services by GDC Consultants
            </h2>
            <p className="text-sm md:text-base mb-2 md:mb-4">
              We take pride in creating beautiful surroundings for your property
              that meet your every need and want. We have a wide range of
              designs for backyard, patio, and paving options. We are also happy
              to meet any of our custom requirements.
            </p>
          </div>

          {/* Right Side: Cards */}
          <div
            className={`w-full md:w-1/2 grid grid-cols-1 gap-4 overflow-y-auto max-h-80 scrollbar-hide scrollable-section transition-transform duration-500 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {[
              {
                title: "Switchboard Design and Renovation",
                description:
                  "We can plan and implement new switchboards or make modifications to existing systems.",
              },
              {
                title: "Technical Equipment Specifications",
                description:
                  "We provide technical equipment specifications for a wide range of electrical systems including transformers, switchgear, and other supplementary equipment.",
              },
              {
                title: "Hardware Design and Control Systems",
                description:
                  "We are experts in providing innovative and modern control systems. An updated system can optimize your process, protect your hardware, and reduce labour costs.",
              },
              {
                title: "Industrial Lighting Designs and Models",
                description:
                  "Lighting design is essential to the visibility and safety of any industrial property. We design a comprehensive installation specification document for each individual project.",
              },
              {
                title: "Earthing",
                description:
                  "Earthing is crucial to ensure the safety of any electrical system. At GDC Consultants, we always ensure proper grounding, to make sure that people and equipment are appropriately protected during fault issues.",
              },
              {
                title: "Machine Safety Systems",
                description:
                  "We can design and implement a range of safety techniques, including guarding and mechanical barriers, to eliminate any hazards from your future industrial worksite.",
              },
              {
                title: "Electrical Assessment and Failure Investigation",
                description:
                  "Understanding the current condition of the infrastructure is essential to ensuring the future safety and consistent power supply of your project. We perform a comprehensive assessment of preexisting infrastructure and investigate, identify, and solve any existing failures.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-70 rounded-lg shadow-lg p-4 flex flex-col items-start transition-transform transform hover:scale-95"
              >
                <h3 className="text-lg md:text-xl text-customBlue font-bold mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-customBlue">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const InternshipsUniqueContent = () => {
  const [ref, isVisible] = useInView({ threshold: 0.2 }); // Set the threshold as needed

  return (
    <div className="mt-10 px-6 lg:px-15">
      {/* First Unique Section */}
      <div
        ref={ref} // Attach the ref to the section to observe
        className={`relative w-full h-72 flex items-center justify-center bg-cover bg-center shadow-md rounded-md transition-all duration-700 ease-in-out ${
          isVisible ? "animate-fade-in-up" : "opacity-0" // Apply animation only when visible
        }`}
        style={{
          backgroundImage: `url('/images/services/group photo madrid.webp')`,
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>
        <div
          className={`relative z-10 text-center text-white p-6 transition-opacity duration-500 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-4 transition-opacity duration-500 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            Internships
          </h2>
          <p
            className={`mb-6 transition-opacity duration-500 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            To help maintain a constant influx of fresh ideas and talent into
            our company, we offer a range of internship opportunities throughout
            the year across multiple different disciplines.
          </p>
        </div>
      </div>
    </div>
  );
};

export const PavementDesignUniqueContent = () => {
  const [ref, isVisible] = useInView({ threshold: 0.2 }); // Set the threshold as needed

  return (
    <div className="mt-10 px-4 md:px-6 lg:px-8">
      {/* First Unique Section */}
      <div
        ref={ref} // Attach the ref to the section to observe
        className={`relative w-full h-56 sm:h-64 md:h-72 lg:h-96 flex items-center justify-center bg-cover bg-center shadow-md rounded-md transition-all duration-700 ease-in-out ${
          isVisible ? "animate-fade-in-up" : "opacity-0" // Apply animation only when visible
        }`}
        style={{
          backgroundImage: `url('/images/services/image-43-1.webp')`,
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-md"></div>
        <div
          className={`relative z-10 text-center text-white p-4 md:p-6 transition-opacity duration-500 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 transition-opacity duration-500 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            Pavement Design & Engineering
          </h2>
          <p
            className={`text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 lg:mb-8 transition-opacity duration-500 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            We have a team of pavement experts who have extensive experience in
            working with local authorities, consultancy work, laboratory
            testing, and performing asset management. <br />
            By employing the latest technologies and techniques, our solutions
            are designed with a life-long approach that will ensure long-term
            design viability. Successful projects are the product of innovation,
            experience, and expertise. By choosing GDC Consultants, you ensure
            that your project has all three.
          </p>
        </div>
      </div>
    </div>
  );
};

export const SeismicEngineeringUniqueContent = () => {
  const [ref, isVisible] = useInView({ threshold: 0.2 }); // Set the threshold as needed

  return (
    <div className="mt-10 px-6 lg:px-15">
      {/* First Unique Section */}
      <div
        ref={ref} // Attach the ref to the section to observe
        className={`relative w-full h-72 flex items-center justify-center bg-cover bg-center shadow-md rounded-md transition-all duration-700 ease-in-out ${
          isVisible ? "animate-fade-in-up" : "opacity-0" // Apply animation only when visible
        }`}
        style={{
          backgroundImage: `url('/images/services/5/Seismic Engineering 4.webp')`,
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>
        <div
          className={`relative z-10 text-center text-white p-6 transition-opacity duration-500 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-4 transition-opacity duration-500 ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
          >
            Seismic Assessments and Seismic Upgrade for Rotorua Museum – Te
            Whare Taonga o Te Arawa
          </h2>
        </div>
      </div>
    </div>
  );
};

export const CivilStructuralUniqueContent = () => {
  const [ref, isVisible] = useInView({ threshold: 0.2 }); // Set the threshold as needed

  return (
    <div
      ref={ref} // Attach the ref to the section to observe
      className={`relative w-full h-96 flex items-center justify-center bg-cover bg-center shadow-md rounded-md transition-all duration-700 ease-in-out ${
        isVisible ? "animate-fade-in-up" : "opacity-0" // Apply animation only when visible
      }`}
      style={{ backgroundImage: `url('/images/services/structural.webp')` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>

      {/* Flex container to position left text and right cards */}
      <div className="relative z-10 flex w-full h-full p-6">
        {/* Left Side: Text Content */}
        <div
          className={`flex flex-col justify-center w-1/2 text-white pr-4 transition-opacity duration-500 ${
            isVisible ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">
            Civil Structural Engineering Services
          </h2>
        </div>

        {/* Right Side: Cards */}
        <div
          className={`w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-80 scrollbar-hide transition-transform duration-500 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {[
            {
              title: "Civil Structures",
              description:
                "Design and calculations for roads, drainage, earth tank site grading, crossings, and bridges based on applicable codes and standards",
            },
            {
              title: "Support & Supervision of Earthwork",
              description: "Perform engineering checks for code compliance",
            },
            {
              title: "RFQ & PO Packages",
              description: "RFQ and PO packages for infrastructure",
            },
            {
              title: "Foundations",
              description:
                "Design and calculations for foundations in vertical or horizontal capacities, piling, as well as foundation settlements",
            },
            {
              title: "RFIs Responses",
              description: "",
            },
            {
              title: "Structural Design Drawings",
              description: "for engineering agreements",
            },
            {
              title: "Preparation & Cost Estimates",
              description:
                "Prepare work packages, MTOs and estimates for civil/structural proposals and bids",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 rounded-lg shadow-lg p-4 flex flex-col items-start transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl text-customBlue font-bold mb-2">
                {item.title}
              </h3>
              <p className="text-customBlue">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const StructuralDesignUniqueContent = () => {
  const [ref, isVisible] = useInView({ threshold: 0.2 }); // Set the threshold as needed

  return (
    <div
      ref={ref} // Attach the ref to the section to observe
      className={`relative w-full h-72 flex items-center justify-center bg-cover bg-center shadow-md rounded-md transition-all duration-700 ease-in-out ${
        isVisible ? "animate-fade-in-up" : "opacity-0" // Apply animation only when visible
      }`}
      style={{ backgroundImage: `url('/images/services/structural.webp')` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>
      <div
        className={`relative z-10 text-center text-white p-6 transition-opacity duration-500 ${
          isVisible ? "animate-slide-up" : "opacity-0"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-4 transition-opacity duration-500 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          Structural & Foundation design for Abbotsford Apartments, Hamilton
          City
        </h2>
      </div>
    </div>
  );
};

export const PlanningUniqueContent = () => {
  const [ref, isVisible] = useInView({ threshold: 0.2 }); // Set the threshold as needed

  return (
    <div className="mt-10">
      <div className="mt-10 px-6 lg:px-15">
        {/* First Unique Section */}
        <div
          ref={ref} // Attach the ref to the section to observe
          className={`relative w-full h-72 flex items-center justify-center bg-cover bg-center shadow-md rounded-md transition-all duration-700 ease-in-out ${
            isVisible ? "animate-fade-in-up" : "opacity-0" // Apply animation only when visible
          }`}
          style={{
            backgroundImage: `url('/images/services/6/Planning 3.webp')`,
          }}
        >
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>
          <div
            className={`relative z-10 text-center text-white p-6 transition-opacity duration-500 ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-4 transition-opacity duration-500 ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
            >
              Future Focused
            </h2>
            <h4
              className={`text-md mb-4 transition-opacity duration-500 ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
            >
              Our planners are ready to guide you and your projects through the
              future of environmental planning in New Zealand. We have a strong
              understanding of the current Resource Management Act and are
              constantly adapting to changes in law and policy, including the
              proposed resource management reform. The effects of climate change
              are already being felt in many areas and we can provide planning
              solutions which will ensure the future vibrancy of your project.
            </h4>
          </div>
        </div>

        {/* Cards */}
        {/* <div className="mt-10 px-6 lg:px-10">
          <h1 className="text-4xl text-customBlue font-bold text-center mb-8">
            Recent Planning Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 justify-center">
            {[
              {
                title: "Lost Springs",
                image: "/images/services/RearC-1536x864.webp",
              },
              {
                title: "Kennedy Bay",
                image: "/images/services/Screenshot-2024-01-19-093510.webp",
              },
              {
                title: "Kennedy Bay",
                image: "/images/services/Screenshot-2024-01-23-154320.webp",
              },
              {
                title: "Brownlee Avenue Dog Pound",
                image: "/images/services/Coming-Soon.webp",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="group relative w-full rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer transition-transform transform hover:scale-105 animate-scale-up duration-500 ease-in-out"
              >
                
                <div className="relative w-full h-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={320} // Set width and height explicitly
                    height={384} // Adjust these values to fit your design
                    className="w-full h-full object-cover"
                  />
                 
                  <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>

                
                <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-white z-10 animate-fade-in">
                  <h3 className="text-lg md:text-2xl text-center font-bold mb-2 drop-shadow-lg">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};
