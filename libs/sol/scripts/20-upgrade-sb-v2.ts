import { ethers, run, upgrades } from 'hardhat'

const PROXY_ADDRESS = ''

const main = async (): Promise<void> => {
    const SoulboundV2 = await ethers.getContractFactory('SoulboundEncountersV2')
    const soulboundV2 = await upgrades.upgradeProxy(PROXY_ADDRESS, SoulboundV2)
    console.log('SoulboundV2 upgraded to v2 at:', soulboundV2.address)

    const result = await run('verify:verify', { address: soulboundV2.address })
    console.log('SoulboundV2 verified:', result)
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
