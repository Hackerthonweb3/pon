import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Text, Button, Flex, Box, Tooltip, Center, Spinner, Avatar, AspectRatio, Heading, Badge } from '@chakra-ui/react'
import { Layout, SpaceEnd, ContainerFlex, CenteredContainer } from './DesignSystem'
import Gallery from './Gallery'
import { Social } from './Social'
import ImageMask from './ImageMask'
import InfoContainer from './InfoContainer'
import { Title, SubTitle, Note, NoteMono } from './StyledText'
import { colors } from '../constants/colors'
import { mockProfile } from '../constants/mock'
import coverSvg from '../media/mock/cover1.png'
import greenApePng from '../media/mock/ape_green.png'
import blueApePng from '../media/mock/ape_blue.png'
import zkPng from '../media/ZK.png'
import { useRouter } from 'next/router'
import { useDisconnect } from 'wagmi'
import { useAccount } from '@web3modal/react'
import { useOnboarding } from '~/hooks/useOnboarding'
import { OrbisContext } from '~/contexts'
import NftGallery from './NftGallery'

const styles = {
    backgroundContainer: {
        position: 'absolute',
        top: ' 0',
        left: '0',
        right: '0',
    },
    overlay: {
        top: -55,
        alignItems: 'center',
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column',
    },
    switch: {
        alignContent: 'center',
        top: -10,
        marginTop: 8,
    },
    info: {
        top: -30,
        marginTop: 0,
        paddingTop: 0,
    },
    fullInfo: {
        borderRadius: 12,
        alignItems: 'center',
        top: -10,
        width: '100%',
        padding: 12,
        marginBottom: 10,
    },
    description: {
        paddingTop: 5,
        paddingHorizontal: 20,
    },
    actionText: {
        color: colors.textAction,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'VT323',
        marginRight: 10,
        paddingTop: 3,
    },
}

enum EGallery {
    NFTS = 'NFTs',
    SBTS = 'SBTs',
}
const nftGallery = [{ pfpSrc: blueApePng }, { pfpSrc: blueApePng }, { pfpSrc: greenApePng }]
const zkGallery = [{ pfpSrc: zkPng }]

export interface Profile {
    pfp: string
    username: string
    description: string
    address: string
    did: string
}

export default function Profile() {
    const { push } = useRouter()
    const { disconnect } = useDisconnect()
    const { setViewedOnboarding } = useOnboarding()
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
            console.log(data)
        } else {
            console.log('profile not found, redirect to creation')
        }
    }

    useEffect(() => {
        checkProfile()
    }, [])

    const handleBack = () => {
        setViewedOnboarding(false)
        disconnect()
        push('/app')
    }

    const { nftVerified, name, description, pfp, location, occupation, organization, whatCan, wantMeet } = mockProfile

    const [selectedGalleryTab, setSelectedGalleryTab] = useState(EGallery.NFTS)
    const [isPreferedContact, setIsPreferedContact] = useState(false)
    const [isFullView, setIsFullView] = useState(false)

    const fullProfileTitle = isFullView ? 'Done' : 'Full Profile'

    const toggleSwitch = () => setIsPreferedContact((previousState: boolean) => !previousState)

    function handleEditLink() {
        // console.log("edit")
    }

    const colourSchemes = [
        "red",
        "orange",
        "yellow",
        "green",
        "teal",
        "blue",
        "cyan",
        "purple",
        "pink",
        "linkedin",
        "facebook",
        "messenger",
        "whatsapp",
        "twitter",
        "telegram"
    ]

    const mockSkills = [
        "Javascript",
        "React",
        "Typescript",
        "Solidity",
        "Web3",
        "Next.js",
    ]

    const Tab = ({ name }: string) => {
        let random1 = Math.floor(Math.random() * 255)
        let random2 = Math.floor(Math.random() * 255)
        let random3 = Math.floor(Math.random() * 255)

        const bgColour = `rgba(${random1}, ${random2}, ${random3}, 0.3)`;
        
        return (
            <Flex backgroundColor={bgColour} w="min" m={2}>
                <Text m={2} fontSize="lg">{name}</Text>
            </Flex>
        )
    }

    const renderFullInfo = isFullView && (
        <Flex flexDirection='column' alignItems='center'>
            <Button mb='10px' width={280} style={{ width: 260 }} onClick={handleEditLink}>
                Edit Profile
            </Button>
            <Tooltip label='The ZK NFT Collector Badge is a secure way to keep the privacy of NFTs you own while providing a reputation. Click to learn more.'>
                <Flex justifyContent='flex-end'>
                    <Link href='https://playground.sismo.io/nft-collector'>
                        <Text ml={2} pb={4} fontWeight={600} color='blue.400' cursor='pointer'>
                            Get Verified as NFT Collector on Sismo.io
                        </Text>
                    </Link>
                </Flex>
            </Tooltip>
            <InfoContainer title='Location' text={location} />
            <InfoContainer title='Job Title' text={occupation} />
            <InfoContainer title='Organization' text={organization} />
            <InfoContainer title='Skills' text={whatCan} />
            <InfoContainer title='Interested in meeting' text={wantMeet} />
        </Flex>
    )

    if (!profile)
        return (
            <Center h='full' flexDir='column'>
                <Spinner size='xl' />
                <Text ml={2} pb={4} fontWeight={600} color='blue.400' cursor='pointer'>
                    Loading profile...
                </Text>
                <Button position='absolute' right='0px' top='0px' onClick={handleBack}>
                    Go back
                </Button>
            </Center>
        )

    return (
        <Flex margin='auto' width={{ base: '100%', md: '60%', lg: '50%' }} justifyContent='center' alignItems='center'>
            <Layout>
                <CenteredContainer style={{ padding: '0 5px' }}>
                    <Flex justifyContent='center' direction='column' alignItems='center'>
                        <Avatar boxSize={200} name={profile.username} src={profile.pfp} />
                        <Title>{profile.name}</Title>
                    </Flex>
                    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
                        <Flex direction='column' alignItems='center'>
                            <Flex direction="row">
                                <Flex direction='row' mr={2}>
                                    <Image src='/icons/location.svg' width={20} height={20} />
                                    <SubTitle>{profile.location}</SubTitle>
                                </Flex>
                                <Flex direction='row' ml={2}>
                                    <Image src='/icons/jobTitle.svg' width={20} height={20} />
                                    <SubTitle>{profile.job_title}</SubTitle>
                                </Flex>
                            </Flex>
                            <SubTitle>{profile.organization}</SubTitle>
                        </Flex>
                        
                        <Text fontWeight="bold" fontSize="xl">{profile.description}</Text>
                    </Flex>

                    <Social profile={profile} />

                    <Box w="100%">
                        <Heading size="xl" mb={2}>🛠 Skills</Heading>
                        <Flex wrap="wrap">
                            {
                                mockSkills.map((skill, index) => { 
                                    return (
                                        <Tab name={skill} key={index} />
                                    )
                                })
                            }
                        </Flex>
                    </Box>

                    <NftGallery address={profile.address} />
                    <Button position='absolute' right='0px' top='0px' onClick={handleBack}>
                        Go back
                    </Button>
                </CenteredContainer>

                {/* <div style={{ padding: '0 10px' }}>
                    <Flex style={{ backgroundColor: colors.overlay, width: '100%' }}>
                        {renderGalleryButton(EGallery.NFTS)}
                        {renderGalleryButton(EGallery.SBTS)}
                    </Flex>
                    {selectedGalleryTab === EGallery.NFTS && <Gallery data={nftVerified ? zkGallery : nftGallery} />}
                    {selectedGalleryTab === EGallery.SBTS && <Gallery data={nftGallery} />}
                </div> */}
            </Layout>
        </Flex>
    )
}
