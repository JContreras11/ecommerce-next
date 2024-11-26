/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
export default bundleAnalyzer({
  eslint: {
    // dirs: ['.'],
    ignoreDuringBuilds: true,
  },
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: false,  
  webpack: (config) => {
    // config.externals is needed to resolve the following errors:
    // Module not found: Can't resolve 'bufferutil'
    // Module not found: Can't resolve 'utf-8-validate'
    config.externals.push({
      bufferutil: 'bufferutil',
      'utf-8-validate': 'utf-8-validate',
    });

    return config;
  },
});
