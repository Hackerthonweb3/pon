import { useEffect, useState } from 'react'
import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react'
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

const StyledSwipper = styled(Swiper)`
    height: 75%;
    .swiper-pagination-bullet {
        /* padding-right: 20px; */
        height: 12px;
        width: 12px;
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
    const [activeSlide, setActiveSlide] = useState(0)
    // useEffect(() => {
    //     if (route.params?.goToStart) {
    //         setVisible(true)
    //     }
    // }, [route])

    const handleComplete = async () => {
        // await setViewedOnboarding(true)
        setVisible(false)
        // go to connect
    }

    return (
        <Flex pt='60px' h='full' wrap='wrap' alignContent='flex-start'>
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
                        <ActionButton label='Connect your wallet' onClick={() => {}} />
                        <CallToActionLabel>Get started</CallToActionLabel>
                    </Flex>
                    <Disclaimer />
                </Flex>
            )}
        </Flex>
    )
}
