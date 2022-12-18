import { Text, Flex, Grid, GridItem, Button, Stack, HStack, VStack, Image, Heading, Box } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import bgImg from '../media/images/landing_bg.jpg'
import { useState, useEffect } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const StyledBg = styled.div`
    background: url(${bgImg.src}) no-repeat center center;
    background-size: cover;
    height: 100%;
`
const Divider = styled.div`
    border-bottom: 3px solid #83beda;
    padding-bottom: 20px;
    margin: 0 20px;
`
const navButtonStyle = {
    borderRadius: '16px',
    fontSize: '24px',
    fontWeight: 400,
    letterSpacing: '0px',
    mr: 15,
}

const Home: NextPage = () => {
    const { push } = useRouter()

    return (
        <Stack maxH='100vh' py={4}>
            <VStack>
                <Image w='100%' src={'/icons/LandingImg.svg'} />
                <Box p={8} textAlign='center'>
                    <Heading size='xl' fontWeight='extrabold'>
                        Proof-of-Networking
                    </Heading>
                    <Box px={6}>
                        <Text fontWeight='400' fontSize='lg'>
                            Discover people at web3 events the web3 way
                        </Text>
                    </Box>
                </Box>
                <Flex justify='center' alignItems='center' direction='column' textAlign='center' px={20}>
                    <Button onClick={() => push('/app')} backgroundColor='#3083FF' color='white' size='lg' w='100%' mb={4}>
                        Connect wallet
                    </Button>
                    <Box>
                        <Text color='#3083FF' onClick={()=>{ push('/manualConnect')}}>
                            Or enter wallet address manually to view your profile
                        </Text>
                    </Box>
                </Flex>
            </VStack>
        </Stack>
    )
}

export default Home
