import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
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

const Wrapper = styled.div`
    position: relative;
`
const StyledPanel = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
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
        <Flex justifyContent='center' flexDirection='column' mt='40px'>
            <Wrapper>
                <Swiper
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
                                <StyledPanel>
                                    <Slide item={item} />
                                </StyledPanel>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Wrapper>
            {/* change to connect button */}
            {activeSlide === 2 && (
                <>
                    <Flex flexDirection='column' justifyContent='center'>
                        <CustomConnect />
                        <CallToActionLabel>Get started</CallToActionLabel>
                        <Disclaimer />
                    </Flex>
                </>
            )}
        </Flex>
    )
}
