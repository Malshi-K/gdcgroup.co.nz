/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "6187835.fs1.hubspotusercontent-na1.net",
        pathname: "/hubfs/**",
      },
      {
        protocol: "https",
        hostname: "6187835.fs1.hubspotusercontent-ap1.net",
        pathname: "/hubfs/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/services/architectural-designs", destination: "/services", permanent: true },
      { source: "/services/research-development", destination: "/services", permanent: true },
      { source: "/services/training", destination: "/services", permanent: true },
      { source: "/services/road-transport", destination: "/services/transport-engineering", permanent: true },
      { source: "/team", destination: "/about-us/who-we-are", permanent: true },
    ];
  },
};

export default nextConfig;
