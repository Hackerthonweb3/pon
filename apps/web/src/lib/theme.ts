import 'focus-visible/dist/focus-visible'
import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: true,
    },
    fonts: {
        heading: `inter, sans-serif`,
        body: `inter, sans-serif`,
        h4: `inter, sans-serif`,
    },
    styles: {
        global: {
            'html, body': {
                height: '100%',
                backgroundColor: '#FFFFFF',
            },
            ', #__next, .css-0': {
                height: '100%',
            },
        },
    },
})
