import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export const FadeInOut = ({ children, style, visible }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: visible ? 1 : 0,
            duration: visible ? 700 : 350,
            useNativeDriver: true,
        }).start()
    }, [fadeAnim, visible])

    return <Animated.View style={{ ...style, opacity: fadeAnim }}>{children}</Animated.View>
}
