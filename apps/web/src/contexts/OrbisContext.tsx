import { Orbis } from '@orbisclub/orbis-sdk'
import React, { createContext, ReactNode } from 'react'

const OrbisContext = createContext<Orbis | undefined>(undefined)

// put orbis outside to avoid being affected by re-renders
const orbis = new Orbis()

const OrbisProvider = ({ children }: { children: ReactNode }) => {
    return <OrbisContext.Provider value={orbis}>{children}</OrbisContext.Provider>
}

export { OrbisProvider, OrbisContext }
