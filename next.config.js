/** @type {import('next').NextConfig} */
const nextConfig = {};

nextConfig.images = {
    remotePatterns: [
        {
            hostname: "*",
        },
    ],
};

nextConfig.output = "export";

module.exports = nextConfig;
