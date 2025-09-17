/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false, // hide build spinner
  },
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      config.devServer = {
        ...config.devServer,
        client: {
          overlay: false, // 🔴 disable error overlay on localhost
        },
      };
    }
    return config;
  },
};

export default nextConfig;
