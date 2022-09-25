import '@rainbow-me/rainbowkit/styles.css'

import { Fade, SlideFade, Box, Spinner, Center, Flex } from '@chakra-ui/react'
import { NavBar } from './NavBar'
import { PropsWithChildren } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useRainbowOptions } from '~/hooks/useRainbowOptions'

import { useAnimation } from '~/hooks/useAnimation'
import { useSafeMounted } from '~/hooks'
import { useAccount } from 'wagmi'
import { useCeramicSession } from '~/hooks/useCeramicSession'

export const Layout = ({ children }: PropsWithChildren) => {
    const isMounted = useSafeMounted()
    const animationA = useAnimation(600)
    const animationB = useAnimation(200)
    useAccount(useCeramicSession())

    // Don't move rainbow! We use RainbowKitProvider here to be able to access ChakraUI's theme!!!
    const rainbowOptions = useRainbowOptions()

    if (!isMounted)
        return (
            <Center height={'100vh'}>
                <Spinner size='xl' />
            </Center>
        )

    return (
        <RainbowKitProvider {...rainbowOptions}>
            <SlideFade in={animationA} offsetY='-20px' style={{ zIndex: 1 }}>
                <NavBar />
            </SlideFade>
            <Fade in={animationB}>
                <Flex w='full' h='full' p={20}>
                    <Box flex='1'>{children}</Box>
                </Flex>
            </Fade>
        </RainbowKitProvider>
    )
}
