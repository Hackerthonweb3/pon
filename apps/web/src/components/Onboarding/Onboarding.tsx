import { useContext, useEffect, useState } from 'react'
import {
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react'
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
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import { useOrbis } from '~/hooks'
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

    // open rainbow kit connect modal
    const { openConnectModal } = useConnectModal()

    const { push } = useRouter()

    const handleChange = (event: any) => setEnteredAddress(event.target.value)

    // wagmi hooks triggered when interacting with the wallet using rainbow kit
    const { connector: activeConnector, isConnected } = useAccount({
        // triggered after connecting a wallet
        async onConnect({ address, connector, isReconnected }) {
            console.log('connected by rainbow kit')
            const result = await orbis?.isConnected()
            if (result.status === 200) {
                console.log('orbis is reconnected')
                setDid(result.did)
            } else {
                console.log('oops orbis not connected, trying to connect')
                const provider = await connector?.getProvider()
                const result = await orbis?.connect(provider)
                if (result.status === 200) {
                    setIsOrbisConnected(true)
                    if (isCeramicConnected) {
                        setDid(result.did)
                        console.log('did saved to state', result.did)
                    }
                }
            }
        },
        // triggered after disconnecting the wallet
        async onDisconnect() {
            console.log('orbis disconnected by rainbow kit')
            const result = await orbis?.logout()
            if (result.status === 200) {
                console.log('orbis disconnected by useConnect')
                setIsOrbisConnected(false)
            } else {
                console.log('error on orbis logout', result)
            }
        },
    })

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
            // TODO: set profile here or push to the profile/[did] route
        } else {
            console.log('profile not found, redirect to creation')
        }
    }

    useEffect(() => {
        setIsCeramicConnected(Boolean(localStorage.getItem('ceramic-session')))
        setIsLitConnected(Boolean(localStorage.getItem('lit-auth-signature')))

        if (isOrbisConnected) {
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

    useEffect(() => {
        if (isConnected) push('/validating', '/app')
    }, [isConnected])

    const handleConnectWallet = () => {
        openConnectModal && openConnectModal()
    }

    const handleManualAddress = async () => {
        const { data, error } = await orbis?.getDids(enteredAddress)
        console.log('data', data)
        if (error) {
            alert('The entered address has not registered an Orbis profile')
        }

        // For now make the assumption that the most recent used profile is the main one
        const lastUsedProfile = Math.max(...data.map((profile: any) => profile.last_activity_timestamp))
        const did = data.filter((profile: any) => profile.last_activity_timestamp === lastUsedProfile)[0].did

        push({ pathname: '/mini-profile/[did]', query: { did } }, '/mini-profile')
    }

    return (
        <>
            <Flex
                p={{ base: '20% 5% 10%', md: '5%', lg: '3%' }}
                h='full'
                wrap='wrap'
                alignContent='flex-start'
                justifyContent='center'>
                <StyledSwipper
                    grabCursor={true}
                    onSlideChange={e => setActiveSlide(e.activeIndex)}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}>
                    {slides.map((item: any) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <Slide item={item} />
                            </SwiperSlide>
                        )
                    })}
                </StyledSwipper>
                {activeSlide === 2 && (
                    <Flex direction='column' justifyContent='space-between' alignItems='center' flex='1' h='25%'>
                        <Flex direction='column' justifyContent='flex-start'>
                            <ActionButton label='Connect your wallet' onClick={handleConnectWallet} />
                            <Text as='button' fontSize='28px' onClick={() => setManualAddressModalShown(true)}>
                                Enter address manually
                            </Text>
                        </Flex>
                        <Disclaimer />
                    </Flex>
                )}
            </Flex>
            <Modal
                onClose={() => setManualAddressModalShown(false)}
                isOpen={manualAddressModalShown}
                motionPreset='slideInBottom'>
                <ModalOverlay h='100vh' bg='none' />
                <ModalContent
                    position='absolute'
                    bottom='0'
                    alignItems='stretch'
                    margin='0'
                    backgroundColor=' #353844'
                    border='1px solid #696969'
                    border-radius='25px 25px 0 0'>
                    <ModalHeader fontSize='32px' fontWeight='normal' textAlign='center'>
                        Enter an Ethereum address
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            backgroundColor='#212121'
                            w='100%'
                            placeholder='Address...'
                            fontSize='28px'
                            padding='28px'
                            onChange={handleChange}
                        />
                    </ModalBody>
                    <ModalFooter marginLeft='10px'>
                        <ActionButton label='Confirm' onClick={handleManualAddress} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
