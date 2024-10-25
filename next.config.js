/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'placehold.co', 'replicate.com', 'replicate.delivery', 'firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
