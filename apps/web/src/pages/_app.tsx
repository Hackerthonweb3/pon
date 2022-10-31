// import '@fontsource/vt323/400.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/400.css'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'
import { ErrorBoundary } from 'react-error-boundary'

import { theme, wagmiClient } from '~/lib'
import { ErrorFallback } from '~/components/ErrorFallBack'
import { OrbisProvider } from '~/contexts'
import { Layout } from '~/components/Layout'
import { OnboardingContext, OnboardingProvider } from '~/contexts/OnboardingContext'
import { Web3Modal } from '@web3modal/react'
import type { ConfigOptions } from '@web3modal/core'

function App({ Component, pageProps }: AppProps) {
    const config = {
        projectId: '957072a58bf2b006aac0060adbff0fe6',
        theme: 'dark' as ConfigOptions['theme'],
        accentColor: 'default' as ConfigOptions['accentColor'],
        ethereum: {
            appName: 'web3Modal',
        },
    }

    return (
        //TODO: better styling for errorboundary
        <>
            <Web3Modal config={config} />
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                // here we can reset the state of the failing component
                onReset={() => {}}>
                <ChakraProvider theme={theme}>
                    <WagmiConfig client={wagmiClient}>
                        <OrbisProvider>
                            <OnboardingProvider>
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </OnboardingProvider>
                        </OrbisProvider>
                    </WagmiConfig>
                </ChakraProvider>
            </ErrorBoundary>
        </>
    )
}

export default App
