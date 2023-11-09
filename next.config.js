/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: '/blog_picture/**',
            },
        ],
    },
    output: 'export'
}

module.exports = nextConfig
