import { Box, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import { ToggleColorMode } from './ToggleColorMode'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { PropsWithoutRef } from 'react'

type TNavMobile = {
    links: { route: string; title: string }[]
    disconnect: any
}

export const NavMobile = ({ links, disconnect }: PropsWithoutRef<TNavMobile>) => {
    const { push } = useRouter()

    return (
        <Box display={{ md: 'none' }}>
            <Menu>
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            isActive={isOpen}
                            as={IconButton}
                            aria-label='Open Menu'
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            variant='outline'
                        />
                        <MenuList>
                            {links.map(({ route, title }) => (
                                <MenuItem key={title} onClick={() => push(route)}>
                                    {title}
                                </MenuItem>
                            ))}
                            <MenuItem>{disconnect}</MenuItem>
                            <MenuDivider />
                            <HStack px='12.8px' justifyContent={'left'}>
                                <ToggleColorMode />
                            </HStack>
                        </MenuList>
                    </>
                )}
            </Menu>
        </Box>
    )
}
