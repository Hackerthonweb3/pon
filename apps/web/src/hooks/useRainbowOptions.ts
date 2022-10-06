import { useColorModeValue } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { chains } from '~/lib'
import { ThemeOptions } from '@rainbow-me/rainbowkit/dist/themes/baseTheme.d'

type Blurs = 'large' | 'small' | 'none'

export const useRainbowOptions = () => {
    const themeOptions: ThemeOptions = { overlayBlur: 'large' as Blurs }
    const theme: any = useColorModeValue(lightTheme(themeOptions), darkTheme(themeOptions))

    const rainbowOptions = {
        appName: 'PoN Web3 Digital Business Card',
        chains,
        theme,
    }

    return rainbowOptions
}
