/** @type {import("next").NextConfig} */
module.exports = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'ghchart.rshah.org',
      'res.cloudinary.com',
      'example.com',
      'f3.allesedv.com',
    ],
  },
  reactStrictMode: true,
  // experimental: {
  //   appDir: true,
  //   serverComponentsExternalPackages: ['mongoose'],
  // },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};
