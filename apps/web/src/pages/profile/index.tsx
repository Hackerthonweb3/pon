import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

import { useOrbis } from '~/hooks'
import UserProfile from '~/components/UserProfile'

export default function Profile() {
    const { isConnected } = useAccount()
    const { profile } = useOrbis()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
        }
    }, [isConnected])

    return <UserProfile profile={profile} isMyProfile={true} />
}
