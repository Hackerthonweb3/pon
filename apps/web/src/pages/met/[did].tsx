import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { indexer } from '@orbisclub/orbis-sdk/lib/indexer-db'
import { Button, Heading, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { useSignMessage, useSignTypedData } from 'wagmi'
import { useCallback, useEffect, useState } from 'react'
import { useOrbis } from '~/hooks'
import AccountModal from '~/components/AccountModal'

// TODO: move this to modal as in figma designs
// TODO: sanity checks, if the profile is not a business-card profile prompt to register
// TODO: add event where you both met

const conversationSchemaCommit = 'k3y52l7qbv1fryezbkk4ber0ves5rl4yzie3zdehwxqvedr0nwiqb889ufjxnihhc'

export interface ProofMessage {
    announcement: string
    event: string
    timestamp: number
    you: {
        name: string
        address: string
        did: string
    }
    met: {
        name: string
        address: string
        did: string
    }
}

export default function Add({ didProfile }: InferGetStaticPropsType<typeof getStaticProps>) {
    // const { orbis } = useOrbis()
    const [timestamp] = useState<number>(Date.now())
    const [message, setMessage] = useState<ProofMessage>()
    const [signature, setSignature] = useState<string>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { signTypedData } = useSignTypedData({
        domain: {
            name: 'Web3 Business Card',
            version: '1',
            chainId: '80001',
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
            // TODO: add secret salt from private ENV variable
        },
        types: {
            Person: [
                { name: 'name', type: 'string' },
                { name: 'address', type: 'address' },
                { name: 'did', type: 'string' },
            ],
            Encounter: [
                { name: 'announcement', type: 'string' },
                { name: 'you', type: 'Person' },
                { name: 'met', type: 'Person' },
                { name: 'event', type: 'string' },
                { name: 'timestamp', type: 'uint256' },
            ],
        },
        value: message,
        onSuccess: async generatedSignature => {
            setSignature(generatedSignature)
            console.log('the signature', generatedSignature)
            onOpen()
            if (message) {
                const content = {
                    recipients: [message?.met.did, message?.you.did],
                    context: 'web3-business-card',
                    // TODO: replace by dynamic event name
                    name: 'EthOnline 2022',
                }
                // const resultA = await orbis.createConversation(content)
                // const resultA = await orbis.createTileDocument(
                //     content,
                //     ['handshake'], // context
                //     conversationSchemaCommit,
                //     'Web3 Digital Business Card',
                // )
                // console.log('resultA', resultA)
                // kjzl6cwe1jw1467modrz2ubownca4s7k8rwjixbh2274bkuzeikox7ozn6t790s
                // const options = { did: 'did:pkh:eip155:80001:0xe13f6360ecd6df96290d5581fac6ab57b9c5fa56' }
                // const result = await orbis.getConversations(options)
                // const result = await indexer
                //     .from('streams_mainnet_list_view')
                //     .select()
                //     .eq('family', 'Web3 Digital Business Card')
                //     .contains('tags', '["orbis"]')
                // .filter('recipients', 'cs', '["' + options.did + '"]')
                // .order('last_message_timestamp', { ascending: false })
                // console.log('resultB', result)
                // TODO: use our schema for encrypted messages
                // const result = await orbis.sendMessage({
                // conversation_id: resultA.doc,
                // TODO: replace by signature + proofMsg stringified
                // body: 'hello',
                // })
                // kjzl6cwe1jw149uh0cz9dqv3wuhpniy7jqmofx3n9l4mdsc9ju4xxp8zievjy9q
                // https://node1.orbis.club/api/v0/streams/kjzl6cwe1jw149uh0cz9dqv3wuhpniy7jqmofx3n9l4mdsc9ju4xxp8zievjy9q?sync=1
                // console.log('result', result)
            }
        },
    })

    useEffect(() => {
        setMessage({
            announcement: 'You are about to add a contact, please check the details:',
            event: 'EthOnline 2022',
            you: {
                name: 'Purple tail fox',
                address: '0x3452912b8d1D5E8bDf18C421c1d60b5A716368d0',
                did: 'did:pkh:eip155:80001:0x3452912b8d1D5E8bDf18C421c1d60b5A716368d0',
            },
            met: {
                name: 'asha',
                address: '0xe13f6360ecd6df96290d5581fac6ab57b9c5fa56',
                did: 'did:pkh:eip155:80001:0xe13f6360ecd6df96290d5581fac6ab57b9c5fa56',
            },
            timestamp: timestamp,
        })
    }, [timestamp])

    if (!didProfile?.data.username) return <Text>Loading...</Text>

    const signEncounter = () => {
        console.log('signing encounter')
        // 1. ALICE eth.sign with BOB's address, timestamp and event (event will be asked for both of them as confirmation)
        signTypedData()
        // TODO: save the signature to localstorage to recover in case connectivity is lost
        // 2. ALICE publishes to ceramic, createConversation and sendMessage
        // 3. BOB app is polling ceramic for new messages
        // 4. BOB when message is received, verify signature and prompt to add second signature from BOB
        // 5. ALICE keeps polling for messages, when it is received, verify signature and create Encounter tile document
        // 6. When both signatures are verified, then both add each other as contact
        // 7. Prompt to mint SBT
    }

    return (
        <VStack spacing='10'>
            <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} lineHeight={'110%'}>
                You`ve met {didProfile.data.username} at EthOnline 2022
            </Heading>
            <Text fontSize='l' mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
                Please sign the message in your wallet to confirm that you have met {didProfile.data.username}
            </Text>
            <Button onClick={signEncounter}>I am ready to sign</Button>
            <AccountModal isOpen={isOpen} onClose={onClose} signature={signature} />
        </VStack>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // TODO: pass the event here
    if (!params?.did) return { notFound: true }

    const response = await indexer.from('orbis_v_profiles').select().eq('did', params.did).single()
    if (response.status !== 200) return { notFound: true }

    return {
        props: { didProfile: response },
        revalidate: 60 * 20, // In seconds: 20 minutes
    }
}
