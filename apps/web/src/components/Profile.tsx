import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Tooltip,
    Center,
    Spinner,
    Avatar,
    AspectRatio,
    Heading,
    Text,
    VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Textarea,
    Button,
    Flex,
    InputLeftAddon,
    Box,
    Tag,
    Badge,
    StatHelpText,
    Stat,
} from '@chakra-ui/react'
import { FaDiscord, FaLeaf } from 'react-icons/fa'
import { FiMail, FiTwitter, FiGithub, FiInstagram, FiLinkedin, FiSend } from 'react-icons/fi'
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
import NftGallery from './NftGallery'
import { useForm } from 'react-hook-form'
import { ipfsClient } from '~/lib'
import { useOrbis } from '~/hooks'
import { FileUploader } from './FileUploader'
import { create } from 'ipfs-http-client'
import { OrbisContext } from '~/contexts'
import { CloseIcon } from '@chakra-ui/icons'

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
        fontWeight: '700',
        fontSize: '20px',
    },
    actionText: {
        color: colors.textAction,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'INTER',
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
    const [isEditing, setIsEditing] = useState(false)
    const { handleSubmit, register, control, watch } = useForm()
    const [error, setError] = useState(null as any)
    const router = useRouter()

    const [editPfp, setEditPfp] = useState('/icons/ChoosePhoto.svg')

    const socialInputs = [
        {
            name: 'twitter',
            placeholder: 'Your twitter link',
            label: 'Twitter',
            icon: <FiTwitter />,
        },
        {
            name: 'telegram',
            placeholder: 'Your Telegram link',
            label: 'Telegram',
            icon: <FiSend />,
        },
        {
            name: 'lens',
            placeholder: 'Your lens link',
            label: 'Lens',
            icon: <FaLeaf />,
        },
        {
            name: 'discord',
            placeholder: 'Your discord id',
            label: 'Discord',
            icon: <FaDiscord />,
        },
        {
            name: 'github',
            placeholder: 'Your github link',
            label: 'Github',
            icon: <FiGithub />,
        },
        {
            name: 'linkedin',
            placeholder: 'Your linkedIn link',
            label: 'LinkedIn',
            icon: <FiLinkedin />,
        },
        {
            name: 'email',
            placeholder: 'Your email',
            label: 'Email',
            icon: <FiMail />,
        },
    ]

    const [skills, setSkills] = useState([] as string[])
    const [interests, setInterests] = useState([] as string[])

    const sharedTxtInputProps = {
        variant: 'filled',
        _hover: {
            borderColor: 'gray.300',
        },
    }
    const sharedInputProps = {
        variant: 'filled',
        type: 'text',
    }

    const checkProfile = async () => {
        // trigger reconnection to get did
        const result = await orbis?.isConnected()
        console.log(result)
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

    useEffect(() => {
        if (profile) {
            setSkills(profile.skills)
            setInterests(profile.interests)
        }
    }, [profile])

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

    const mockSkills = ['Javascript', 'React', 'Typescript', 'Solidity', 'Web3', 'Next.js']

    const mockInterests = ['Investors', 'Developers', 'Designers', 'Artists']

    const colourSchemes = [
        'purple',
        'pink',
        'linkedin',
        'facebook',
        'messenger',
        'whatsapp',
        'twitter',
        'telegram',
        'red',
        'orange',
        'yellow',
        'green',
        'teal',
        'blue',
        'cyan',
    ]

    const Tab = ({ name, index }: string) => {
        return (
            <Flex backgroundColor={`${colourSchemes[index]}.100`} w='fit' m={2} borderRadius={6} alignItems='center'>
                <Text mx={4} fontSize='lg' wordBreak='keep-all'>
                    {name}
                </Text>
            </Flex>
        )
    }

    const createProfile = async (newUserData: any) => {
        // trigger reconnection to get did
        const result = await orbis?.isConnected()

        if (result.did) {
            console.log('checking profile for did', result.did)

            let { updated, error } = await orbis?.updateProfile(newUserData)

            if (error) {
                console.log('error fetching profile', error)
                setError(error)
                return false
            }

            return true
        } else {
            console.log('no profile, try again')
        }
    }

    const onSubmit = async (data: any) => {
        const newData = { ...data }

        if (newData.pfp) {
            try {
                const created = await ipfsClient.add(data.pfp[0])
                console.log(created)
                newData.pfp = created.path
            } catch (error) {
                setError(error)
                newData.pfp = ''
            }
        } else if (profile.pfp != '') {
            newData.pfp = profile.pfp
        } else {
            newData.pfp = ''
        }

        if (newData.skills) {
            const skillsData = newData.skills.split(',')
            newData.skills = skillsData
        } else {
            newData.skills = ['no skills']
        }

        if (newData.interests) {
            const interestsData = newData.interests.split(',')
            newData.interests = interestsData
        } else {
            newData.interests = ['no interests']
        }

        const isCreated = await createProfile(newData)

        if (isCreated) {
            window.location.reload()
        }
    }

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
                <CenteredContainer style={{ padding: '0 20px', marginBottom: '100px' }}>
                    {!isEditing ? (
                        <>
                            <Flex justifyContent='center' direction='column' alignItems='center' m={4}>
                                <Avatar
                                    boxSize={200}
                                    name={profile.username}
                                    src={`https://ipfs.io/ipfs/${profile.pfp}`}
                                />
                                <Title>{profile.name}</Title>
                            </Flex>
                            <Flex flexDirection='column' justifyContent='center' alignItems='center'>
                                <Flex direction='column' alignItems='center'>
                                    <Flex direction='row'>
                                        <Flex direction='row' mr={2}>
                                            <Image src='/icons/location.svg' width={20} height={30} />
                                            <SubTitle>{profile.location}</SubTitle>
                                        </Flex>
                                        <Flex direction='row' ml={2}>
                                            <Image src='/icons/jobTitle.svg' width={30} height={20} />
                                            <SubTitle>{profile.job_title}</SubTitle>
                                        </Flex>
                                    </Flex>
                                    <SubTitle>{profile.organization}</SubTitle>
                                </Flex>

                                <Text sx={styles.description}>{profile.description}</Text>
                            </Flex>
                            <Box>
                                {socialInputs.map(({ name, label, icon, placeholder }) =>
                                    profile[name] ? (
                                        <a href={profile[name]} target='_blank' key={index}>
                                            <Flex
                                                direction='row'
                                                alignItems='center'
                                                mt={4}
                                                background='gray.200'
                                                justifyContent='center'
                                                borderRadius={10}
                                                fontSize='xl'
                                                fontWeight='semibold'
                                                p={4}>
                                                {label}
                                            </Flex>
                                        </a>
                                    ) : null,
                                )}
                            </Box>
                            <Box w='100%' my={10}>
                                <Heading size='lg' mb={2}>
                                    🛠 Skills
                                </Heading>
                                <Flex wrap='wrap'>
                                    {skills.map((skill, index) => {
                                        return <Tab name={skill} index={index} key={index} />
                                    })}
                                </Flex>
                            </Box>

                            <Box w='100%' my={10}>
                                <Heading size='lg' mb={2}>
                                    👋 Interested in meeting
                                </Heading>
                                <Flex wrap='wrap'>
                                    {interests.map((interest, index) => {
                                        return <Tab name={interest} index={index} key={index} />
                                    })}
                                </Flex>
                            </Box>
                            <NftGallery address={profile.address} />
                        </>
                    ) : (
                        <>
                            <FormControl id='pfp'>
                                <FormLabel>Profile Picture</FormLabel>
                                <InputGroup justifyContent='center'>
                                    <input
                                        id='pfpImg'
                                        type='file'
                                        accept={'image/*'}
                                        style={{ display: 'none' }}
                                        {...register('pfp')}></input>
                                    <Image
                                        src={editPfp}
                                        onClick={() => {
                                            document.getElementById('pfpImg')?.click()
                                        }}
                                        width={200}
                                        height={200}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id='name' isRequired mt={0}>
                                <FormLabel>Username</FormLabel>
                                <InputGroup borderColor='#E0E1E7'>
                                    <Input
                                        variant='filled'
                                        type='text'
                                        {...register('name', {
                                            required: 'This is required',
                                        })}
                                        defaultValue={profile.name}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id='description' isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    resize='none'
                                    {...sharedTxtInputProps}
                                    placeholder='Something about you'
                                    {...register('description', {
                                        required: 'This is required',
                                    })}
                                    defaultValue={profile.description}
                                />
                            </FormControl>
                            <FormControl id='location'>
                                <FormLabel>Location</FormLabel>
                                <Input
                                    {...sharedInputProps}
                                    placeholder='Where are you located?'
                                    {...register('location')}
                                    defaultValue={profile.location}
                                />
                            </FormControl>
                            <FormControl id='organization'>
                                <FormLabel>Organization</FormLabel>
                                <Input
                                    {...sharedInputProps}
                                    placeholder='Where do you work'
                                    {...register('organization')}
                                    defaultValue={profile.organization}
                                />
                            </FormControl>
                            <FormControl id='jobTitle'>
                                <FormLabel>Job Title</FormLabel>
                                <Input
                                    {...sharedInputProps}
                                    placeholder='What is your Job Title'
                                    {...register('job_title')}
                                    defaultValue={profile.job_title}
                                />
                            </FormControl>

                            <Box mt={10} w='100%'>
                                <Box>
                                    {socialInputs.map(({ name, label, icon, placeholder }) => (
                                        <FormControl id={name} key={name} my={1}>
                                            <InputGroup borderColor='#E0E1E7'>
                                                <InputLeftAddon children={icon} borderRight='2px solid white' />
                                                <Input
                                                    {...sharedInputProps}
                                                    placeholder={placeholder}
                                                    {...register(name)}
                                                    defaultValue={profile[name]}
                                                />
                                            </InputGroup>
                                        </FormControl>
                                    ))}
                                </Box>
                            </Box>

                            <Box w='100%' my={10}>
                                <Flex direction='row' alignItems='center'>
                                    <Heading size='lg' mb={2}>
                                        🛠 Skills
                                    </Heading>
                                    <Stat ml={4}>
                                        <StatHelpText>(Comma Separated)</StatHelpText>
                                    </Stat>
                                </Flex>
                                <FormControl id='skills'>
                                    <FormLabel>Skills</FormLabel>
                                    <Input
                                        {...sharedInputProps}
                                        placeholder='What are your skills'
                                        {...register('skills')}
                                        defaultValue={skills.toString()}
                                        onChange={e => {
                                            setSkills(e.target.value.split(', '))
                                        }}
                                    />
                                </FormControl>
                                <Flex wrap='wrap'>
                                    {skills.map((skill, index) => {
                                        return <Tab index={index} name={skill} key={index}/>
                                    })}
                                </Flex>
                            </Box>

                            <Box w='100%' my={10}>
                                <Flex direction='row' alignItems='center'>
                                    <Heading size='lg' mb={2}>
                                        👋 Interested in meeting
                                    </Heading>
                                    <Stat ml={4}>
                                        <StatHelpText>(Comma Separated)</StatHelpText>
                                    </Stat>
                                </Flex>
                                <FormControl id='IM'>
                                    <FormLabel>Interests</FormLabel>
                                    <Input
                                        {...sharedInputProps}
                                        placeholder='Who are you interested in meeting'
                                        {...register('interests')}
                                        defaultValue={interests.toString()}
                                        onChange={e => {
                                            setInterests(e.target.value.split(', '))
                                        }}
                                    />
                                </FormControl>
                                <Flex wrap='wrap'>
                                    {interests.map((skill, index) => {
                                        return <Tab index={index} name={skill} key={index}/>
                                    })}
                                </Flex>
                            </Box>
                        </>
                    )}
                    {isEditing ? (
                        <>
                            <Text
                                as='button'
                                position='absolute'
                                left='0px'
                                top='0px'
                                onClick={handleSubmit(onSubmit)}
                                m={6}
                                fontWeight='medium'
                                fontSize={20}>
                                Save
                            </Text>
                            <Text
                                as='button'
                                position='absolute'
                                right='0px'
                                top='0px'
                                onClick={() => {
                                    setIsEditing(false)
                                }}
                                m={6}
                                fontWeight='medium'
                                fontSize={20}>
                                Cancel
                            </Text>
                        </>
                    ) : (
                        <Text
                            as='button'
                            position='absolute'
                            right='0px'
                            top='0px'
                            onClick={() => {
                                setIsEditing(true)
                            }}
                            m={6}
                            fontWeight='medium'
                            fontSize={20}>
                            Edit
                        </Text>
                    )}
                </CenteredContainer>
            </Layout>
        </Flex>
    )
}
