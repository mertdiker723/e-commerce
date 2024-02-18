/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.pngfind.com',
            },
        ],
    },
};

export default nextConfig;
