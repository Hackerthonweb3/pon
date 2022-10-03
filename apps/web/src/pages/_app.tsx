import '@fontsource/vt323/400.css'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import { ErrorBoundary } from 'react-error-boundary'

import { Layout } from '~/components/Layout'
import { theme, wagmiClient } from '~/lib'
import { ErrorFallback } from '~/components/ErrorFallBack'
import { OrbisProvider } from '~/contexts'
import { useRainbowOptions } from '~/hooks/useRainbowOptions'

function App({ Component, pageProps, ...appProps }: AppProps) {
    const getContent = () => {
        // we not using same layout for the landing page
        if (appProps.router.pathname === '/') {
            const rainbowOptions = useRainbowOptions()

            return (
                <RainbowKitProvider {...rainbowOptions}>
                    <Component {...pageProps} />
                </RainbowKitProvider>
            )
        }

        return (
            <Layout {...pageProps}>
                <Component {...pageProps} />
            </Layout>
        )
    }

    return (
        // TODO: better styling for errorboundary
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            // here we can reset the state of the failing component
            onReset={() => {}}>
            <ChakraProvider theme={theme}>
                <WagmiConfig client={wagmiClient}>
                    <OrbisProvider>{getContent()}</OrbisProvider>
                </WagmiConfig>
            </ChakraProvider>
        </ErrorBoundary>
    )
}

export default App
