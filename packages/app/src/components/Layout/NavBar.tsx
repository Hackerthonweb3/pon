import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, HStack, Flex, useColorModeValue } from '@chakra-ui/react'
import { useAccount, useDisconnect } from 'wagmi'
import { ToggleColorMode } from './ToggleColorMode'
import { NavLink } from './NavLink'
import { NavMobile } from './NavMobile'
import LogoSvg from '~/media/logo.svg'
import { useOrbis } from '~/hooks'

const links = [
    { route: '/profile', title: 'Profile' },
    { route: '/contacts', title: 'Contacts' },
]
const displayNonMobile = {
    base: 'none',
    md: 'flex',
}

export const NavBar = () => {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { orbis } = useOrbis()
    const router = useRouter()

    const isHomePage = router.pathname === '/'

    function handleDisconnect() {
        async function logoutOrbis() {
            let res = await orbis.logout()
            console.log('logout orbis')
            console.log(res)
        }

        disconnect()
        logoutOrbis()
        router.push('/')
    }
    const renderDisconnect = address && (
        <Box cursor='pointer' mt={2} mr={2}>
            <a onClick={handleDisconnect}>Disconnect</a>
        </Box>
    )

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            {!isHomePage && (
                <HStack h={{ md: 20, base: 16 }} alignItems='center' justifyContent={'space-between'}>
                    <Box style={{ fontWeight: '800', cursor: 'pointer' }}>
                        <NextLink passHref href='/'>
                            <Image height='50px' width='60px' src={LogoSvg} alt='logo' />
                        </NextLink>
                    </Box>
                    <HStack display={displayNonMobile} spacing={{ md: 6 }}>
                        <>
                            {links.map(({ title, route }, index) => (
                                <Box key={index} style={{ fontWeight: '800', cursor: 'pointer' }}>
                                    <NavLink route={route}>{title}</NavLink>
                                </Box>
                            ))}
                            {renderDisconnect}
                            <ToggleColorMode />
                        </>
                    </HStack>
                    <NavMobile links={links} disconnect={renderDisconnect} />
                </HStack>
            )}
        </Box>
    )
}
