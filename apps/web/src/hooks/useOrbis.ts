import { OrbisDid, Profile as OrbisProfile } from '@orbisclub/orbis-sdk'
import { useContext, useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { OrbisContext } from '~/contexts/OrbisContext'

export interface Profile {
    did?: string
    name: string
    description: string
    twitter?: string
    pfp?: string
    cover?: string
}

const extractChainIdFromDid = (did: OrbisDid) => {
    const [, chainId] = did.details.metadata.chain.split(':')
    return chainId
}

export const useOrbis = () => {
    const orbis = useContext(OrbisContext)
    const [error, setError] = useState('')
    const [loadingDid, setLoadingDid] = useState(false)
    const [loadingProfile, setLoadingProfile] = useState(false)

    if (!orbis) {
        setError('useOrbis must be used within a OrbisProvider')
        throw new Error('useOrbis must be used within a OrbisProvider')
    }

    const { address, connector } = useAccount()
    const { chain } = useNetwork()
    const [profile, setProfile] = useState<Profile>()
    const [dids, setDids] = useState<OrbisDid[]>()
    useEffect(() => {
        const getDids = async () => {
            if (address) {
                setLoadingDid(true)
                const dids = await orbis.getDids(address)

                setDids(dids.data)
                setLoadingDid(false)
            }
        }
        getDids()
    }, [address, orbis])

    useEffect(() => {
        if (dids) {
            const getProfile = async () => {
                setLoadingProfile(true)
                const currentChainDid = dids.find(did => extractChainIdFromDid(did) === chain?.id.toString())

                if (currentChainDid) {
                    const profile: Profile = {
                        did: currentChainDid.did,
                        name: currentChainDid.details.profile?.username,
                        pfp: currentChainDid.details.profile?.pfp,
                        description: currentChainDid.details.profile?.description,
                        twitter: currentChainDid.details.profile?.data?.twitter,
                    }
                    setProfile(profile)
                } else {
                    setError('Wrong Network')
                }
                setLoadingProfile(false)
            }
            getProfile()
        }
    }, [chain?.id, dids, orbis])

    const connect = async () => {
        const orbisConnection = await orbis.isConnected()
        const isOrbisConnected = orbisConnection.status === 200

        if (!isOrbisConnected) {
            const provider = await connector?.getProvider()
            await orbis.connect(provider)
        }

        return isOrbisConnected
    }

    const updateProfile = async (profile: Profile) => {
        const orbisProfileData: OrbisProfile = {
            cover: profile.cover || '',
            description: profile.description,
            pfp: profile.pfp || '',
            username: profile.name,
            data: { twitter: profile.twitter },
        }

        const result = await orbis.updateProfile(orbisProfileData)

        if (result.status === 200) {
            setProfile(profile)
            return { error: false, updated: true }
        }

        return { error: result?.error?.message, updated: false }
    }

    return { connect, orbis, profile, updateProfile, error, loadingDid, loadingProfile }
}
