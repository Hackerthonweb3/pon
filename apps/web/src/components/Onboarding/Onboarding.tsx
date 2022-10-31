import { useContext, useEffect, useState } from 'react'
import { Text, Flex, Grid, GridItem, Button, Stack, HStack, VStack, Image, Heading, Box } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import styled from 'styled-components'

import { ActionButton } from '../ActionButton'
import { Disclaimer } from './Disclaimer'
import { Slide } from './Slide'

import slides from './slide-data'

import 'swiper/css'
import 'swiper/css/pagination'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Web3Button, useAccount } from '@web3modal/react'
import { useRouter } from 'next/router'
import { OrbisContext } from '~/contexts'

const StyledSwipper = styled(Swiper)`
    height: 75%;
    .swiper-pagination-bullet {
        /* padding-right: 20px; */
        height: 9px;
        width: 9px;
        position: relative;
        background-color: #d9d9d9;
        opacity: 1;
    }
    .swiper-pagination-bullet-active {
        background-color: #219ebc;
    }
    .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
    .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 7px);
    }
`

export default function Onboarding() {
    const orbis = useContext(OrbisContext)
    // TODO: track profile globally
    // const {did} = useContext(ProfileContext)

    // state to track onboarding current slide
    const [activeSlide, setActiveSlide] = useState(0)

    // state to show the modal to enter manual address
    const [manualAddressModalShown, setManualAddressModalShown] = useState(false)

    // state for manual address entered in the input component
    const [enteredAddress, setEnteredAddress] = useState('')

    // state to track the did after connecting succesfully to orbis
    const [did, setDid] = useState<string>()

    // states to track orbis, ceramic and lit connections
    const [isOrbisConnected, setIsOrbisConnected] = useState(false)
    const [isCeramicConnected, setIsCeramicConnected] = useState(false)
    const [isLitConnected, setIsLitConnected] = useState(false)

    const [circle1Src, setCircle1Src] = useState('/icons/ConnectStatusIcon InProgress.svg')
    const [tab1Content, setTab1Content] = useState('Connect to your wallet')
    const [circle2Src, setCircle2Src] = useState('/icons/Circle.svg')
    const [tab2Content, setTab2Content] = useState('Allow Ceramic to provide user-controlled decentralized storage')

    // open rainbow kit connect modal
    const { openConnectModal } = useConnectModal()

    const { push } = useRouter()

    const handleChange = (event: any) => setEnteredAddress(event.target.value)

    // wagmi hooks triggered when interacting with the wallet using rainbow kit

    const { account, isReady } = useAccount()

    useEffect(() => {
        const onDisconnect = async () => {
            console.log('orbis disconnected by rainbow kit')
            const result = await orbis?.logout()
            if (result.status === 200) {
                console.log('orbis disconnected by useConnect')
                setIsOrbisConnected(false)
            } else {
                console.log('error on orbis logout', result)
            }
        }

        const onConnect = async () => {
            console.log('connected by rainbow kit')
            const result = await orbis?.isConnected()
            if (result.status === 200) {
                console.log('orbis is reconnected')
                setDid(result.did)
            } else {
                console.log('oops orbis not connected, trying to connect')
                const provider = await account.connector?.getProvider()
                console.log('fucking provider', provider)
                const result = await orbis?.connect(provider)
                if (result.status === 200) {
                    setIsOrbisConnected(true)
                    if (isCeramicConnected) {
                        setDid(result.did)
                        console.log('did saved to state', result.did)
                    }
                }
            }
            console.log(account.isConnected)
        }

        if (account.status === 'disconnected') {
            setCircle1Src('/icons/ConnectStatusIcon InProgress.svg')
            setTab1Content('Connect to your wallet')
            setCircle2Src('/icons/Circle.svg')
            onDisconnect()
        } else if (account.status === 'connected') {
            setCircle1Src('/icons/ConnectStatusIcon.svg')
            setTab1Content('Wallet connected')
            setCircle2Src('/icons/ConnectStatusIcon InProgress.svg')
            onConnect()
        }
    }, [account.status])

    // tries to fetch existing profile from orbis
    const checkProfile = async () => {
        // trigger reconnection to get did
        const result = await orbis?.isConnected()
        if (result.status === 200) {
            setDid(result.did)
        }
        if (result.did) {
            console.log('checking profile for did', did)
            let { data, error } = await orbis?.getProfile(result.did)
            if (error) return console.log('error fetching profile', error)
            console.log('profile fetched:', data)
            if (!data.details.profile) {
                console.log('profile not found, redirect to creation')
                push('/profile/create')
            } else {
                push('/profile')
            }
            // TODO: set profile here or push to the profile/[did] route
        } else {
            console.log('profile not found, redirect to creation')
        }
    }

    useEffect(() => {
        setIsCeramicConnected(Boolean(localStorage.getItem('ceramic-session')))
        setIsLitConnected(Boolean(localStorage.getItem('lit-auth-signature')))

        if (isOrbisConnected) {
            setCircle2Src('/icons/ConnectStatusIcon.svg')
            setTab2Content('Done')
            console.log('checking profile after orbis connected')
            checkProfile()
        }
    }, [isOrbisConnected])

    useEffect(() => {
        const checkOrbis = async () => {
            const result = await orbis?.isConnected()
            if (result.status === 200) {
                setIsOrbisConnected(true)
                setDid(result.did)
            }
        }
        checkOrbis()
    }, [])

    const sharedCircleProps = {
        colSpan: 1,
        rowSpan: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '58px',
    }

    const sharedInfoProps = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 'lg',
        p: 2,
    }

    return (
        <Stack h='100vh' pt='10%'>
            <VStack h='100%'>
                <Box p={10} textAlign='center'>
                    <Heading size='xl' fontWeight='extrabold'>
                        Just a couple more steps before we start
                    </Heading>
                    <Box>
                        <Text fontWeight='400' fontSize='lg'>
                            Web3 is not entirely frictionless yet... but we&apos;re getting there, right?
                        </Text>
                    </Box>
                </Box>
                <Grid w='100%' h='20vh' gridTemplateColumns={'repeat(3, 1fr)'} gridTemplateRows={'1fr 0.5fr 1fr'}>
                    <GridItem {...sharedCircleProps} zIndex={2}>
                        <Image alt='circle image' src={circle1Src} />
                    </GridItem>

                    <GridItem
                        colSpan={2}
                        {...sharedInfoProps}
                        color={account.status === 'disconnected' ? 'black' : 'green'}
                        fontWeight={account.status === 'disconnected' ? 800 : 400}>
                        {tab1Content}
                    </GridItem>

                    <GridItem {...sharedCircleProps}>
                        <Image alt='line icon' src='/icons/Line.svg' h='200%' zIndex={1} />
                    </GridItem>

                    <GridItem colSpan={2} />

                    <GridItem {...sharedCircleProps} alignItems='flex-start' zIndex={2}>
                        <Image alt='circle image' width='58px' src={circle2Src} />
                    </GridItem>

                    <GridItem
                        colSpan={2}
                        {...sharedInfoProps}
                        color={tab2Content == 'Done' ? 'green' : 'black'}
                        fontWeight={account.status != 'disconnected' ? (tab2Content == 'Done' ? 400 : 800) : 400}>
                        {tab2Content}
                    </GridItem>
                </Grid>
                <Flex position='absolute' bottom={20}>
                    <Web3Button />
                </Flex>
            </VStack>
        </Stack>
    )
}
