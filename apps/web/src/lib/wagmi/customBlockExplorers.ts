import { CustomChainName } from './customChains'

export type BlockExplorerName = 'etherscan'
export type BlockExplorer = { name: string; url: string }

type customEtherscanChains = Extract<CustomChainName, 'cronos' | 'aurora' | 'oasis'>
export const customEtherscanBlockExplorers: Record<customEtherscanChains, BlockExplorer> = {
    aurora: {
        name: 'Aurora Explorer',
        url: 'https://aurorascan.dev/',
    },
    cronos: {
        name: 'Cronoscan',
        url: 'https://cronoscan.com',
    },
    oasis: {
        name: 'Oasis Foundation Blockscout explorer',
        url: 'https://explorer.emerald.oasis.dev/',
    },
} as const
