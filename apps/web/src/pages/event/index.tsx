import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Divider, Box, Stack, Input, Button, Heading, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useAccount } from 'wagmi'

import EventItem from '~/components/Event/EventItem'
import ProfileOneIcon from '~/media/p1.png'
import ProfileTwoIcon from '~/media/p2.png'

const mockContacts = [
    { id: 1, title: 'Chillas Art', icon: ProfileOneIcon, text: 'Creator of Chirazu Art', date: 'OCTOBER 11 - 14', attendees: '2000+ attendees ', where: 'Agora Convention Center' },
    { id: 2, title: 'Diva', icon: ProfileTwoIcon, text: 'digital arts creator', date: 'OCTOBER 11 - 14', attendees: '2000+ attendees ', where: 'Agora Convention Center' },
    { id: 3, title: 'Getting better', icon: ProfileTwoIcon, text: 'The creator of NFT Art community language', date: 'OCTOBER 11 - 14', attendees: '2000+ attendees ', where: 'Agora Convention Center' },
]
export default function Events() {
    const { isConnected } = useAccount()
    const [searchVal, setSearchVal] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
        }
    }, [])

    const handleChange = (event: any) => setSearchVal(event.target.value)

    const data = searchVal
        ? mockContacts.filter(item => item.title.toLowerCase().includes(searchVal.toLowerCase()))
        : mockContacts

    const renderEvents = data.map((item, index) => {
        return (
            <Flex key={index} px={1} flex={1}>
                <Link href={`/event/${item.id}`}>
                    <EventItem {...item} />
                </Link>
                {/* <Divider color='white' opacity='1' orientation='horizontal' /> */}
            </Flex>
        )
    })

    return (
        <Box>
            <div>
                <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} lineHeight={'110%'}>
                    Upcoming Web3 Events
                </Heading>
            </div>
            <Stack as={Box} textAlign={'center'} width='100%' spacing={{ base: 6, md: 8 }} py={{ base: 10, md: 6 }}>
                <Flex direction="column">{renderEvents}</Flex>
            </Stack>
            <Button borderRadius="50%" bgColor="#00A9FF" style={{ position: 'absolute', right: 0, bottom: 0 }}>
                <AddIcon />
            </Button>
        </Box>
    )
}
