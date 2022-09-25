import {
    Box,
    Button,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Spacer,
} from '@chakra-ui/react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { SoulboundEncounters__factory } from '@business-card/sol'
import { Button2 } from '@business-card/sdk'

type Props = {
    isOpen: any
    onClose: any
    signature: any
}

export default function AccountModal({ isOpen, onClose, signature }: Props) {
    // const { config } = usePrepareContractWrite({
    //     addressOrName: '0xE8F7d98bE6722d42F29b50500B0E318EF2be4fc8',
    //     contractInterface: SoulboundEncounters__factory.abi,
    //     functionName: 'take',
    //     chainId: 31337,
    //     // args: from - uri - signature
    //     args: ['0xe13f6360ecd6df96290d5581fac6ab57b9c5fa56', 'uri', signature],
    // })

    // const { data, isLoading, isSuccess, write } = useContractWrite({
    //     ...config,

    //     onSettled(data, error) {
    //         console.log('Settled', { data, error })
    //     },

    //     onMutate({ args, overrides }) {
    //         console.log('Mutate', { args, overrides })
    //     },

    //     onError(error) {
    //         console.log('Error', error)
    //     },

    //     onSuccess(data) {
    //         console.log('Success', data)
    //     },
    // })

    function handleGetSBT() {
        console.log('getSBT')
        // console.log(signature)
        // write?.()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
            <ModalOverlay />
            <ModalContent
                background='gray.900'
                border='1px'
                borderStyle='solid'
                borderColor='gray.700'
                borderRadius='3xl'>
                <ModalHeader color='white' fontSize='xl' fontWeight='medium'>
                    You’ve met asha at ETHOnline 2022!
                </ModalHeader>
                <ModalCloseButton
                    color='white'
                    fontSize='sm'
                    _hover={{
                        color: 'whiteAlpha.700',
                    }}
                />
                <ModalBody pt={0} px={4}>
                    <Box
                        borderRadius='3xl'
                        border='1px'
                        borderStyle='solid'
                        borderColor='gray.600'
                        px={5}
                        pt={4}
                        pb={2}
                        mb={3}>
                        <Text color='gray.400' fontSize='md' align='center'>
                            Would you like to mint a SBT for this encounter?
                            <br />
                            (You can mint later if you want)
                        </Text>
                        <Flex m={3}>
                            <Button
                                variant='outline'
                                borderColor='blue.800'
                                color='blue.500'
                                fontWeight='normal'
                                _hover={{
                                    background: 'none',
                                    borderColor: 'blue.300',
                                    textDecoration: 'underline',
                                }}
                                onClick={handleGetSBT}>
                                Get SBT
                            </Button>
                            <Spacer />
                            <Button
                                variant='outline'
                                color='gray.400'
                                fontWeight='normal'
                                onClick={onClose}
                                _hover={{
                                    textDecoration: 'none',
                                    color: 'whiteAlpha.800',
                                }}>
                                Decline
                            </Button>
                        </Flex>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
