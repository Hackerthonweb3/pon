import { Box, Flex, Text, Image, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import { Title, SubTitle, Note, NoteMono } from './StyledText'

export default function NftGallery({ address }: { address: string }) {
    useEffect(() => {
        getNFTs()
    }, [])

    const [NftList, setNftList] = useState<any>()

    const [currentGallery, setCurrentGallery] = useState('NFTs')

    const getNFTs = () => {
        const config = {
            apiKey: '9YaZvhzbpfnZdiYbHdKnfzXEfiCchGll',
            network: Network.ETH_MAINNET,
        }
        const alchemy = new Alchemy(config)

        const main = async () => {
            // Get all NFTs
            const nfts = await alchemy.nft.getNftsForOwner(address)
            // Print NFTs
            console.log(nfts.ownedNfts)
            setNftList(nfts.ownedNfts)
        }

        const runMain = async () => {
            try {
                await main()
                return
            } catch (error) {
                console.log(error)
                return
            }
        }

        runMain()
    }

    return (
        <Box background='whiteAlpha.50' borderRadius='12px' my={10}>
            <Flex justifyContent='flex-start' px={2}>
                <Heading
                    onClick={() => {
                        setCurrentGallery('NFTs')
                    }}
                    fontWeight={900}
                    size='lg'
                    mb={2}
                    color={currentGallery == 'NFTs' ? 'black' : '#B8B8B8'}>
                    NFTs
                </Heading>
                <Heading
                    onClick={() => {
                        setCurrentGallery('SBTs')
                    }}
                    fontWeight={900}
                    size='lg'
                    ml={6}
                    mb={2}
                    color={currentGallery != 'NFTs' ? 'black' : '#B8B8B8'}>
                    Soul Bound Tokens
                </Heading>
            </Flex>
            <Box borderLeft='2px solid gray' borderRight='2px solid gray' overflowX='scroll'>
                {currentGallery == 'NFTs' ? (
                    <Flex direction='row' justifyContent='center' w='max'>
                        {NftList?.map((nft: any, index: number) => {
                            return (
                                <Box w='150px' key={index} m={2}>
                                    <Image
                                        boxSize='150px'
                                        alt='nft image'
                                        src={nft.media[0].thumbnail ? nft.media[0].thumbnail : nft.media[0].gateway}
                                        borderRadius={16}
                                    />
                                    <Note>{nft.title}</Note>
                                </Box>
                            )
                        })}
                    </Flex>
                ) : (
                    <Text>SBTs to be implemented</Text>
                )}
            </Box>
        </Box>
    )
}
