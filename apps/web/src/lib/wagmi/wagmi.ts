import { publicProvider } from 'wagmi/providers/public'
import { customChain } from './customChains'
import { chain, configureChains, createClient } from 'wagmi'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

export const { chains, provider, webSocketProvider } = configureChains(
    [
        chain.polygonMumbai,
        chain.polygon,
        chain.optimism,
        customChain.aurora,
        customChain.cronos,
        customChain.oasis,
        chain.hardhat,
    ],
    [publicProvider()],
)

export const { connectors } = getDefaultWallets({
    appName: 'Web3 Digital Business Card',
    chains,
})

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
})
