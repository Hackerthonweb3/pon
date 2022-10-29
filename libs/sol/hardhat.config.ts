import * as dotenv from 'dotenv'

import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@openzeppelin/hardhat-upgrades'
import { emitWarning } from 'process'

dotenv.config()

const accounts = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : undefined
const requiredKeys = ['PRIVATE_KEY', 'INFURA_API_KEY', 'ETHERSCAN_API_KEY', 'CMC_API_KEY']

requiredKeys.forEach(key => {
    if (process.env[key] === undefined) emitWarning(`${key} is not set`)
})

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.16',
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
        aurora: {
            url: 'https://mainnet.aurora.dev',
            chainId: 1_313_161_554,
            accounts,
        },
        cronos: {
            url: 'https://evm.cronos.org',
            chainId: 25,
            accounts,
        },
        gnosis: {
            url: 'https://gnosis-mainnet.public.blastapi.io',
            chainId: 100,
            accounts,
        },
        mumbai: {
            url: 'https://rpc-mumbai.maticvigil.com',
            chainId: 80_001,
            accounts,
        },
        polygon: {
            url: ' https://polygon-rpc.com',
            chainId: 137,
            accounts,
        },
        oasis: {
            url: 'https://emerald.oasis.dev',
            chainId: 42_262,
            accounts,
        },
        optimism: {
            url: 'https://mainnet.optimism.io',
            chainId: 10,
            accounts,
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
    typechain: {
        outDir: 'src/types',
    },
}

export default config
