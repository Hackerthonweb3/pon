import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Divider, Box, Stack, Input, Button, Heading, Flex, Text, VStack, HStack } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import ListItem from '~/components/ListItem'
import Header from '~/components/Event/Header'
import ProfileOneIcon from '~/media/p1.png'
import ProfileTwoIcon from '~/media/p2.png'
import AlarmSvg from '~/media/svg/alarm.svg'
import LocationSvg from '~/media/svg/location.svg'
import { useOrbis } from '~/hooks'

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
                icon: AlarmSvg,
            },
            {
                heading: 'Location',
                field: 'location',
                icon: LocationSvg,
            }
        ]
    },
    // {
    //     heading: '',

    // },
    {
        heading: 'About this event',
        field: 'summary'
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
    const router = useRouter()
    const id = router.query.id as string
    const { orbis, profile } = useOrbis()
    const { isConnected } = useAccount()
    const [attendees, setAttendees] = useState<any>([])
    const [event, setEvent] = useState<any>();

    const getEvent = useCallback(async (eventId: string) => {
        /* eslint-disable no-eval */
        const groups = await orbis.getGroup(eventId);
        return groups.data;
    }, []);

    const getAtendees = useCallback(async (eventId: string) => {
        const members = await orbis.getGroupMembers(eventId);
        console.log(members, 'members');
        return members.data.map((member: any) => {
            return { did: member.profile_details.did, ...member.profile_details.profile }
        });
    }, []);

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
        }
    }, [])

    useEffect(() => {
        if (id) {
            getAtendees(id).then((attendees: any) => {
                setAttendees(attendees);
            })
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            getEvent(id).then((event) => {
                let eventFormatted: any = {}
                try {
                    eventFormatted = JSON.parse(event.content?.description || "{}");
                } catch (e) {
                    console.debug(e)
                }
                eventFormatted.id = event.stream_id;
                eventFormatted.date = `${eventFormatted.date.day} - ${eventFormatted.date.ending}`;
                eventFormatted.intro = `We would be pleased for you to attend ${eventFormatted.title} in ${eventFormatted.location}`;
                eventFormatted.count_members = event.count_members;
                setEvent(eventFormatted);
            })
        }
    }, [getEvent, id])

    const renderContacts = attendees.map((item: any) => {
        return (
            <Box key={item.did} px={1}>
                <Link href={`/profile/${item.did}`}>
                    <a>
                        <ListItem icon={item.pfp} title={item.username} text={item.description} />
                    </a>
                </Link>
                <Divider color='white' opacity='1' orientation='horizontal' />
            </Box>
        )
    })

    return (
        <Box>
            {event ? (
                <>
                    <Header intro={event.intro} title={event.title} date={event.date} id={event.id} />
                    <VStack spacing='24px'>
                        {layout.map((section) => (
                            <Box key={section.heading} borderRadius={11} bg='#353844' width="100%" py={5} px={7}>
                                <Heading size="lg" mb="3">{section.heading}</Heading>
                                <Text>{event[section.field]}</Text>
                                <Flex direction="column" justify="center">
                                    {section.subsections?.map(subsection => (
                                        <HStack alignItems="flex-start" direction="row" key={subsection.heading}>
                                            <Flex flexBasis="10%" justify="center">
                                                <Image src={subsection.icon} alt={subsection.heading} />
                                            </Flex>
                                            <Flex direction="column">
                                                <Heading as="h3" size="md">{subsection.heading}</Heading>
                                                <Text>{event[subsection.field]}</Text>
                                            </Flex>

                                        </HStack>
                                    ))}
                                </Flex>

                            </Box>
                        ))
                        }
                    </VStack >
                    <Stack as={Box} textAlign={'center'} width='100%' spacing={{ base: 6, md: 8 }} py={{ base: 10, md: 6 }} style={{ paddingBottom: '115px' }}>
                        {/* <Box>
                            <Input value={searchVal} variant='filled' onChange={handleChange} placeholder='Search by Name' />
                        </Box> */}
                        <Heading size="lg">Attendees {event.count_members}</Heading>
                        <Flex>{renderContacts}</Flex>
                    </Stack>
                </>
            ) : null}
        </Box >
    )
}

// export const getStaticProps = async ({ params }) => {
//     const id = !params?.id || '';
//     // TODO: pass the event here
//     if (!params?.id) return { id }
// }
