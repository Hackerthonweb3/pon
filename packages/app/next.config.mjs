// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['business-card.infura-ipfs.io'],
    },
    typescript: {
        tsconfigPath: 'tsconfig.build.json',
    },
}

export default nextConfig
