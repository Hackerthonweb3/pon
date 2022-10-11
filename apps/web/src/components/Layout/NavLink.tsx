import NextLink from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'

export const NavLink = (props: { route: string; children: React.ReactNode }) => {
    const { children, route, ...rest } = props

    return (
        <NextLink passHref href={route}>
            <ChakraLink
                {...rest}
                px={2}
                py={2}
                rounded={'md'}
                _hover={{
                    textDecoration: 'none',
                }}>
                {children}
            </ChakraLink>
        </NextLink>
    )
}
