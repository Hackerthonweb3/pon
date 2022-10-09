declare module '@orbisclub/orbis-sdk' {
    export class Orbis {
        // utils
        connect(provider: ethers.Provider, lit?: boolean): Promise<OrbisResponse>
        // connectLit()
        isConnected(): Promise<OrbisResponse>
        logout(): Promise<OrbisResponse>

        // write
        createConversation(content: Conversation)
        sendMessage(content: { conversation_id: string; body: string }): Promise<OrbisResponse>
        updateProfile(profile: Profile): Promise<OrbisResponse>

        // get
        getConversations(options: { did: string; context?: string }): Promise<OrbisResponse>
        getDids(address: string): Promise<OrbisResponse>
        getMessages(conversation_id: string): Promise<OrbisResponse>
        getProfile(did: string): Promise<OrbisResponse>
        decryptMessage(content: PrivateMessage): Promise<Message>

        // internal
        createTileDocument(
            content: Conversation | PrivateMessage,
            tags: string[],
            schema: string,
            family?: string,
        ): Promise<OrbisResponse>

        getGroup(props: any): any
        getProfileGroups(props: any): any
        createGroup(props: any): any
    }

    type OrbisResponse = any
    type Message = any

    export interface Conversation {
        recipients: string[]
        name?: string
        description?: string
        context?: string
    }

    export interface PrivateMessage {
        conversation_id: string
        encryptedMessage: string
    }

    export interface Profile {
        pfp?: string
        cover?: string
        username: string
        description: string
        cover: string
        data?: {
            twitter?: string
        }
    }

    export interface Metadata {
        chain: string
        address: string
        ensName?: any
    }

    export interface Nonces {
        global: number
        mainnet: number
        polygon: number
        arbitrum: number
    }

    export interface Details {
        did: string
        profile: Profile
        metadata: Metadata
        nonces: Nonces
        a_r: number
    }

    export interface OrbisDid {
        address: string
        count_followers: number
        count_following: number
        details: Details
        did: string
        last_activity_timestamp: number
        timestamp: number
        username: string
    }
}

declare module '@orbisclub/orbis-sdk/lib/indexer-db' {
    export const indexer: any
}
