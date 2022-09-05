import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, Heading, Container, Text, Stack, VStack, Spinner } from '@chakra-ui/react'
import { useOrbis, useSafeConnected } from '~/hooks'
import Scan from '~/components/Scan'
import NewUser from '~/components/NewUser'
import { CustomConnect } from '~/components/CustomConnect'
import CeramicSessionComponent from '~/components/CeramicSessionComponent'
import LogoSvg from '../media/logo.svg'

import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
    const isConnected = useSafeConnected()
    const { profile, orbis, loadingDid, loadingProfile } = useOrbis()
    const router = useRouter()
    const isLoading = loadingDid || loadingProfile

    if (!orbis) {
        throw new Error('useOrbis must be used within a OrbisProvider')
    }

    useEffect(() => {
        if (!isLoading && orbis) {
            if (isConnected && profile?.name) {
                router.push('/contacts')
            }

            if (isConnected && !profile?.name) {
                router.push('/create')
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, profile, loadingDid, loadingProfile])

    const renderLanding = (
        <Box mt={40}>
            <Heading lineHeight={'90%'}>
                <Image src={LogoSvg} alt='logo' />
            </Heading>
            <VStack gap={5}>
                <Text mt={4} color={'gray.400'} fontSize='18px' letterSpacing='2px'>
                    Proof of Networking
                </Text>
                <Text color={'gray.300'} fontSize='22px'>
                    Hi Anon, log in with your wallet to create or view your profile
                </Text>
                <Text color={'blue.300'} fontSize='22px'>
                    Recommended newtwork is Polygon
                </Text>
                <CustomConnect />
            </VStack>
        </Box>
    )

    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <Container maxW={'3xl'}>
                <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 5 }}>
                    {!isConnected && renderLanding}
                    {isConnected && (!orbis || isLoading) && (
                        <Box>
                            <Spinner />
                        </Box>
                    )}
                    <CeramicSessionComponent />
                </Stack>
            </Container>
        </>
    )
}

export default Home
