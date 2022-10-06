import '@fontsource/vt323/400.css'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'
import { ErrorBoundary } from 'react-error-boundary'

import { theme, wagmiClient } from '~/lib'
import { ErrorFallback } from '~/components/ErrorFallBack'
import { OrbisProvider } from '~/contexts'
import { Layout } from '~/components/Layout'

function App({ Component, pageProps }: AppProps) {
    return (
        // TODO: better styling for errorboundary
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            // here we can reset the state of the failing component
            onReset={() => {}}>
            <ChakraProvider theme={theme}>
                <WagmiConfig client={wagmiClient}>
                    <OrbisProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </OrbisProvider>
                </WagmiConfig>
            </ChakraProvider>
        </ErrorBoundary>
    )
}

export default App
