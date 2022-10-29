import { CustomChainName } from './customChains'

export type BlockExplorerName = 'etherscan'
export type BlockExplorer = { name: string; url: string }

type customEtherscanChains = Extract<CustomChainName, 'aurora' | 'cronos' | 'gnosis' | 'oasis'>
export const customEtherscanBlockExplorers: Record<customEtherscanChains, BlockExplorer> = {
    aurora: {
        name: 'Aurora Explorer',
        url: 'https://aurorascan.dev/',
    },
    cronos: {
        name: 'Cronoscan',
        url: 'https://cronoscan.com/',
    },
    gnosis: {
        name: 'GnosisScan',
        url: 'https://gnosisscan.io/',
    },
    oasis: {
        name: 'Oasis Foundation Blockscout explorer',
        url: 'https://explorer.emerald.oasis.dev/',
    },
} as const
