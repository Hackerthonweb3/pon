import '@business-card/orbis-sdk-react-native/utils/polyfills_light_crypto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

import ConnectWallet from './components/ConnectWallet'
import { View } from './components/Themed'
import { Onboarding } from './components/onboarding/Onboarding'
import colors from './constants/colors'
// import { OrbisProvider } from './contexts'
import useCachedResources from './hooks/useCachedResources'

// import Navigation from './navigation'

const Loading = () => {
    return (
        <View>
            <ActivityIndicator size='large' />
        </View>
    )
}

export default function App() {
    const [loading, setLoading] = useState(true)
    const [viewedOnboarding, setViewedOnboarding] = useState(false)

    const isLoadingComplete = useCachedResources()

    const checkOnboarding = async () => {
        try {
            const value = await AsyncStorage.getItem('@viewedOnboarding')
            if (value) setViewedOnboarding(true)
        } catch (error) {
            console.log('Error @checkOnboarding', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkOnboarding()
    }, [])

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            // <OrbisProvider>
            <StyledSafeAreaView>
                {loading ? <Loading /> : viewedOnboarding ? <ConnectWallet /> : <Onboarding />}
                {/* <Navigation colorScheme={colorScheme} /> */}
            </StyledSafeAreaView>
            // </OrbisProvider>
        )
    }
}

export const StyledSafeAreaView = styled.SafeAreaView`
    background-color: ${colors.dark.background};
    flex: 1;
`
