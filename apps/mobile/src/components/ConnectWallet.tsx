import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'

import { useOnboarding } from '../hooks/useOnboarding'
import { Button } from './shared/Button'
import { CenteredContainer } from './shared/CenteredContainer'

export default function ConnectWallet() {
    const { navigate } = useNavigation()
    const { setViewedOnboarding } = useOnboarding()

    const handleResetOnboarding = async () => {
        await setViewedOnboarding(false)
        navigate('Onboarding', { goToStart: true })
    }

    return (
        <CenteredContainer>
            <Title>Connect Wallet</Title>
            <Button onPress={handleResetOnboarding} label='Reset Onboarding' />
        </CenteredContainer>
    )
}

const Title = styled.Text`
    font-family: 'VT323';
    font-size: '28rem';
`
