import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { VStack, Button } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import { useOrbis } from '~/hooks'
import UserProfile from '~/components/UserProfile'
import ScanSvg from '~/media/scan.svg'

export default function Profile() {
    const { isConnected } = useAccount()
    const { profile } = useOrbis()
    const router = useRouter()

    console.log(profile)

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
        }
    }, [isConnected])

    function handleRedirect() {
        router.push({ pathname: '/scan' })
    }

    // TODO: remove test values
    return (
        isConnected && (
            <>
                <UserProfile profile={profile} isMyProfile={true} />
                <Button onClick={handleRedirect} h={42} p='10px' backgroundColor={'#ffffff3d'}>
                    <Image src={ScanSvg} alt='scan' />
                </Button>
            </>
        )
    )
}
