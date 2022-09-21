import '@business-card/orbis-sdk-react-native/utils/polyfills_light_crypto'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { OrbisProvider } from './contexts'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <OrbisProvider>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </SafeAreaProvider>
            </OrbisProvider>
        )
    }
}
