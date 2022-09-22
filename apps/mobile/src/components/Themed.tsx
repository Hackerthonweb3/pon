/** Learn more about Light and Dark modes: https://docs.expo.io/guides/color-schemes/ */

import { Text as DefaultText, View as DefaultView } from 'react-native'

import colors from '../constants/colors'
import useColorScheme from '../hooks/useColorScheme'

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof colors.light & keyof typeof colors.dark,
) {
    const theme = useColorScheme()
    const colorFromProps = props[theme]

    if (colorFromProps) {
        return colorFromProps
    } else {
        return colors[theme][colorName]
    }
}

type ThemeProps = {
    lightColor?: string
    darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps &
    DefaultView['props'] & {
        br?: string
        m?: string
        mb?: string
        ml?: string
        mr?: string
        mt?: string
        p?: string
        pr?: string
        pt?: string
    }

export function Text(props: TextProps & { category?: string }) {
    const { style, lightColor, darkColor, ...otherProps } = props
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}
