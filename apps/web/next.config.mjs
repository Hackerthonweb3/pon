// @ts-check

import transpile from 'next-transpile-modules'

const withTM = transpile(['@business-card/sdk', '@business-card/sol', '@orbisclub/orbis-sdk'])

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // removeConsole: true,
        styledComponents: true,
    },
    images: { domains: ['business-card.infura-ipfs.io'] },
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
        tsconfigPath: './tsconfig.build.json',
    },
}

export default withTM(nextConfig)
