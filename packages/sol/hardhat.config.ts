import * as dotenv from 'dotenv'

import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@openzeppelin/hardhat-upgrades'

dotenv.config()

if (process.env.PRIVATE_KEY === undefined) throw new Error('PRIVATE_KEY is not set')
if (process.env.INFURA_API_KEY === undefined) throw new Error('INFURA_API_KEY is not set')
if (process.env.ETHERSCAN_API_KEY === undefined) throw new Error('ETHERSCAN_API_KEY is not set')
if (process.env.CMC_API_KEY === undefined) throw new Error('CMC_API_KEY is not set')

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.8',
        settings: {
            optimizer: {
                enabled: true,
                runs: 800,
                details: { yul: false },
            },
        },
    },

    networks: {
        hardhat: {
            forking: {
                url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
                blockNumber: 15403550,
                enabled: true,
            },
        },
        polygon: {
            url: ' https://polygon-rpc.com',
            accounts: [process.env.PRIVATE_KEY],
        },
        mumbai: {
            url: 'https://rpc-mumbai.maticvigil.com',
            accounts: [process.env.PRIVATE_KEY],
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        coinmarketcap: process.env.CMC_API_KEY,
        currency: 'EUR',
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
}

export default config
