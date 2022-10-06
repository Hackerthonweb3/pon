import { Flex } from '@chakra-ui/react'
import styled from 'styled-components'

const StyledDisclaimer = styled.span`
    /* position: relative; */
    /* padding: 0 15%; */
    font-family: 'VT323';
    font-size: 16px;
    text-align: center;
    bottom: 0;
    color: #ffffffb2;
    font-weight: 100;
    line-height: normal;
`

const DisclaimerRegular = styled.span`
    white-space: pre-wrap;
`

const DisclaimerStrong = styled.span`
    color: #fff;
    text-decoration: underline;
    text-decoration-color: #fff;
`

export const Disclaimer = () => {
    return (
        <StyledDisclaimer>
            <DisclaimerRegular>
                By connecting a wallet you agree to
                <br /> the&nbsp;
            </DisclaimerRegular>
            <DisclaimerStrong>Terms of Use</DisclaimerStrong>
            <DisclaimerRegular>&nbsp;&amp;&nbsp;</DisclaimerRegular>
            <DisclaimerStrong>Privacy Policy</DisclaimerStrong>
        </StyledDisclaimer>
    )
}
