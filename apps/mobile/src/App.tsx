import '@business-card/orbis-sdk-react-native/utils/polyfills_light_crypto'

import { Navigation } from './components'
import { OnboardingProvider } from './contexts/OnboardingContext'
// import { OrbisProvider } from './contexts'
import useCachedResources from './hooks/useCachedResources'

export default function App() {
    const isLoadingComplete = useCachedResources()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            // <OrbisProvider>
            <OnboardingProvider>
                <Navigation />
            </OnboardingProvider>
            // </OrbisProvider>
        )
    }
}
