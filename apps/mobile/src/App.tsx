import '../shim'
import '@business-card/orbis-sdk-react-native/utils/polyfills_light_crypto'
import 'react-native-get-random-values'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { noopStorage } from '@wagmi/core'
import WalletConnectProvider from '@walletconnect/react-native-dapp'
import { getDefaultProvider } from 'ethers'
// import { createClient, createStorage, WagmiConfig } from 'wagmi'
import { configureChains, createClient, createStorage, defaultChains, WagmiConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { Navigation } from './components'
import { OnboardingProvider } from './contexts/OnboardingContext'
// import { OrbisProvider } from './contexts/OrbisContext'
import useCachedResources from './hooks/useCachedResources'

const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
})

const { chains, provider } = configureChains(defaultChains, [
    alchemyProvider({ apiKey: 'yourAlchemyApiKey' }),
    publicProvider(),
])

const wagmiClient = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains })],
    provider,
    persister: asyncStoragePersister,
    storage: createStorage({
        storage: noopStorage,
    }),
})

export default function App() {
    const isLoadingComplete = useCachedResources()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            // <OrbisProvider>
            <WagmiConfig client={wagmiClient}>
                <WalletConnectProvider redirectUrl='pon://' storageOptions={{ asyncStorage: AsyncStorage as any }}>
                    <OnboardingProvider>
                        <Navigation />
                    </OnboardingProvider>
                </WalletConnectProvider>
            </WagmiConfig>
            // </OrbisProvider>
        )
    }
}
