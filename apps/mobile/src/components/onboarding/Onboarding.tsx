// import { StatusBar } from 'expo-status-bar'

import { useOnboarding } from '../../hooks/useOnboarding'
import { View } from '../Themed'
import { Button } from '../shared/Button'
import { CenteredContainer } from '../shared/CenteredContainer'
import { FadeInOut } from '../shared/FadeInOut'
import { CallToActionLabel } from './CallToActionLabel'
import { Disclaimer } from './Disclaimer'
import { Paginator } from './Paginator'
import { Slides } from './Slides'
import slides from './slide-data'

export const Onboarding = () => {
    const { currentIndex, scrollTo, scrollX, slidesRef, viewableItemsChanged, viewConfig } = useOnboarding(slides)
    const slidesProps = { slides, slidesRef, scrollX, viewConfig, viewableItemsChanged }
    const showFaded = currentIndex === slides.length - 1

    return (
        <CenteredContainer>
            <Slides style={{ flex: 3 }} {...slidesProps} />
            <View style={{ top: '-18%' }}>
                <Paginator data={slides} scrollX={scrollX} scrollTo={scrollTo} />
            </View>
            <FadeInOut
                visible={showFaded}
                style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: '-2%' }}>
                <Button label='Connect your wallet' style={{ bottom: '23%' }} />
                <CallToActionLabel b='32%'>Get started</CallToActionLabel>
                <Disclaimer />
            </FadeInOut>
        </CenteredContainer>
    )
}
