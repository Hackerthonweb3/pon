import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Divider, Box, Stack, Input, Button, Heading, Flex, Text, VStack } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import ListItem from '~/components/ListItem'
import Header from '~/components/Event/Header'
import ProfileOneIcon from '~/media/p1.png'
import ProfileTwoIcon from '~/media/p2.png'
import ScanSvg from '~/media/scan.svg'

const event = {
    id: 1,
    summary: {
        intro: 'We would be pleased for you to attend DEVCON VI in Bogota, Colombia',
        title: 'DEVCON BOGOTA',
        summary: 'DEVCON VI @ Bogota, Colombia',
        date: 'OCTOBER 11 - 14 ',
    },
    description: 'Devcon is an intensive introduction for new Ethereum explorers. Hosted to edu... ',
    hosts: 'The Ethereum Foundation is a non-profit that supports the Ethereum ecosyste...',
    date: 'Tuesday, October 11, 2022 @ 11 AM - Friday, October 14, 2022 @ 9 PM',
    location: 'Agora Bogota Convention Center - Ac. 24 #38-47, Bogota, Colombia',
}

const layout = [
    {
        heading: 'When and Where',
        field: 'desription',
        subsections: [
            {
                heading: 'Date and time',
                field: 'date',
            },
            {
                heading: 'Location',
                field: 'location',
            }
        ]
    },
    // {
    //     heading: '',

    // },
    {
        heading: 'About this event',
        field: 'description'
    },
    {
        heading: 'About Our Hosts',
        field: 'hosts',
    },

]

const mockContacts = [
    { id: 1, title: 'Chillas Art', icon: ProfileOneIcon, text: 'Creator of Chirazu Art' },
    { id: 2, title: 'Diva', icon: ProfileTwoIcon, text: 'digital arts creator' },
    { id: 3, title: 'Getting better', icon: ProfileTwoIcon, text: 'The creator of NFT Art community language' },
]
export default function Event() {
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

    const renderContacts = data.map((item, index) => {
        return (
            <Box key={index} px={1}>
                <Link href={`/profile/${item.id}`}>
                    <a>
                        <ListItem {...item} />
                    </a>
                </Link>
                <Divider color='white' opacity='1' orientation='horizontal' />
            </Box>
        )
    })

    return (
        <Box>
            <Header intro={event.summary.intro} title={event.summary.title} date={event.summary.date} summary={event.summary.text} id={event.id} />
            <VStack spacing='24px'>
                {layout.map((section) => (
                    <Box key={section.heading} borderRadius={11} bg='#353844' width="100%" py={5} px={7}>
                        <Heading>{section.heading}</Heading>
                        <Text>{event[section.field]}</Text>
                        <Flex direction={{ base: 'row', xs: 'column' }} justifyContent="center">
                            {section.subsections?.map(subsection => (
                                <VStack>
                                    <Heading>{subsection.heading}</Heading>
                                    <Text>{event[subsection.field]}</Text>
                                </VStack>
                            ))}
                        </Flex>

                    </Box>
                ))}
            </VStack>
            <Stack as={Box} textAlign={'center'} width='100%' spacing={{ base: 6, md: 8 }} py={{ base: 10, md: 6 }}>
                <Box>
                    <Input value={searchVal} variant='filled' onChange={handleChange} placeholder='Search by Name' />
                </Box>
                <Heading>Attendees {data.length}</Heading>
                <Flex>{renderContacts}</Flex>
            </Stack>
        </Box>
    )
}
