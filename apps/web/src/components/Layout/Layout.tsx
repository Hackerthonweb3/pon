import '@rainbow-me/rainbowkit/styles.css'

import { Container, Fade, SlideFade, VStack, Stack, Box } from '@chakra-ui/react'
import { NavBar } from './NavBar'
import { PropsWithChildren } from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { useRainbowOptions } from '~/hooks/useRainbowOptions'

import { useAnimation } from '~/hooks/useAnimation'
import { OrbisProvider } from '~/contexts'

export const Layout = ({ children }: PropsWithChildren) => {
    const animationA = useAnimation(600)
    const animationB = useAnimation(200)

    // Don't move rainbow! We use RainbowKitProvider here to be able to access ChakraUI's theme!!!
    const rainbowOptions = useRainbowOptions()

    return (
        <RainbowKitProvider {...rainbowOptions}>
            <OrbisProvider>
                <SlideFade in={animationA} offsetY='-20px' style={{ zIndex: 1 }}>
                    <NavBar />
                </SlideFade>
                <Fade in={animationB}>
                    <Container mt={{ md: 20, base: 6 }} mb={{ md: 20, base: 0 }} maxWidth={['100%', '80%', '60%']}>
                        <VStack>
                            <Stack
                                as={Box}
                                width='100%'
                                textAlign={'left'}
                                spacing={{ base: 6, md: 8 }}
                                py={{ base: 4, md: 10 }}
                                px={{ base: 0, md: 6 }}>
                                {children}
                            </Stack>
                        </VStack>
                    </Container>
                </Fade>
            </OrbisProvider>
        </RainbowKitProvider>
    )
}
