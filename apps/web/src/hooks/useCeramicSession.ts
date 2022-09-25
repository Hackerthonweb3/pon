import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { useOrbis } from './useOrbis'

export const useCeramicSession = () => {
    const { push } = useRouter()
    const { address: connectedAddress } = useAccount()
    const { connect } = useOrbis()

    const onConnect = async ({ address }: any) => {
        const lowerCaseAddress = address?.toLowerCase()

        const ceramicPreviousSession = localStorage.getItem(`ceramic-session-${lowerCaseAddress}`)
        if (!ceramicPreviousSession) {
            console.log('Ceramic session not found, creating a new one')
            await connect()
        } else {
            console.log('Ceramic session found, restoring')
            localStorage.setItem('ceramic-session', ceramicPreviousSession)
        }
    }

    const onDisconnect = () => {
        // don't remove this item, rename to the account and reuse the same as lit-auth-signature
        const ceramicSession = localStorage.getItem('ceramic-session')
        if (ceramicSession) {
            const lowerCaseAddress = connectedAddress?.toLowerCase()
            localStorage.setItem(`ceramic-session-${lowerCaseAddress}`, ceramicSession)
            localStorage.removeItem('ceramic-session')
            console.log('Ceramic session saved for address', lowerCaseAddress)
        }
        push('/')
    }

    return { onConnect, onDisconnect }
}
