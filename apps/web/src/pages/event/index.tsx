import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Divider, Box, Stack, Input, Button, Heading, Flex } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import ListItem from '~/components/ListItem'
import ProfileOneIcon from '~/media/p1.png'
import ProfileTwoIcon from '~/media/p2.png'
import ScanSvg from '~/media/scan.svg'

const mockContacts = [
    { id: 1, title: 'Chillas Art', icon: ProfileOneIcon, text: 'Creator of Chirazu Art' },
    { id: 2, title: 'Diva', icon: ProfileTwoIcon, text: 'digital arts creator' },
    { id: 3, title: 'Getting better', icon: ProfileTwoIcon, text: 'The creator of NFT Art community language' },
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
            <Flex key={index} px={1}>
                <Link href={`/event/${item.id}`}>
                    <a>
                        <ListItem {...item} />
                    </a>
                </Link>
                <Divider color='white' opacity='1' orientation='horizontal' />
            </Flex>
        )
    })

    return (
        <Box>
            <div>
                <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} lineHeight={'110%'}>
                    Your Events
                </Heading>
            </div>
            <Stack as={Box} textAlign={'center'} width='100%' spacing={{ base: 6, md: 8 }} py={{ base: 10, md: 6 }}>
                <Box>
                    <Input value={searchVal} variant='filled' onChange={handleChange} placeholder='Search by Name' />
                </Box>
                <Heading>All Events ({data.length})</Heading>
                <Flex>{renderEvents}</Flex>
            </Stack>
        </Box>
    )
}
