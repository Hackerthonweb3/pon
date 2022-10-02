import Image from 'next/image'
import styled from 'styled-components'
import { Flex } from '@chakra-ui/react'

export const Slide = ({ item }: any) => {
    return (
        <Flex justifyContent='center' flexDirection='column' textAlign='center'>
            <Image src={item.image} alt='slide' />
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
        </Flex>
    )
}

const Title = styled.div`
    color: #ffffff;
    font-family: 'VT323';
    font-size: 36px;
    margin-top: 44px;
    margin-bottom: 10px;
    text-align: center;
`

const Description = styled.div`
    font-family: 'VT323';
    font-size: 21px;
    text-align: center;
    color: #ffffffb3;
`
