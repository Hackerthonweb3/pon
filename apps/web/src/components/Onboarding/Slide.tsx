import Image from 'next/image'
import styled from 'styled-components'
import { Box, Flex } from '@chakra-ui/react'
import { SlideItemData } from './slide-data'

export const Slide = ({ item }: { item: SlideItemData }) => {
    return (
        <Flex justifyContent='center' flexDirection='column' textAlign='center'>
            <Image priority src={item.image} alt='slide' />
            <Box p='0 5%'>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
            </Box>
        </Flex>
    )
}

const Title = styled.div`
    color: #ffffff;
    font-family: 'VT323';
    font-size: 32px;
    text-align: center;
    white-space: pre-wrap;
    margin-top: 30px;
    margin-bottom: 10px;
    line-height: normal;
`

const Description = styled.div`
    font-family: 'VT323';
    font-size: 18px;
    text-align: center;
    color: #ffffffb3;
    line-height: normal;
`
