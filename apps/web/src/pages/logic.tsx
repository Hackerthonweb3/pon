import { useContext, useEffect, useState } from 'react'
// import { useAccount } from 'wagmi'
import { CustomConnect } from '~/components/CustomConnect'
import { useOrbis } from '~/hooks'
import { useCeramicSession } from '~/hooks/useCeramicSession'

import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi'
import { Button } from '@chakra-ui/react'
import { OrbisContext } from '~/contexts'

export default function App() {
    const connectedProvider = useProvider()
    const { connector: activeConnector, isConnected } = useAccount({
        async onConnect({ address, connector, isReconnected }) {
            console.log('connected by rainbow')
            const provider = await connector?.getProvider()
            console.log('the provider', provider)
            console.log('lets connect orbis')
            // const orbisConnected = await orbis?.connect(provider)
            // console.log('orbis connected?', orbisConnected)
            // if (orbisConnected.status === 200) {
            //     setIsOrbisConnected(true)
            // }
        },
        async onDisconnect() {
            await orbis?.logout()
            console.log('orbis disconnected by rainbow')
            setIsOrbisConnected(false)
        },
    })
    const orbis = useContext(OrbisContext)
    const [isOrbisConnected, setIsOrbisConnected] = useState(false)
    const [isCeramicConnected, setIsCeramicConnected] = useState(false)
    const [isLitConnected, setIsLitConnected] = useState(false)
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
        async onSuccess(data, variables, context) {
            console.log('succesfully connected', { data, variables, context })
            const provider = await data.connector?.getProvider()
            console.log('the provider', provider)
            console.log('lets connect orbis')
            // const orbisConnected = await orbis?.connect((data.provider as any)['provider'])
            // console.log('orbis connected?', orbisConnected)
            // if (orbisConnected.status === 200) {
            //     setIsOrbisConnected(true)
            // }
        },
    })

    const connectOrbis = async () => {
        const theProvider = await activeConnector?.getProvider()
        // alert(theProvider)
        // console.log('the provider', theProvider.send, theProvider.sendAsync, theProvider.request)
        const result = await orbis?.connect(theProvider)
        if (result.status === 200) {
            setIsOrbisConnected(true)
        }
    }

    const { disconnect } = useDisconnect({
        async onSuccess() {
            await orbis?.logout()
            console.log('orbis disconnected')
            setIsOrbisConnected(false)
        },
    })

    useEffect(() => {
        setIsCeramicConnected(Boolean(localStorage.getItem('ceramic-session')))
        setIsLitConnected(Boolean(localStorage.getItem('lit-auth-signature')))
    }, [isOrbisConnected])

    // console.log('connectors', connectors)
    return (
        <>
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
        </>
    )
}
