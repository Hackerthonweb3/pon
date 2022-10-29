import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'
import { Title, SubTitle, Note, NoteMono } from './StyledText'

export default function NftGallery({ address }:string) {

    useEffect(() => { 
        getNFTs()
    }, [])

    const [NftList, setNftList] = useState()

    const getNFTs = () => {
        const config = {
            apiKey: "9YaZvhzbpfnZdiYbHdKnfzXEfiCchGll",
            network: Network.ETH_MAINNET,
          };
          const alchemy = new Alchemy(config);
          
          const main = async () => {
            // Get all NFTs
            const nfts = await alchemy.nft.getNftsForOwner(address);
            // Print NFTs
              console.log(nfts.ownedNfts);
              setNftList(nfts.ownedNfts)
          };
          
          const runMain = async () => {
            try {
                await main();
                return;
            } catch (error) {
                console.log(error);
                return;
            }
          };
          
          runMain();
    }

    return (
        <Box background='whiteAlpha.50' borderRadius='12px'>
            <Flex justifyContent='space-between' px={2}>
                <Text fontWeight={400}>NFTs</Text>
            </Flex>
            <Box overflowX="scroll">
                <Flex pt={4} direction="row" justifyContent="center" w="max">
                    {
                        NftList?.map((nft, index) => { 
                            return (
                                <Box key={index} p={2}>
                                    <Image boxSize='150px' src={nft.media[0].thumbnail? nft.media[0].thumbnail : nft.media[0].gateway} borderRadius={16}/>
                                    <Note>{nft.title}</Note>
                                </Box>
                            )
                        })
                    }
                </Flex>
            </Box>
        </Box>
    )
}
