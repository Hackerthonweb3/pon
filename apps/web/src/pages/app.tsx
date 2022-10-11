import { Box, Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Onboarding from '~/components/Onboarding/Onboarding'
import { useOnboarding } from '~/hooks/useOnboarding'

export default function App() {
    const { isOnboarding } = useOnboarding()
    const { push } = useRouter()

    useEffect(() => {
        if (!isOnboarding) {
            push('/profile')
        }
    }, [isOnboarding])

    if (!isOnboarding)
        return (
            <Center>
                <Spinner size='xl' />
            </Center>
        )

    return (
        <Box>
            <Onboarding />
        </Box>
    )
}
