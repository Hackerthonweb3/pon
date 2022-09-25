import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, HStack, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useAccount, useDisconnect } from 'wagmi'
import { ToggleColorMode } from './ToggleColorMode'
import { NavLink } from './NavLink'
import { NavMobile } from './NavMobile'
import { useOrbis } from '~/hooks'
import { useCeramicSession } from '~/hooks/useCeramicSession'

const displayNonMobile = {
    base: 'none',
    md: 'flex',
}

export const NavBar = () => {
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    const redirectConnected = (route: string) => {
        if (isConnected) return route
        return '/'
    }

    const links = [
        { route: redirectConnected('/profile'), title: 'Profile' },
        { route: redirectConnected('/scan'), title: 'QR code' },
        { route: redirectConnected('/contacts'), title: 'Contacts' },
    ]

    const renderTabs = (
        <>
            {links.map(({ title, route }, index) => (
                <Box key={index} style={{ fontWeight: '800', cursor: 'pointer' }}>
                    <NavLink route={route}>{title}</NavLink>
                </Box>
            ))}
            <Box cursor='pointer' mt={2} mr={2}>
                <a onClick={disconnect as any}>Disconnect</a>
            </Box>
        </>
    )

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <HStack h={{ md: 20, base: 16 }} alignItems='center' justifyContent={'space-between'}>
                <Box style={{ fontWeight: '800', cursor: 'pointer' }}>
                    <NextLink passHref href='/'>
                        <Text color={'gray.400'} fontSize='30px'>
                            Web3 Digital Business Card
                        </Text>
                    </NextLink>
                </Box>
                <HStack display={displayNonMobile} spacing={{ md: 6 }}>
                    {address && renderTabs}
                    <ToggleColorMode />
                </HStack>
                <NavMobile
                    links={links}
                    disconnect={
                        <Box cursor='pointer' mt={2} mr={2}>
                            <a onClick={disconnect as any}>Disconnect</a>
                        </Box>
                    }
                />
            </HStack>
        </Box>
    )
}
