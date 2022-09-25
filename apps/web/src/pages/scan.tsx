import { Box, Container, Stack, Spinner, Center, AbsoluteCenter } from '@chakra-ui/react'
import { useOrbis } from '~/hooks'
import Scan from '~/components/Scan'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

const ScanPage: NextPage = () => {
    const { isConnected } = useAccount()
    const { profile } = useOrbis()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
        }
    }, [isConnected])

    return (
        <>
            <Container maxW={'3xl'}>
                <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 5 }}>
                    {profile && <Scan profile={profile} />}
                    {!profile && (
                        <AbsoluteCenter>
                            <Spinner size='xl' />
                        </AbsoluteCenter>
                    )}
                </Stack>
            </Container>
        </>
    )
}

export default ScanPage
