// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     webpack(config, { dev, isServer }) {
//         if (!dev) {
//           // Disable source maps in production
//           config.devtool = false;
//         }
//         return config;
//       },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'none'; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self' https://localhost:7267",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
  webpack(config, { dev, isServer }) {
    if (!dev) {
      // Disable source maps in production
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;
