import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/router'
import QRCode from 'react-qr-code'
import {
    useDisclosure,
    Heading,
    Text,
    VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Button,
    Flex,
    Box,
} from '@chakra-ui/react'
import AccountModal from '~/components/AccountModal'
import ImageMask from '~/components/ImageMask'

import AvatarSvg from '../media/avatar.svg'
import ScanSvg from '../media/scan.svg'
import QrSvg from '../media/qr.svg'

import dynamic from 'next/dynamic'

// const QrReader: any = dynamic(() => import('modern-react-qr-reader'), { ssr: false })

export default function Scan({ profile }: any) {
    const { name, did } = profile
    const router = useRouter()
    const { register } = useForm()
    const [activeView, setActiveView] = useState('qr')
    const [newDid, setDid] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    function isQr() {
        return activeView === 'qr'
    }

    useEffect(() => {
        // 'did:pkh:eip155:137:0xe73d88e147e12ca4cdde9062db67f06ffd43c5e8'
        if (newDid) {
            //onOpen() // TODO: move po logic to modal
            router.push({ pathname: '/met/[did]', query: { did: newDid } }, '/met')
        }
        return () => {
            console.log('cleaned up')
        }
    }, [newDid, router])

    function handleChangeMode(view: string) {
        setActiveView(view)
    }
    function handleScan(scanResult: any) {
        if (scanResult) {
            setDid(scanResult)
        }
    }

    function renderQrCode() {
        return (
            <Box>
                {profile?.pfp ? (
                    <Box ml={'86px'}>
                        <ImageMask imageCid={profile?.pfp} />
                    </Box>
                ) : (
                    <Image src={AvatarSvg} width='80px' height='80px' alt='avatar' />
                )}
                <Text mt={2}>{name || 'Anon'}</Text>
                <div
                    style={{
                        background: 'white',
                        height: 'auto',
                        maxWidth: 326,
                        marginTop: '30px',
                        width: '100%',
                    }}>
                    <QRCode size={286} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} value={did} />
                </div>
            </Box>
        )
    }

    function renderScan() {
        return (
            <>
                {/* <QrReader
                    delay={300}
                    facingMode={'environment'}
                    onError={(error: any) => console.log(error)}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                /> */}
                <FormControl id='did'>
                    <FormLabel>DiD for new contact</FormLabel>
                    <InputGroup borderColor='#E0E1E7'>
                        <Input
                            variant='filled'
                            type='text'
                            value={newDid}
                            {...register('did', {
                                required: 'This is required',
                            })}
                        />
                    </InputGroup>
                </FormControl>
            </>
        )
    }

    return (
        <VStack spacing='10'>
            {isQr() ? renderQrCode() : renderScan()}
            <Text fontSize='l' mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
                Scan a QR profile to add a new contact!
            </Text>

            <Flex justifyContent={'space-between'} borderRadius='8px' backgroundColor='#232934' h={92} w='100%'>
                <Button
                    onClick={() => handleChangeMode('qr')}
                    h={92}
                    p='10px'
                    w='50%'
                    backgroundColor={isQr() ? '#ffffff3d' : '#232934'}>
                    <span>
                        <Image src={QrSvg} alt='qr' />
                        <Text>QRcode</Text>
                    </span>
                </Button>
                <Button
                    onClick={() => handleChangeMode('scan')}
                    h={92}
                    p='10px'
                    w='50%'
                    backgroundColor={isQr() ? '#232934' : '#ffffff3d'}>
                    <span>
                        <Image src={ScanSvg} alt='scan' />
                        <Text>Scan</Text>
                    </span>
                </Button>
            </Flex>
            <AccountModal isOpen={isOpen} onClose={onClose} />
        </VStack>
    )
}
