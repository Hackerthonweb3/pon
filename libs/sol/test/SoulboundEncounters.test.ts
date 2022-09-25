import { expect } from 'chai'
import { Interface } from '@ethersproject/abi'
import { BigNumber } from 'ethers'
import { ethers, upgrades } from 'hardhat'
import {
    EIP712Upgradeable__factory,
    IERC165Upgradeable__factory,
    IERC4973__factory,
    IERC721Metadata__factory,
    OwnableUpgradeable__factory,
    SoulboundEncounters__factory,
    UUPSUpgradeable__factory,
} from '../src/types'

const getInterfaceID = (contractInterface: Interface) => {
    let interfaceID: BigNumber = ethers.constants.Zero
    const functions: string[] = Object.keys(contractInterface.functions)
    for (let i = 0; i < functions.length; i++) {
        interfaceID = interfaceID.xor(contractInterface.getSighash(functions[i]))
    }
    return interfaceID
}

const deployContract = async () => {
    const Contract = await ethers.getContractFactory('SoulboundEncounters')
    return await Contract.deploy()
}

describe('SoulboundEncounters.sol', () => {
    describe('interfaces', () => {
        it('should support the inherited interfaces', async () => {
            const instance = await deployContract()

            const IERC165UpgradeableInterface = IERC165Upgradeable__factory.createInterface()
            const IERC721MetadataInterface = IERC721Metadata__factory.createInterface()
            const IERC4973Interface = IERC4973__factory.createInterface()

            const IERC165InterfaceId = getInterfaceID(IERC165UpgradeableInterface)
            const IERC721MetadataInterfaceId = getInterfaceID(IERC721MetadataInterface)
            const IERC4973InterfaceId = getInterfaceID(IERC4973Interface)

            expect(await instance.supportsInterface(IERC165InterfaceId._hex)).to.be.true
            expect(await instance.supportsInterface(IERC721MetadataInterfaceId._hex)).to.be.true
            expect(await instance.supportsInterface(IERC4973InterfaceId._hex)).to.be.true
        })
    })
})
