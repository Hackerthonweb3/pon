import Image from 'next/image'
import { Box } from '@chakra-ui/react'
import styled from 'styled-components'

import buttonDecoration from '../media/svg/button-decoration.svg'

type ButtonProps = { label: string; onClick: () => void }

export const ActionButton = ({ label, onClick }: ButtonProps) => {
    return (
        <Box as='button' onClick={onClick} h='110px'>
            <Image src={buttonDecoration} alt='button background' height='110px' width='460px' />
            <ButtonLabel>{label}</ButtonLabel>
        </Box>
    )
}

const ButtonLabel = styled.p`
    text-align: 'center';
    font-family: 'VT323';
    font-size: 32px;
    color: #99f0ff;
    top: -80%;
    position: relative;
`
