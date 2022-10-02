import Image from 'next/image'
import { Text, Flex, Grid, GridItem, Button, Box } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import styled from 'styled-components'

import { useOrbis } from '~/hooks'
import { CustomConnect } from '~/components/CustomConnect'
import Onboarding from '~/components/Onboarding/Onboarding'
import bgImg from '../media/images/landing_bg.jpg'
import promoSvg from '../media/svg/landing_promo.svg'
import buttonCreateSvg from '../media/svg/create_button.svg'
import logosSvg from '../media/svg/landing_logos.svg'
import bgGraphicsConnect from '../media/svg/landing_connect.svg'

import type { NextPage } from 'next'

const StyledBg = styled.div`
    background: url(${bgImg.src}) no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
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
    const { orbis, loadingDid, loadingProfile } = useOrbis()
    const isLoading = loadingDid || loadingProfile
    const { isConnected } = useAccount()

    const renderLanding = (
        <>
            <Grid
                gap={10}
                height='2099px'
                templateColumns='repeat(4, 1fr)'
                templateRows='repeat(16, 1fr)'
                paddingTop='18px'>
                <GridItem colSpan={4} rowSpan={1}>
                    <Flex justifyContent='flex-end'>
                        <Button {...navButtonStyle}>Create Profile</Button>
                        {/* <Button {...navButtonStyle} color='black' background='white'>
                            Connect Wallet
                        </Button> */}
                        <CustomConnect />
                    </Flex>
                </GridItem>
                <GridItem colSpan={3} rowSpan={1}>
                    <Flex justifyContent='center'>
                        <Image src={promoSvg} alt='promo' />
                    </Flex>
                </GridItem>
                <GridItem colSpan={3} rowSpan={1}>
                    <Flex justifyContent='center' paddingRight={{ md: '130px' }}>
                        <Image src={buttonCreateSvg} alt='create' />
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} rowSpan={4} />
                <GridItem colSpan={4} rowSpan={1}>
                    <Divider />
                    <Flex justifyContent='center' my={4}>
                        <Image src={logosSvg} alt='logos' />
                    </Flex>
                    <Divider />
                </GridItem>
                <GridItem colStart={2} colEnd={4} rowSpan={1}>
                    <Text fontSize='40px' textAlign='center' my={20} lineHeight='32px'>
                        It is hard to remember and keep track of everyone we meet at events to re-connect later.
                    </Text>
                </GridItem>
                <GridItem colSpan={4} rowSpan={1}>
                    <Flex justifyContent='center' mb={4}>
                        <Image src={bgGraphicsConnect} alt='connect' />
                    </Flex>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3} />
            </Grid>
        </>
    )

    return (
        <>
            <Onboarding />
            <Box display={{ base: 'none', md: 'block', lg: 'block' }}>
                <StyledBg>{renderLanding}</StyledBg>
            </Box>
            <Box display={{ base: 'block', md: 'none', lg: 'none' }}>
                <Onboarding />
            </Box>
        </>
    )
}

export default Home
