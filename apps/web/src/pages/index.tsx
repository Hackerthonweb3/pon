import { Box, Heading, Text, VStack, Spinner } from '@chakra-ui/react'
import { useOrbis } from '~/hooks'
import { CustomConnect } from '~/components/CustomConnect'

import type { NextPage } from 'next'
import { useAccount } from 'wagmi'

const Home: NextPage = () => {
    const { orbis, loadingDid, loadingProfile } = useOrbis()
    const isLoading = loadingDid || loadingProfile
    const { isConnected } = useAccount()

    const renderLanding = (
        <VStack>
            <Heading lineHeight={'90%'}>
                <Text mb={50} color={'gray.400'} fontSize='48px' letterSpacing='2px'>
                    Web3 Digital Business Card
                </Text>
            </Heading>
            <VStack mt={50} gap={50}>
                {!isConnected && (
                    <Text color={'gray.300'} fontSize='22px'>
                        Hi Anon, log in with your wallet to create or view your profile
                    </Text>
                )}
                <CustomConnect />
                <Text color={'blue.300'} fontSize='18px'>
                    Recommended network is Polygon
                </Text>
            </VStack>
        </VStack>
    )

    return (
        <VStack h='container.sm' justify={'center'}>
            {!isLoading && renderLanding}
            {(!orbis || isLoading) && (
                <Box>
                    <Spinner />
                </Box>
            )}
        </VStack>
    )
}

export default Home
