import { Box, Center, Spinner, Flex, Stack, VStack, Heading, Image, Text, Button, Input, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Orbis } from "@orbisclub/orbis-sdk";

export default function ManualConnect() {
    let orbis = new Orbis();
    const { push } = useRouter()
    const [address, setAddress] = useState('')
    const toast = useToast();

    const submitAddress = async () => {
        let { data, error } = await orbis.getDids(address);
        let { data: profile, error: profileError } = await orbis.getProfile(data[0].did);
        if (!profile.details.profile) {
            console.log('no profile')
            toast({
                title: "No profile found",
                description: "Please check if you typed in the correct address",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Profile found",
                description: "Redirecting to profile",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            push({
                pathname: '/profile',
                query: { profileData: data[0].did },
            })
        }
    }

    return (
        <Stack maxH='100vh' py={4}>
            <VStack h='100vh' justify='space-around'>
                <Flex h='50%' direction='column' justify='space-evenly'>
                    <Flex p={8} px={16} textAlign='center' justify='center' alignItems='center'>
                        <Heading size='xl' fontWeight='extrabold'>
                            Enter wallet address manually to view your profile
                        </Heading>
                    </Flex>
                    <Flex justify='center' alignItems='center' direction='column' textAlign='center' w='100%'>
                        <Input placeholder='Enter wallet address' variant='filled' w='80%' mb={4} onChange={(e) => {setAddress(e.target.value)}} />
                    </Flex>
                </Flex>
                <Flex w='100%' justify='space-around' alignItems='center'>
                    <Button
                        w='40%'
                        onClick={() => push('/')}
                        border='2px solid #3083FF'
                        backgroundColor='white'
                        color='#3083FF'
                        size='lg'
                        mb={4}
                    >
                        Back
                    </Button>
                    <Button w='40%'
                        onClick={() => submitAddress()}
                        backgroundColor='#3083FF' color='white' size='lg' mb={4}>Submit</Button>
                </Flex>
            </VStack>
        </Stack>
    )
}
