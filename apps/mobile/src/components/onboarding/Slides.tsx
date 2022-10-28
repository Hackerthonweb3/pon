import { Animated, FlatList, StyleProp, View, ViewStyle } from 'react-native'

import { Slide } from './Slide'

interface SlidesProps {
    scrollX: any
    slides: { id: string }[]
    slidesRef: any
    style?: StyleProp<ViewStyle>
    viewableItemsChanged: any
    viewConfig: any
}

export const Slides = ({ scrollX, slides, slidesRef, style, viewableItemsChanged, viewConfig }: SlidesProps) => {
    return (
        <View style={style}>
            <FlatList
                data={slides}
                renderItem={({ item }) => <Slide item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                keyExtractor={item => item.id}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                scrollEventThrottle={32}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
                bounces={false}
                onViewableItemsChanged={viewableItemsChanged}
            />
        </View>
    )
}
