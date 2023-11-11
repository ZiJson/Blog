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
        loader: 'custom',
        loaderFile: './GCSloader.ts',
    },
    output: 'export'
}

module.exports = nextConfig
