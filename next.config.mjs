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
  async rewrites() {
    return [
      {
        source: "/services/:path*",
        destination: "/services/:path*",
      },
    ];
  },
};

export default nextConfig;
