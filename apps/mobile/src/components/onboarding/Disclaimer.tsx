import styled from 'styled-components/native'

export const Disclaimer = () => {
    return (
        <StyledDisclaimer>
            <DisclaimerRegular>By connecting a wallet you agree to the </DisclaimerRegular>
            <DisclaimerStrong>Terms of Use</DisclaimerStrong>
            <DisclaimerRegular> &amp; </DisclaimerRegular>
            <DisclaimerStrong>Privacy Policy</DisclaimerStrong>
        </StyledDisclaimer>
    )
}

const StyledDisclaimer = styled.Text`
    position: relative;
    padding: 0 25%;
    font-family: 'VT323';
    font-size: 14%;
    text-align: center;
    bottom: 0;
    color: #ffffffb2;
    font-weight: 100;
`

const DisclaimerRegular = styled.Text``

const DisclaimerStrong = styled.Text`
    color: #fff;
    text-decoration: underline;
    text-decoration-color: #fff;
`
