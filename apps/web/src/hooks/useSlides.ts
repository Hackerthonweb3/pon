import { useRef, useState } from 'react'

import { SlideItemData } from '../components/onboarding/slide-data'

export const useSlides = (slides: SlideItemData[]) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const scrollX = useRef(new Animated.Value(0)).current
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
    const slidesRef = useRef(null)

    const scrollTo = async (index: number) => {
        const currentRef = slidesRef.current as unknown as FlatList
        currentRef?.scrollToIndex({ index })
    }

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    return { currentIndex, scrollTo, scrollX, slidesRef, viewableItemsChanged, viewConfig }
}
