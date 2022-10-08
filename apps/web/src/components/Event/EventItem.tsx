import Image from 'next/image'
import { Box, Heading, Text, Divider, Flex } from '@chakra-ui/react'

import ShareIcon from '~/media/svg/share.svg'
import LikeIcon from '~/media/svg/like.svg'


export default function EventItem({ icon, title, text, where, date, attendees }: any) {
    return (
        <Flex
            p={4}
            background='whiteAlpha.50'
            _hover={{
                bg: 'whiteAlpha.300',
            }}
            flex={1}
        >
            <Flex>
                {icon && <Image src={icon} width='80px' height='80px' alt='profile' />}
            </Flex>
            <Flex direction="column" justify="space-evenly" flex={1}>
                <Flex>
                    <Box textAlign='left' pl={icon ? 4 : 0} marginTop='auto' marginBottom='auto'>
                        <Text color="#3FCAFF">{date}</Text>
                        <Heading fontSize={{ base: 'md', sm: 'l', md: 'xl' }}>{title}</Heading>
                        <Text color={'gray.400'} fontSize={{ base: 'md', sm: 'sm', md: 'lg' }} fontWeight={400}>
                            {where}
                        </Text>
                        <Text color={'gray.600'}>{attendees}</Text>
                    </Box>
                </Flex>
                <Flex justify="end">
                    <Image src={ShareIcon} alt='share' />
                    <Image src={LikeIcon} alt='like' />
                </Flex>
            </Flex>
        </Flex>
    )
}
