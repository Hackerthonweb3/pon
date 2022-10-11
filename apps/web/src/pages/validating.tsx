import { Button, Center, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useDisconnect } from 'wagmi'
import { ActionButton } from '~/components/ActionButton'
import { OrbisContext } from '~/contexts'
import { useOnboarding } from '~/hooks/useOnboarding'

export default function Validating() {
    const orbis = useContext(OrbisContext)
    const { setViewedOnboarding } = useOnboarding()
    const { push } = useRouter()
    const { disconnect } = useDisconnect()

    const handleBack = () => {
        disconnect()
        push('/app')
    }

    const handleContinue = async () => {
        const result = await orbis?.isConnected()
        if (result.did) {
            setViewedOnboarding(true)
            console.log('checking profile for did', result.did)
            let { data, error } = await orbis?.getProfile(result.did)
            if (error) return console.log('error fetching profile', error)
            if (!data.details.profile) {
                console.log('profile not found, redirect to creation')
                push('/profile/create')
            } else {
                push('/profile')
            }
        } else {
            console.log('error getting connecting orbis')
        }
    }

    return (
        <Center h='full'>
            <Flex direction='column'>
                <Text textAlign='center' fontSize='44px' color='#99F0FF'>
                    Validating
                </Text>
                <Text textAlign='center' fontSize='22px' padding='10px 40px 40px'>
                    Give us 30 seconds while we validate your profile
                </Text>
                <UnorderedList marginInlineStart='3em' listStylePosition='inside' mb='40px' fontSize='22px'>
                    <ListItem>Connecting wallet</ListItem>
                    <ListItem>Giving permission to Ceramic</ListItem>
                    <ListItem>Signing in for Lit Protocol</ListItem>
                </UnorderedList>
                <ActionButton onClick={handleContinue} label='Continue' />
                <Button position='absolute' right='10px' bottom='10px' onClick={handleBack}>
                    Go back
                </Button>
            </Flex>
        </Center>
    )
}
