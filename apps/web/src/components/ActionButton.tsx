import Image from 'next/image'
import { Button } from '@chakra-ui/react'
import styled from 'styled-components'

import buttonDecoration from '../media/svg/button-decoration.svg'

type ButtonProps = { label: string; handleClick: () => void }

const ButtonLabel = styled.div`
    position: 'relative';
    bottom: 50%;
    text-align: 'center';
    font-family: 'VT323';
    font-size: 24px;
    color: #99f0ff;
`

export const ActionButton = ({ label, handleClick }: ButtonProps) => {
    return (
        <Button onClick={handleClick}>
            <Image src={buttonDecoration} alt='' width={390} height={70} />
            <ButtonLabel>{label}</ButtonLabel>
        </Button>
    )
}
