import { Flex } from '@chakra-ui/react'
import styled from 'styled-components'

const StyledDisclaimer = styled.div`
    position: relative;
    padding: 0 15%;
    font-family: 'VT323';
    font-size: 14px;
    text-align: center;
    bottom: 0;
    color: #ffffffb2;
    font-weight: 100;
`

const DisclaimerRegular = styled.div``

const DisclaimerStrong = styled.div`
    color: #fff;
    text-decoration: underline;
    text-decoration-color: #fff;
`

export const Disclaimer = () => {
    return (
        <StyledDisclaimer>
            <DisclaimerRegular>By connecting a wallet you agree to </DisclaimerRegular>
            <Flex justifyContent='center'>
                <DisclaimerStrong>the Terms of Use</DisclaimerStrong>
                <DisclaimerRegular>&nbsp; &amp; &nbsp; </DisclaimerRegular>
                <DisclaimerStrong>Privacy Policy</DisclaimerStrong>
            </Flex>
        </StyledDisclaimer>
    )
}
