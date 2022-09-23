// import { StatusBar } from 'expo-status-bar'

import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { useOnboarding } from '../../hooks/useOnboarding'
import { useSlides } from '../../hooks/useSlides'
import { Button } from '../shared/Button'
import { FadeInOut } from '../shared/FadeInOut'
import { CallToActionLabel } from './CallToActionLabel'
import { Disclaimer } from './Disclaimer'
import { Paginator } from './Paginator'
import { Slides } from './Slides'
import slides from './slide-data'

export const Onboarding = ({ route }: any) => {
    const { setViewedOnboarding } = useOnboarding()
    const [visible, setVisible] = useState(true)
    const { currentIndex, scrollTo, scrollX, slidesRef, viewableItemsChanged, viewConfig } = useSlides(slides)
    const slidesProps = { slides, slidesRef, scrollX, viewConfig, viewableItemsChanged }
    const showFaded = currentIndex === slides.length - 1
    const { navigate } = useNavigation()

    useEffect(() => {
        if (route.params?.goToStart) {
            setVisible(true)
            scrollTo(0)
        }
    }, [route])

    const handleComplete = async () => {
        await setViewedOnboarding(true)
        setVisible(false)
        navigate('ConnectWallet')
    }

    return (
        <FadeInOut style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} visible={visible}>
            <Slides style={{ flex: 3 }} {...slidesProps} />
            <View style={{ top: '-19.5%' }}>
                <Paginator data={slides} scrollX={scrollX} scrollTo={scrollTo} />
            </View>
            <FadeInOut
                visible={showFaded}
                durationIn={400}
                durationOut={150}
                style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: '3%' }}>
                <Button label='Connect your wallet' style={{ bottom: '15%' }} onPress={handleComplete} />
                <CallToActionLabel b='25%'>Get started</CallToActionLabel>
                <Disclaimer />
            </FadeInOut>
        </FadeInOut>
    )
}
