/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["6187835.fs1.hubspotusercontent-na1.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "6187835.fs1.hubspotusercontent-na1.net",
        port: "",
        pathname: "/hubfs/**",
      },
    ],    
  },
  async rewrites() {
    return [
      {
        source: '/services/:path*',
        destination: '/services/:path*',
      },
    ];
  },
};

export default nextConfig;
