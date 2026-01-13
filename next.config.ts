import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Required for static export
    },
    basePath: '/profile', // Base path for the static export
    assetPrefix: '/profile/',
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
