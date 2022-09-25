import { ActivityIndicator } from 'react-native'

import { CallToActionLabel } from '../onboarding/CallToActionLabel'
import { CenteredContainer } from './CenteredContainer'

export const Loading = () => {
    return (
        <CenteredContainer>
            <ActivityIndicator size='large' style={{ marginBottom: 50 }} color='#99f0ff' />
            <CallToActionLabel>Loading state...</CallToActionLabel>
        </CenteredContainer>
    )
}
