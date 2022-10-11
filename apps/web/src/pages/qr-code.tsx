import { Box, Container, Stack, Spinner, Center, AbsoluteCenter } from '@chakra-ui/react'
// import { useOrbis } from '~/hooks'
import Scan from '~/components/Scan'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

const ScanPage: NextPage = () => {
    const { isConnected } = useAccount()
    const router = useRouter()
    useEffect(() => {
        if (!isConnected) {
            router.push('/')
        }
    }, [isConnected])

    return <Scan />
}

export default ScanPage
