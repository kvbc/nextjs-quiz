/** @type {import('next').NextConfig} */
const nextConfig = {};

nextConfig.images = {
    remotePatterns: [
        {
            hostname: "*",
        },
    ],
};

module.exports = nextConfig;
