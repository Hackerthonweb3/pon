import { useColorModeValue } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { chains } from '~/lib'

type Blurs = 'large' | 'small' | 'none'

export const useRainbowOptions = () => {
    const themeOptions = { overlayBlur: 'large' as Blurs }
    const theme: any = useColorModeValue(lightTheme(themeOptions), darkTheme(themeOptions))

    const rainbowOptions = {
        appName: 'PoN Web3 Digital Business Card',
        chains,
        theme,
    }

    return rainbowOptions
}
