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
                <Box p={10} textAlign='center'>
                    <Heading size='xl' fontWeight='extrabold'>
                        Proof-of-Networking
                    </Heading>
                    <Box px={6}>
                        <Text fontWeight='400' fontSize='lg'>
                            Discover people at web3 events the web3 way
                        </Text>
                    </Box>
                </Box>
                <Button onClick={() => push('/app')} colorScheme='twitter' size='lg'>Create your profile</Button>
            </VStack>
        </Stack>
    )
}

export default Home
