/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.cdn-hotels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.aarp.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "content.skyscnr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "humanidades.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.britannica.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lp-cms-production.imgix.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
