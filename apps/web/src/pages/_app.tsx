import '@fontsource/vt323/400.css'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Layout } from '~/components/Layout'
import { WagmiConfig } from 'wagmi'
import { theme, wagmiClient } from '~/lib'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '~/components/ErrorFallBack'
import { OrbisProvider } from '~/contexts'

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
