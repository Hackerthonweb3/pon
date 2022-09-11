import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export const useSafeConnected = () => {
    const { isConnected } = useAccount()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    return mounted && isConnected
}
