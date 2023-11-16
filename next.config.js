/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: '/blog_picture/**',
            },
        ],
        loader: 'custom',
        loaderFile: './GCSloader.ts',
    }
}

module.exports = nextConfig
