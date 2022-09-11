import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: true,
    },
    fonts: {
        heading: `vt323, monospace`,
        body: `vt323, monospace`,
        h4: `vt323, monospace`,
    },
})
