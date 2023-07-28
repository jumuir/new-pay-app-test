/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  webpack ( config ) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};
