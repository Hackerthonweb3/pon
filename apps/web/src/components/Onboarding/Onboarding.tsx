import { useEffect, useState } from 'react'
import {
    Box,
    Button as ChakraButton,
    Container,
    cookieStorageManager,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Pagination } from 'swiper'
import SwiperClass from 'swiper/types/swiper-class'
import styled from 'styled-components'

import { useOnboarding } from '../../hooks/useOnboarding'
import { ActionButton } from '../ActionButton'
import { CustomConnect } from '../CustomConnect'
import { CallToActionLabel } from './CallToActionLabel'
import { Disclaimer } from './Disclaimer'
import { Slide } from './Slide'

import slides from './slide-data'
import buttonConnectSvg from '../../media/svg/button_connect.svg'

import 'swiper/css'
import 'swiper/css/pagination'
import { ContainerFlex } from '../DesignSystem'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'

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
    // const { setViewedOnboarding } = useOnboarding()
    const [visible, setVisible] = useState(true)
    const [manualAddress, setManualAddress] = useState(false)
    const [activeSlide, setActiveSlide] = useState(0)
    const { openConnectModal } = useConnectModal()
    const { isConnected } = useAccount()
    const { push } = useRouter()

    useEffect(() => {
        if (isConnected) push('/validating', '/app')
    }, [isConnected])

    const handleComplete = async () => {
        // await setViewedOnboarding(true)
        setVisible(false)
        // go to connect
    }

    const handleConnectWallet = () => {
        openConnectModal && openConnectModal()
    }

    return (
        <>
            <Flex p='20% 5% 10%' h='full' wrap='wrap' alignContent='flex-start' justifyContent='center'>
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
                            <Text as='button' fontSize='28px' onClick={() => setManualAddress(true)}>
                                Enter address manually
                            </Text>
                        </Flex>
                        <Disclaimer />
                    </Flex>
                )}
            </Flex>
            <Modal onClose={() => setManualAddress(false)} isOpen={manualAddress} motionPreset='slideInBottom'>
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
                        />
                    </ModalBody>
                    <ModalFooter marginLeft='10px'>
                        <ActionButton label='Confirm' onClick={() => {}} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
