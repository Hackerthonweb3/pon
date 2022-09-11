import { useAccount } from 'wagmi'
import { useOrbis } from '~/hooks'

import type { NextPage } from 'next'

const CeramicSessionComponent: NextPage = () => {
    const { connect } = useOrbis()
    const { address: connectedAddress } = useAccount({
        onConnect: async ({ address: newAddress }) => {
            const sessionRestored = tryRestoreSession(newAddress)
            console.log('sessionRestored', sessionRestored)
            if (!sessionRestored) {
                console.log('orbisConnected on wallet connect?')
                const orbisConnected = await connect()
                console.log('orbisConnected on wallet connect?', orbisConnected)
            }
        },
        onDisconnect: () => saveCeramicSession(),
    })

    // TODO: move session management to hooks
    // TODO: connect orbis when session is restored and load profile
    const saveCeramicSession = () => {
        // don't remove this item, rename to the account and reuse the same as lit-auth-signature
        const ceramicSession = localStorage.getItem('ceramic-session')
        if (ceramicSession) {
            const lowerCaseAddress = connectedAddress?.toLowerCase()
            console.log('saving ceramic session for address', lowerCaseAddress)
            localStorage.setItem(`ceramic-session-${lowerCaseAddress}`, ceramicSession)
            console.log('session saved, clearing credentials')
            localStorage.removeItem('ceramic-session')
        }
    }
    const tryRestoreSession = (address?: string) => {
        const lowerCaseAddress = address?.toLowerCase()
        // Manage ceramic session restore
        const ceramicPreviousSession = localStorage.getItem(`ceramic-session-${lowerCaseAddress}`)
        if (!ceramicPreviousSession) {
            return false
        }
        console.log('ceramic session found! restoring for address', lowerCaseAddress)
        localStorage.setItem('ceramic-session', ceramicPreviousSession)
        console.log('ceramic session restored!')
        return true
    }

    return <div></div>
}

export default CeramicSessionComponent
