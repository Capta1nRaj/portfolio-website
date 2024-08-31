/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.sanity.io' },
            { protocol: 'https', hostname: 'img.icons8.com' }
        ],
    },
};

export default nextConfig;