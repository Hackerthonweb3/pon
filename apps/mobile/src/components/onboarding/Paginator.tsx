import { Animated, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native'

export const Paginator = ({ data, scrollX, scrollTo }: any) => {
    const { width } = useWindowDimensions()

    return (
        <View style={styles.container}>
            {data.map((_: any, i: number) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                })

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#D9D9D9', '#219EBC', '#D9D9D9'],
                    extrapolate: 'clamp',
                })

                return (
                    <TouchableOpacity key={i.toString()} activeOpacity={0.6} onPress={() => scrollTo(i)}>
                        <Animated.View style={[styles.dot, { width: dotWidth, backgroundColor }]} />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 64,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#493d8a',
        marginHorizontal: 8,
    },
})
