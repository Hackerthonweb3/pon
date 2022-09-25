import { indexer } from '@orbisclub/orbis-sdk/lib/indexer-db'
import { useEffect, useRef, useState } from 'react'
import { useOrbis } from '~/hooks'

export default function QRHolder() {
    const timer: { current: NodeJS.Timer | undefined } = useRef()
    const [timestamp] = useState<number>(Date.now())
    // const { orbis } = useOrbis()

    // useEffect(() => {
    // timer.current = setInterval(async () => {
    //     const options = { did: 'did:pkh:eip155:80001:0xe13f6360ecd6df96290d5581fac6ab57b9c5fa56' }
    //     const truncatedTimestamp = Math.floor(timestamp / 1000)
    //     console.log('hello')
    //     const { data } = await indexer
    //         .from('orbis_v_conversations')
    //         .select()
    //         .gt('last_message_timestamp', truncatedTimestamp)
    //         .single()
    // .eq('context', 'web3-business-card')
    // .order('last_message_timestamp', { ascending: false })
    // const { data } = await indexer.from('orbis_v_conversations').select().eq('context', 'web3-business-card')
    // const {data} = orbis.getConversations()
    // .eq('family', 'Web3 Business Card')
    // .contains('tags', '["handshake"]')
    // .filter('timestamp', 'gt', timestamp)
    // console.log('result', data)
    // if (data) {
    //     clearInterval(timer.current)
    //     const conversationId = data.stream_id
    //     const controller = data.creator
    //     if (conversationId) {
    // const handshake = await orbis.getMessages(conversationId)
    // const {
    //     data: [{ content }],
    // } = handshake

    // const handshake = await indexer
    //     .from('streams_mainnet_list_view')
    //     .select()
    //     .eq('family', 'orbis')
    //     .eq('creator', controller)
    //     .contains('tags', '["message"]')
    // .filter('timestamp', 'gt', timestamp)
    // .gt('timestamp', truncatedTimestamp)
    // console.log('handshake', content)
    // const decrypted = await orbis.decryptMessage(content)
    // console.log('decrypted', decrypted)
    // TODO: continue here, must send a new message back to the conversation,
    // the other person receives and verifies the message, then the encounter is created and both add themselves as contacts
    // } else throw new Error('Conversation id not found')
    // }
    // }, 10000)
    // return () => clearInterval(timer.current)
    // }, [timestamp, orbis])

    return <div>Please go to QR code first</div>
}
