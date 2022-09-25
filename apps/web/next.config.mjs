// @ts-check

import transpile from 'next-transpile-modules'

const withTM = transpile(['@business-card/sdk', '@business-card/sol'])

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
    // compiler: { removeConsole: true },
    images: { domains: ['business-card.infura-ipfs.io'] },
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
        tsconfigPath: './tsconfig.build.json',
    },
})

export default nextConfig
