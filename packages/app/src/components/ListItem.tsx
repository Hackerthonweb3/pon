import Image from 'next/image'
import { Box, Heading, Text, Divider } from '@chakra-ui/react'

export default function ListItem({ icon, title, text }: any) {
    return (
        <>
            <Box
                display='flex'
                p={4}
                background='whiteAlpha.50'
                _hover={{
                    bg: 'whiteAlpha.300',
                }}>
                {icon && <Image src={icon} width='80px' height='80px' alt='profile' />}
                <Box textAlign='left' pl={icon ? 4 : 0} marginTop='auto' marginBottom='auto'>
                    <Heading fontSize={{ base: 'md', sm: 'l', md: 'xl' }}>{title}</Heading>
                    <Text color={'gray.400'} fontSize={{ base: 'md', sm: 'sm', md: 'lg' }} fontWeight={400}>
                        {text}
                    </Text>
                </Box>
            </Box>
        </>
    )
}
