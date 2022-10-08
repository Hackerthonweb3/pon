import { Orbis } from '@orbisclub/orbis-sdk'
import { createContext, ReactNode, useEffect, useState, useCallback } from 'react'
import { useAccount } from 'wagmi'

const OrbisContext = createContext<Orbis | undefined>(undefined)

// put orbis outside to avoid being affected by re-renders
const orbis = new Orbis()

const OrbisProvider = ({ children }: { children: ReactNode }) => {
    const { connector } = useAccount();
    const [loading, setLoading] = useState(true);

    const connect = useCallback(async () => {
        const orbisConnection = await orbis.isConnected()
        const isOrbisConnected = orbisConnection.status === 200

        if (!isOrbisConnected) {
            const provider = await connector?.getProvider()
            await orbis.connect(provider)
        }
        setLoading(false)
    }, []);

    useEffect(() => {
        connect();
    }, [connect]);

    return <OrbisContext.Provider value={orbis}>{loading ? (<span>Loading Orbis...</span>) : children}</OrbisContext.Provider>
}

export { OrbisProvider, OrbisContext }
