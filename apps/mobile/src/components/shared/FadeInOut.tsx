import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export const FadeInOut = ({ children, style, visible, durationIn, durationOut }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: visible ? 1 : 0,
            duration: visible ? durationIn ?? 700 : durationOut ?? 250,
            useNativeDriver: true,
        }).start()
    }, [fadeAnim, visible])

    return <Animated.View style={{ ...style, opacity: fadeAnim }}>{children}</Animated.View>
}
