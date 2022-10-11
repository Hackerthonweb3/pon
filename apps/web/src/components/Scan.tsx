import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/router'
import QRCode from 'react-qr-code'
import {
    Text,
    VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Button,
    Flex,
    Box,
    Center,
    Spinner,
} from '@chakra-ui/react'

import ImageMask from '~/components/ImageMask'

import AvatarSvg from '../media/avatar.svg'
import ScanSvg from '../media/scan.svg'
import QrSvg from '../media/qr.svg'

import dynamic from 'next/dynamic'
import { OrbisContext } from '~/contexts'
import { Profile } from './Profile'

// @ts-ignore
const QrReader: any = dynamic(() => import('modern-react-qr-reader'), { ssr: false })

export default function Scan() {
    const [profile, setProfile] = useState<Profile>()
    const orbis = useContext(OrbisContext)

    const checkProfile = async () => {
        // trigger reconnection to get did
        const result = await orbis?.isConnected()
        if (result.did) {
            console.log('checking profile for did', result.did)
            let { data, error } = await orbis?.getProfile(result.did)
            if (error) return console.log('error fetching profile', error)
            setProfile({
                ...data.details.profile,
                address: data.address,
                did: data.did,
            })
        } else {
            console.log('profile not found, redirect to creation')
        }
    }

    useEffect(() => {
        checkProfile()
    }, [])

    const router = useRouter()
    const { register } = useForm()
    const [activeView, setActiveView] = useState('qr')
    const [newDid, setDid] = useState('')
    const [renderingScan, setRenderingScan] = useState(false)

    function isQr() {
        return activeView === 'qr'
    }

    useEffect(() => {
        setRenderingScan(true)
        if (newDid) {
            router.push({ pathname: '/met/[did]', query: { did: newDid } }, '/met')
        }
        return () => {
            setRenderingScan(false)
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

    if (!profile || !renderingScan)
        return (
            <Center h='full' flexDir='column'>
                <Spinner size='xl' />
                <Text ml={2} pb={4} fontWeight={600} color='blue.400' cursor='pointer'>
                    Loading profile...
                </Text>
            </Center>
        )

    function renderQrCode() {
        return (
            <Box>
                <Center flexDirection='column'>
                    {profile?.pfp ? (
                        <Box>
                            <ImageMask imageCid={profile?.pfp} />
                        </Box>
                    ) : (
                        <Image src={AvatarSvg} width='80px' height='80px' alt='avatar' />
                    )}
                    <Text mt={2}>{profile?.username || 'Anon'}</Text>
                </Center>
                <div
                    style={{
                        background: 'white',
                        height: 'auto',
                        maxWidth: 326,
                        marginTop: '30px',
                        width: '100%',
                    }}>
                    <QRCode
                        size={286}
                        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                        value={profile?.did || ''}
                    />
                </div>
            </Box>
        )
    }

    function renderScan() {
        return (
            <QrReader
                delay={300}
                facingMode={'environment'}
                onError={(error: any) => console.log(error)}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
        )
    }

    return (
        <VStack spacing='10'>
            {isQr() ? renderQrCode() : renderingScan ? renderScan() : null}
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
        </VStack>
    )
}
