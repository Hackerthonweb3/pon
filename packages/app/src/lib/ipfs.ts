import { create } from 'ipfs-http-client'

const projectId = process.env.NEXT_PUBLIC_INFURA_ID
const projectSecret = process.env.NEXT_PUBLIC_INFURA_SECRET
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

export const ipfsClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
        authorization: auth,
    },
})
