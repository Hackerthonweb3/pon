import { ethers, run, upgrades } from 'hardhat'

const main = async (): Promise<void> => {
    const Soulbound = await ethers.getContractFactory('SoulboundEncounters')
    const soulbound = await upgrades.deployProxy(Soulbound, ['Proof of Networking', 'PON', '1'], {
        kind: 'uups',
    })
    await soulbound.deployed()
    const { chainId } = soulbound.deployTransaction
    console.log('Soulbound deployed to:', soulbound.address, ', at chain:', chainId)

    if (chainId !== 31337) {
        const result = await run('verify:verify', { address: soulbound.address })
        console.log('Soulbound verified:', result)
    } else {
        console.log('Contract deployed locally, no verification needed')
    }
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
