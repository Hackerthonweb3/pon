import { publicProvider } from 'wagmi/providers/public'
import { customChain } from './customChains'
import { chain, configureChains, createClient } from 'wagmi'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

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

// const connectors = [
//     new InjectedConnector({
//         chains,
//         options: {
//             name: (detectedName: string | string[]) =>
//                 `Injected (${typeof detectedName === 'string' ? detectedName : detectedName.join(', ')})`,
//         },
//     }),
//     new WalletConnectConnector({
//         chains,
//         options: {
//             qrcode: true,
//         },
//     }),
//     new Web3AuthConnector({
//         chains,
//         options: {
//             enableLogging: false,
//             clientId: 'BCdEgaiWaIQjALIGnfSociz6_2ruLfqaPKooXu8XxnC5CEHsLbi2QZUoOU0-phFKzcghR-SvbEVe5MeGZffzdeg',
//             network: 'testnet',
//             chainId: '0x1',
//             socialLoginConfig: {},
//         },
//     }),
// ]

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
})
