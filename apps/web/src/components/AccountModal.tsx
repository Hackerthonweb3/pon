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
} from '@chakra-ui/react'

type Props = {
    isOpen: any
    onClose: any
}

export default function AccountModal({ isOpen, onClose }: Props) {
    function handleGetSBT() {}

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size='md'>
            <ModalOverlay />
            <ModalContent
                background='gray.900'
                border='1px'
                borderStyle='solid'
                borderColor='gray.700'
                borderRadius='3xl'>
                <ModalHeader color='white' px={4} fontSize='lg' fontWeight='medium'>
                    You’ve met Hide at ETH Latam ‘22
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
                        <Text color='gray.400' fontSize='sm'>
                            Would you like to get a POAP?{' '}
                        </Text>
                        <Box mb={3}>
                            <Button
                                variant='outline'
                                borderColor='blue.800'
                                color='blue.500'
                                fontWeight='normal'
                                px={2}
                                height='26px'
                                _hover={{
                                    background: 'none',
                                    borderColor: 'blue.300',
                                    textDecoration: 'underline',
                                }}
                                onClick={handleGetSBT}>
                                Get SBT
                            </Button>
                            <Button
                                variant='link'
                                color='gray.400'
                                fontWeight='normal'
                                onClick={() => onClose()}
                                _hover={{
                                    textDecoration: 'none',
                                    color: 'whiteAlpha.800',
                                }}>
                                Decline
                            </Button>
                        </Box>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
