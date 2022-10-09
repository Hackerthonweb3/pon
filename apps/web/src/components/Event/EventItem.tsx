import Image from 'next/image'
import { Box, Heading, Text, Divider, Flex } from '@chakra-ui/react'
import styles from '~/App.module.css';

import ShareIcon from '~/media/svg/share.svg'
import LikeIcon from '~/media/svg/like.svg'

export default function EventItem(props: any) {
    return (
        <Flex
            p={4}
            background='whiteAlpha.50'
            _hover={{
                bg: 'whiteAlpha.300',
            }}
            flex={1}
            gap={5}
        >
            <Flex>
                {props.image ? <Image src={props.image} width='80px' height='80px' alt='profile' /> : <Box style={{ width: '80px', height: '80px' }} className={styles.banner} />}
            </Flex>
            <Flex direction="column" justify="space-evenly" flex={1}>
                <Flex>
                    <Box textAlign='left' pl={props.image ? 4 : 0} marginTop='auto' marginBottom='auto'>
                        <Text color="#3FCAFF">{props.date?.day} - {props.date?.ending}</Text>
                        <Heading fontSize={{ base: 'md', sm: 'l', md: 'xl' }}>{props.title}</Heading>
                        <Text color={'gray.400'} fontSize={{ base: 'md', sm: 'sm', md: 'lg' }} fontWeight={400}>
                            {props.location}
                        </Text>
                        <Text color={'gray.600'}>2000+ attendees</Text>
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
