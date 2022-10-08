import { useContext, useEffect, useState } from 'react'
import { CustomConnect } from '~/components/CustomConnect'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@chakra-ui/react'
import { OrbisContext } from '~/contexts'
import { useRouter } from 'next/router'

export default function App() {
    const orbis = useContext(OrbisContext)

    const [isOrbisConnected, setIsOrbisConnected] = useState(false)
    const [isCeramicConnected, setIsCeramicConnected] = useState(false)
    const [isLitConnected, setIsLitConnected] = useState(false)
    const [did, setDid] = useState<string>()

    const { connector: activeConnector, isConnected } = useAccount({
        async onConnect({ address, connector, isReconnected }) {
            console.log('connected by rainbow kit')
            const result = await orbis?.isConnected()
            if (result.status === 200) {
                console.log('orbis is reconnected')
                setDid(result.did)
            } else {
                console.log('oops orbis not connected')
            }
            // connect orbis if needed
            // const provider = await connector?.getProvider()
        },
        async onDisconnect() {
            console.log('orbis disconnected by rainbow kit')
            await orbis?.logout()
            setIsOrbisConnected(false)
            setDid(undefined)
        },
    })

    const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
        async onSuccess(data, variables, context) {
            console.log('succesfully connected by useConnect', { data, variables, context })
            // connect orbis here if needed
            // const provider = await data.connector?.getProvider()
        },
    })

    const connectOrbis = async () => {
        const connectedProvider = await activeConnector?.getProvider()
        const result = await orbis?.connect(connectedProvider)
        if (result.status === 200) {
            setIsOrbisConnected(true)
            if (isCeramicConnected) {
                setDid(result.did)
                console.log('did saved to state', result.did)
            }
        }
    }

    const updateProfile = async () => {
        let res = await orbis?.updateProfile({
            pfp: '',
            username: 'ottx',
            description: '',
        })

        console.log('res', res)
    }

    const { disconnect } = useDisconnect({
        async onSuccess() {
            const result = await orbis?.logout()
            if (result.status === 200) {
                console.log('orbis disconnected by useConnect')
                setIsOrbisConnected(false)
            } else {
                console.log('error on orbis logout', result)
            }
        },
    })

    const checkProfile = async () => {
        // trigger reconnection to get did
        const result = await orbis?.isConnected()
        if (result.status === 200) {
            setDid(result.did)
        }
        if (result.did) {
            console.log('checking profile for did', did)
            let { data, error } = await orbis?.getProfile(result.did)
            if (error) return console.log('error fetching profile', error)
            console.log('profile fetched:', data)
            // TODO: set profile here
        } else {
            console.log('profile not found, redirect to creation')
        }
    }

    useEffect(() => {
        setIsCeramicConnected(Boolean(localStorage.getItem('ceramic-session')))
        setIsLitConnected(Boolean(localStorage.getItem('lit-auth-signature')))

        if (isOrbisConnected) {
            console.log('checking profile after orbis connected')
            checkProfile()
        }
    }, [isOrbisConnected])

    useEffect(() => {
        const checkOrbis = async () => {
            const result = await orbis?.isConnected()
            if (result.status === 200) {
                setDid(result.did)
            }
        }
        checkOrbis()
    }, [])

    const { push } = useRouter()

    const createGroup = async () => {
        const result = await (orbis as any).createGroup({
            name: 'pepe',
            description: '',
            pfp: '',
        })
        console.log('result', result)
    }

    return (
        <>
            <Button onClick={() => push('logic-qr')}>Go to Logic</Button>
            <br />
            {did}
            <br />
            <CustomConnect />
            {isConnected ? <div>Connected to {activeConnector?.name}</div> : <div>Disconnected</div>}
            <br />
            <hr />
            <br />
            {connectors.map((connector, i) => (
                <div key={`${i}ok`} style={{ marginBottom: '10px' }}>
                    <Button
                        disabled={!connector.ready}
                        key={`${i}conn${connector.id}`}
                        onClick={() => connect({ connector })}>
                        {(connector.ready ? '' : '[not ready] ') + connector.name}
                        {isLoading && pendingConnector?.id === connector.id && ' (connecting)'}
                    </Button>
                </div>
            ))}
            <br />
            {error && <div>{error.message}</div>}
            {isConnected && <Button onClick={() => disconnect()}>Disconnect</Button>}
            <br />
            <br />
            <hr />
            <br />
            Wallet connected? {`${isConnected}`}
            <br />
            Ceramic connected? {`${isCeramicConnected}`}
            <br />
            Lit connected? {`${isLitConnected}`}
            <br />
            <br />
            <Button disabled={isOrbisConnected || !isConnected} onClick={connectOrbis}>
                Connect Orbis
            </Button>
            <Button disabled={!isConnected} onClick={createGroup}>
                Create group
            </Button>
            <Button disabled={!isConnected} onClick={updateProfile}>
                Edit profile
            </Button>
        </>
    )
}
