import '@rainbow-me/rainbowkit/styles.css'

import { Fade, Spinner, Center } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useRainbowOptions } from '~/hooks/useRainbowOptions'

import { useAnimation } from '~/hooks/useAnimation'
import { useSafeMounted } from '~/hooks'
import { useAccount } from 'wagmi'
import { useCeramicSession } from '~/hooks/useCeramicSession'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Navbar from '../Navbar'
import { onboardingRoutes } from '~/constants'

export const Layout = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    const isMounted = useSafeMounted()
    const animation = useAnimation(200)
    useAccount(useCeramicSession())

    // Don't move rainbow! We use RainbowKitProvider here to be able to access ChakraUI's theme!!!
    const rainbowOptions = useRainbowOptions()

    if (!isMounted)
        return (
            <Center h='full'>
                <Spinner size='xl' />
            </Center>
        )

    return (
        <Wrapper>
            <Fade in={animation} style={{ height: '100%' }}>
                <RainbowKitProvider {...rainbowOptions}>
                    {onboardingRoutes.includes(router.pathname) ? children : (
                        <>
                            {children}
                            <Navbar />
                        </>
                    )}
                </RainbowKitProvider>
            </Fade>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100%;
    .chakra-fade {
        height: 100%;
    }
    [data-rk] {
        height: 100%;
    }
`
