import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react'

export const ToggleColorMode = () => {
    const { toggleColorMode } = useColorMode()
    const color = useColorModeValue(<MoonIcon color='blue.700' />, <SunIcon color='orange.200' />)
    return (
        <Button onClick={toggleColorMode} variant={'outline'}>
            {color}
        </Button>
    )
}
