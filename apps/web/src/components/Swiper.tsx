import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import SwiperClass from 'swiper/types/swiper-class'
import styled from 'styled-components'
import { Box } from '@chakra-ui/react'

import { Slide } from './Onboarding/Slide'

import 'swiper/css'
import 'swiper/css/pagination'

const Wrapper = styled(Box)`
    position: relative;
`
const StyledPanel = styled.div`
    height: 100%;
    position: relative;
    width: 100%;
`
export default function Gallery({ items }: any) {
    const swiperRef = useRef<SwiperClass>()
    const ref = useRef<HTMLDivElement>()
    const [currentSlide, setCurrentSlide] = useState(null as any)

    console.log(currentSlide)

    return (
        <Wrapper ref={ref}>
            <Swiper
                onSwiper={swiper => {
                    swiperRef.current = swiper
                    setCurrentSlide(swiper)
                }}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}>
                {items.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <StyledPanel>
                            <Slide item={item} />
                        </StyledPanel>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Wrapper>
    )
}
