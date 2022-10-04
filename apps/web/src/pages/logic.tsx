import { useContext, useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi'
import { Button } from '@chakra-ui/react'
export default function App() {
    const { connector: activeConnector, isConnected } = useAccount({
    })
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    })
    return (
        <>
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
        </>
    )
}
