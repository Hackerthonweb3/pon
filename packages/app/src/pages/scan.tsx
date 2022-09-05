import { Box, Container, Stack, Spinner } from '@chakra-ui/react'
import { useOrbis } from '~/hooks'
import Scan from '~/components/Scan'

import type { NextPage } from 'next'

const ScanPage: NextPage = () => {
    const { profile } = useOrbis()

    return (
        <>
            <Container maxW={'3xl'}>
                <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 10, md: 5 }}>
                    {profile && <Scan profile={profile} />}
                    {!profile && <Spinner size='xl' />}
                </Stack>
            </Container>
        </>
    )
}

export default ScanPage
