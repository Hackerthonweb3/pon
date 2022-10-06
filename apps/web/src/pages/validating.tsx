import { Button, Center, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useDisconnect } from 'wagmi'
import { ActionButton } from '~/components/ActionButton'

export default function Validating() {
    const { push } = useRouter()
    const { disconnect } = useDisconnect()

    const handleBack = () => {
        disconnect()
        push('/app')
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
                <ActionButton onClick={() => {}} label='Continue' />
                <Button position='absolute' right='10px' bottom='10px' onClick={handleBack}>
                    Go back
                </Button>
            </Flex>
        </Center>
    )
}
