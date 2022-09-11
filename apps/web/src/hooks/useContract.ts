import { useEffect } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
// import { CreatorFactory__factory } from '../lib/typechain'

export const useContracts = () => {
    // const creatorFactoryAddress = process.env.NEXT_PUBLIC_CREATOR_FACTORY_MUMBAI
    // if (!creatorFactoryAddress) {
    //     throw new Error('CreatorFactory address not provided')
    // }

    // const { config } = usePrepareContractWrite({
    //     addressOrName: creatorFactoryAddress,
    // contractInterface: CreatorFactory__factory.abi,
    //     functionName: 'deployCreator',
    // })

    // const { writeAsync, data, status } = useContractWrite(config)

    // useEffect(() => {
    //     if (status === 'error') {
    //         console.log('Transaction failed')
    //     } else if (status === 'success') {
    //         console.log('Transaction success', data?.hash)
    //         //completeProfile()
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [status, data])

    const completeProfile = async () => {
        // const data = getValues()
        // const completedOk = await writeProfile({ ...data, creatorDeployed: true })
        // if (completedOk) {
        //     console.log('Profile completed')
        //     Router.push('/profile')
        // }
    }

    return {}
}
