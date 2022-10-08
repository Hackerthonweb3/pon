import { Center } from '@chakra-ui/react'
import styled from 'styled-components'

type ButtonProps = { label: string; onClick: any }

export const ActionButton = ({ label, onClick }: ButtonProps) => {
    return (
        <Center as='button' onClick={onClick}>
            <ButtonLabel>{label}</ButtonLabel>
        </Center>
    )
}

const ButtonLabel = styled.div`
    font-family: 'VT323';
    font-size: 28px;
    line-height: 200%;
    color: #99f0ff;
    background: center center / 100% 100% no-repeat url('/button-decoration.svg');
    height: 62px;
    width: 380px;
`
