import { Flex, IconButton, Center, Icon, Divider, Wrap } from '@chakra-ui/react'
import { NavLink } from '../Layout/NavLink'
import EventsIcon from '~/media/svg/event.svg'
import QRCodeIcon from '~/media/qr.svg'
import ContactsIcon from '~/media/svg/cards.svg'
import ProfileIcon from '~/media/svg/account-circle.svg'
import Image from 'next/image'
import { ReactSVG } from 'react-svg'
import { ClipLoader } from 'react-spinners'

const BottomTabs = () => {
    return (
        <Wrap
            pos='fixed'
            bottom='0'
            w='full'
            display={{ md: 'none' }}
            bg='#0000004e'
            zIndex='1'
            borderTop='1px solid #363A45'
            boxShadow='inset 0 1px 0 inset 0px 1px 0px #363A45'
            borderRadius='10px 10px 0 0'>
            {/* <Divider /> */}
            <Flex px={0} pb={1} justify='space-around' w='full'>
                <Center>
                    <NavLink route='/contacts'>
                        <IconButton
                            isActive={location.pathname === '/contacts'}
                            aria-label='contacts'
                            variant='ghost'
                            size='lg'
                            bg='transparent'
                            icon={
                                <ReactSVG
                                    alt='contacts'
                                    beforeInjection={(svg: any) => {
                                        svg.setAttribute(
                                            'style',
                                            `width: 30px; fill: ${
                                                location.pathname === '/contacts' ? '#fff' : '#6D6D6D'
                                            }`,
                                        )
                                    }}
                                    loading={() => <ClipLoader />}
                                    src='icons/contacts.svg'
                                />
                            }
                            _active={{
                                bg: 'transparent',
                            }}
                        />
                    </NavLink>
                </Center>
                <Center>
                    <NavLink route='/qr-code'>
                        <IconButton
                            isActive={location.pathname === '/qr-code'}
                            aria-label='qr-code'
                            variant='ghost'
                            size='lg'
                            bg='transparent'
                            icon={
                                <ReactSVG
                                    alt='qr-code'
                                    beforeInjection={(svg: any) => {
                                        svg.setAttribute(
                                            'style',
                                            `width: 30px; fill: ${
                                                location.pathname === '/qr-code' ? '#fff' : '#6D6D6D'
                                            }`,
                                        )
                                    }}
                                    loading={() => <ClipLoader />}
                                    src='icons/qr-code.svg'
                                />
                            }
                            _active={{
                                bg: 'transparent',
                            }}
                        />
                    </NavLink>
                </Center>
                <Center>
                    <NavLink route='/profile'>
                        <IconButton
                            isActive={location.pathname === '/profile'}
                            aria-label='profile'
                            variant='ghost'
                            size='lg'
                            bg='transparent'
                            icon={
                                <ReactSVG
                                    alt='profile'
                                    beforeInjection={(svg: any) => {
                                        svg.setAttribute(
                                            'style',
                                            `width: 30px; fill: ${
                                                location.pathname === '/profile' ? '#fff' : '#6D6D6D'
                                            }`,
                                        )
                                    }}
                                    loading={() => <ClipLoader />}
                                    src='icons/profile.svg'
                                />
                            }
                            _active={{
                                bg: 'transparent',
                            }}
                        />
                    </NavLink>
                </Center>
            </Flex>
        </Wrap>
    )
}

export default BottomTabs
