import Image from 'next/image'
import Link from 'next/link'
import { Box, Flex, Text } from '@chakra-ui/react'

export default function NftGallery({ data }: { data: { id: string; icon: any }[] }) {
    return (
        <Box background='whiteAlpha.50' borderRadius='12px' padding={{ md: 4, base: 2 }}>
            <Flex justifyContent='space-between' px={2}>
                <Text fontWeight={400}>NFT Gallery</Text>
            </Flex>
            <Flex pt={4}>
                {data.map(({ id, icon }, index) => {
                    return (
                        <Box key={index} px={1}>
                            <Link href={`/profile/${id}`}>
                                <a>
                                    <Image src={icon} alt='follower' />
                                </a>
                            </Link>
                        </Box>
                    )
                })}
            </Flex>
        </Box>
    )
}
