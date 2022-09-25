import { Chain } from 'wagmi'
import { customEtherscanBlockExplorers } from './customBlockExplorers'

type CustomPublicChains = Extract<CustomChainName, 'aurora' | 'cronos' | 'oasis'>

export const custonPublicRpcUrls: Record<CustomPublicChains, string> = {
    aurora: 'https://mainnet.aurora.dev',
    cronos: 'https://evm.cronos.org',
    oasis: 'https://emerald.oasis.dev',
} as const

export const customChainId = {
    aurora: 1_313_161_554,
    cronos: 25,
    oasis: 42_220,
}
export type CustomChainName = keyof typeof customChainId

export type CustomChain = Chain & {
    iconUrl: string
}

export const aurora: CustomChain = {
    id: customChainId.aurora,
    name: 'Aurora Mainnet',
    network: 'aurora',
    nativeCurrency: {
        name: 'Aurora',
        symbol: 'AURORA',
        decimals: 18,
    },
    rpcUrls: {
        public: custonPublicRpcUrls.aurora,
        default: custonPublicRpcUrls.aurora,
    },
    blockExplorers: {
        etherscan: customEtherscanBlockExplorers.aurora,
        default: customEtherscanBlockExplorers.aurora,
    },
    multicall: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 21022491,
    },
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/14803.png',
}

export const cronos: CustomChain = {
    id: customChainId.cronos,
    name: 'Cronos Mainnet Beta',
    network: 'cronosmb',
    nativeCurrency: {
        name: 'Cronos',
        symbol: 'CRO',
        decimals: 18,
    },
    rpcUrls: {
        default: custonPublicRpcUrls.cronos,
        public: custonPublicRpcUrls.cronos,
    },
    blockExplorers: {
        etherscan: customEtherscanBlockExplorers.cronos,
        default: customEtherscanBlockExplorers.cronos,
    },
    multicall: {
        address: '0x5e954f5972EC6BFc7dECd75779F10d848230345F',
        blockCreated: 0,
    },
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3635.png',
}

export const oasis: CustomChain = {
    id: customChainId.oasis,
    name: 'Oasis Emerald ParaTime Mainnet',
    network: 'oasisemeraldmainnet',
    nativeCurrency: {
        name: 'Oasis Network',
        symbol: 'ROSE',
        decimals: 18,
    },
    rpcUrls: {
        default: custonPublicRpcUrls.oasis,
        public: custonPublicRpcUrls.oasis,
    },
    blockExplorers: {
        etherscan: customEtherscanBlockExplorers.oasis,
        default: customEtherscanBlockExplorers.oasis,
    },
    multicall: {
        address: '0x75F59534dd892c1f8a7B172D639FA854D529ada3',
        blockCreated: 5271839,
    },
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7653.png',
}

export const customChain = {
    aurora,
    cronos,
    oasis,
} as const
