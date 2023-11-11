/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/Blog",
    output: 'export',
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
