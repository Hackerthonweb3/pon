import { useRouter } from 'next/router'
import { VStack, Button } from '@chakra-ui/react'
import UserProfile from '~/components/UserProfile'

export default function ContactProfile() {
    // TODO: get contact profile from orbis
    const router = useRouter()

    function handleRedirect() {
        router.push({ pathname: '/contacts' })
    }

    return (
        <VStack spacing='10'>
            <UserProfile isMyProfile={false} />
            <Button onClick={handleRedirect} h={42} p='10px' backgroundColor={'#ffffff3d'}>
                Go to Back
            </Button>
        </VStack>
    )
}
