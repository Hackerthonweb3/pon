import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useOrbis } from './useOrbis'

export const useCeramicSession = () => {
    const { push } = useRouter()
    const { address: connectedAddress } = useAccount()
    const { connect } = useOrbis()
    const [isCeramicConnected, setIsCeramicConnected] = useState(false)
    const [isLitConnected, setIsLitConnected] = useState(false)

    const checkCeramicPreviousSession = (address: string) => {
        return localStorage.getItem(`ceramic-session-${address}`)
    }

    const checkLitPreviousSession = (address: string) => {
        return localStorage.getItem(`lit-auth-signature-${address}`)
    }

    const onConnect = async ({ address }: any) => {
        const lowerCaseAddress = address?.toLowerCase()

        const ceramicCurrentSession = localStorage.getItem('ceramic-session')
        const litCurrentSession = localStorage.getItem('lit-auth-signature')

        if (ceramicCurrentSession && litCurrentSession) {
            console.log('Ceramic and Lit re-connected')
            setIsCeramicConnected(true)
            setIsLitConnected(true)
            return
        }

        const ceramicPreviousSession = checkCeramicPreviousSession(lowerCaseAddress)
        const litPreviousSession = checkLitPreviousSession(lowerCaseAddress)

        if (!ceramicPreviousSession || !litPreviousSession) {
            console.log('Ceramic or Lit sessions not found, creating new ones')
            await connect()
        } else {
            if (ceramicPreviousSession) {
                console.log('Ceramic session found, restoring')
                localStorage.setItem('ceramic-session', ceramicPreviousSession)
            }
            if (litPreviousSession) {
                console.log('Lit session found, restoring')
                localStorage.setItem('lit-auth-signature-', litPreviousSession)
            }
        }
        if (checkCeramicPreviousSession(lowerCaseAddress)) setIsCeramicConnected(true)
        if (checkLitPreviousSession(lowerCaseAddress)) setIsLitConnected(true)
    }

    const onDisconnect = () => {
        const lowerCaseAddress = connectedAddress?.toLowerCase()

        const ceramicSession = localStorage.getItem('ceramic-session')
        if (ceramicSession) {
            localStorage.setItem(`ceramic-session-${lowerCaseAddress}`, ceramicSession)
            localStorage.removeItem('ceramic-session')
            console.log('Ceramic session saved for address', lowerCaseAddress)
        }

        const litSession = localStorage.getItem('lit-auth-signature')
        if (litSession) {
            localStorage.setItem(`lit-auth-signature-${lowerCaseAddress}`, litSession)
            localStorage.removeItem('lit-auth-signature')
            console.log('Lit session saved for address', lowerCaseAddress)
        }
        // TODO: re-enable this!!!
        // push('/')
    }

    return { isCeramicConnected, isLitConnected, onConnect, onDisconnect }
}
