import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRef, useState } from 'react'
import { Animated, FlatList } from 'react-native'

import { SlideItemData } from '../components/onboarding/slide-data'

export const useOnboarding = (slides: SlideItemData[]) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const scrollX = useRef(new Animated.Value(0)).current
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
    const slidesRef = useRef(null)

    const scrollTo = async (index: number) => {
        if (index === slides.length - 1) {
            try {
                await AsyncStorage.setItem('@viewedOnboarding', 'true')
            } catch (error) {
                console.log('Error @setItem', error)
            }
        }
        const currentRef = slidesRef.current as unknown as FlatList
        currentRef.scrollToIndex({ index })
    }

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    return { currentIndex, scrollTo, scrollX, slidesRef, viewableItemsChanged, viewConfig }
}
