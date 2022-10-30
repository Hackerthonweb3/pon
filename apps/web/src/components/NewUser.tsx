/* eslint-disable */
import { useEffect, useState, useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'
import {
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
    InputRightAddon,
    Box,
    Badge,
    Image,
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
    Stack,
} from '@chakra-ui/react'
import { FiMail, FiTwitter, FiGithub, FiInstagram, FiLinkedin, FiSend } from 'react-icons/fi'
import { FaDiscord, FaLeaf } from 'react-icons/fa'
import { ipfsClient } from '~/lib'
import { useOrbis } from '~/hooks'
import { Profile } from '~/hooks'
import { FileUploader } from './FileUploader'
import { create } from 'ipfs-http-client'
import { OrbisContext } from '~/contexts'
import { CloseIcon, AddIcon } from '@chakra-ui/icons'

const socialInputs = [
    {
        name: 'twitter',
        placeholder: 'Your twitter handle',
        label: 'Twitter',
        icon: <FiTwitter />,
    },
    {
        name: 'telegram',
        placeholder: 'Your Telegram handle',
        label: 'Telegram',
        icon: <FiSend />,
    },
    {
        name: 'lens',
        placeholder: 'Your lens handle',
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
        placeholder: 'Your github handle',
        label: 'Github',
        icon: <FiGithub />,
    },
    {
        name: 'linkedin',
        placeholder: 'Your linkedIn handle',
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

export default function NewUser() {
    const { push } = useRouter()
    const pfpRef = useRef()
    const router = useRouter()
    const { address } = useAccount()
    const { connect, profile, updateProfile } = useOrbis()
    const { handleSubmit, register, control } = useForm()
    const [error, setError] = useState(null as any)
    const orbis = useContext(OrbisContext)

    const [pageNum, setPageNum] = useState(1)
    useEffect(() => {
        if (pageNum < 1) setPageNum(1)
        if (pageNum > 8) setPageNum(8)
    }, [pageNum])

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
                const created = await ipfsClient.add(data.pfp)
                newData.pfp = created.path
            } catch (error) {
                setError(error)
                newData.pfp = ''
            }
        } else {
            newData.pfp = ''
        }

        newData.skills = skillTags

        newData.interests = interestTags

        console.log(newData)

        const isCreated = await createProfile(newData)
        

        if (isCreated) {
            setSuccess(true)
        }
    }

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

    const colourSchemes = [
        'pink',
        'linkedin',
        'facebook',
        'messenger',
        'whatsapp',
        'twitter',
        'red',
        'orange',
        'yellow',
        'green',
        'teal',
        'blue',
        'cyan',
        'purple',
        'telegram',
    ]

    const Tab = ({ name, index }: string) => {
        return (
            <Flex
                backgroundColor={`${colourSchemes[index]}.100`}
                w='fit'
                m={2}
                borderRadius={6}
                alignItems='center'
                h='min'>
                <Text mx={4} fontSize='lg' wordBreak='keep-all'>
                    {name}
                </Text>
            </Flex>
        )
    }

    const [chosenImg, setChosenImg] = useState('No file chosen')

    const renderPageOne = (
        <Flex alignItems='center' direction='column' w='100vw' px={4}>
            <Heading size='sm' mb={4}>
                Profile Picture
            </Heading>
            <FormControl id='pfp'>
                <InputGroup justifyContent='center'>
                    {/* <FileUploader/> */}
                    <input
                        id='pfpImg'
                        type='file'
                        // onChange={event => onChange(event?.target?.files?.[0])}
                        // onChange={e => { console.log(e.target.files[0]);  setPfpImg(e.target.files[0])}}
                        accept={'image/*'}
                        style={{ display: 'none' }}
                        {...register('pfp')}></input>
                    <Image
                        src='/icons/ChoosePhoto.svg'
                        onClick={() => {
                            document.getElementById('pfpImg')?.click()
                            setChosenImg(document.getElementById('pfpImg')?.files?.[0]?.name)
                        }}
                    />
                </InputGroup>
            </FormControl>
            <Text>{chosenImg}</Text>
        </Flex>
    )

    const renderPageTwo = (
        <Flex alignItems='center' direction='column' w='100vw' px={4}>
            <Heading size='sm' mb={4}>
                Username
            </Heading>
            <FormControl id='name' isRequired mt={0}>
                <InputGroup borderColor='#E0E1E7'>
                    <Input
                        variant='filled'
                        placeholder='Enter your preferred username'
                        type='text'
                        {...register('name', {
                            required: 'This is required',
                        })}
                    />
                </InputGroup>
            </FormControl>
        </Flex>
    )

    const renderPageThree = (
        <Flex alignItems='center' direction='column' w='100vw' px={4}>
            <Heading size='sm' mb={4}>
                Location
            </Heading>
            <FormControl id='location'>
                <Input {...sharedInputProps} placeholder='Enter your current location' {...register('location')} />
            </FormControl>
        </Flex>
    )

    const renderPageFour = (
        <Flex alignItems='center' direction='column' w='100vw' px={4}>
            <Heading size='sm' mb={4}>
                A quick intro
            </Heading>
            <FormControl id='description' isRequired>
                <Textarea {...sharedTxtInputProps} placeholder='Max. 250 characters' {...register('description')} />
            </FormControl>
        </Flex>
    )

    const renderPageFive = (
        <Flex alignItems='center' direction='column' w='100vw' px={4}>
            <Heading size='sm' mb={4}>
                Role and organisation
            </Heading>
            <FormControl id='jobTitle' mb={4}>
                <Input {...sharedInputProps} placeholder='Your role' {...register('job_title')} />
            </FormControl>
            <FormControl id='organization'>
                <Input {...sharedInputProps} placeholder='Organisation' {...register('organization')} />
            </FormControl>
        </Flex>
    )

    const [skillTags, setSkillTags] = useState([] as string[])

    const addSkillTag = (e: any) => {
        const skill = e.target.value.trim()
        if (skill === '') {
            console.log('empty skill')
        } else {
            setSkillTags([...skillTags, skill])
        }
        e.target.value = ''
    }

    const addSkillTagFromList = (skillName, index) => {
        const skill = skillName.trim()
        if (skill === '') {
            console.log('empty skill')
        } else {
            setSkillTags([...skillTags, skill])
        }
        skillsList.splice(index, 1)
    }

    const removeSkillTag = skill => {
        let array = [...skillTags]
        array.splice(skill.split('|')[1], 1)
        setSkillTags(array)
    }

    const [skillsList, setSkillsList] = useState([
        'Front-end',
        'Back-end',
        'Full-stack',
        'UI/UX',
        'JavaScript',
        'Python',
        'Ruby',
    ])

    const renderPageSix = (
        <Flex alignItems='center' direction='column' w='100vw' px={4}>
            <Heading size='sm' mb={4}>
                Skills
            </Heading>
            <FormControl id='skills'>
                <Flex
                    border='1px solid #E0E1E7'
                    alignItems='center'
                    wrap='wrap'
                    background='gray.100'
                    borderRadius='md'>
                    {skillTags.map((skill, index) => {
                        return (
                            <Tag size='lg' m={2} colorScheme={colourSchemes[index]} key={index}>
                                {skill}
                                <TagRightIcon
                                    as={CloseIcon}
                                    id={skill + '|' + index}
                                    onClick={e => {
                                        removeSkillTag(e.target.id)
                                    }}
                                />
                            </Tag>
                        )
                    })}
                    <Input
                        border='none'
                        placeholder='Type or select a skill from the list'
                        _focusVisible={{
                            border: '1px solid transparent',
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') addSkillTag(e)
                        }}
                    />
                    <Input display='none' value={skillTags} {...register('skills')} />
                </Flex>
                <Flex wrap='wrap' mt={4}>
                    {skillsList.map((skill, index) => {
                        return (
                            <Tag size='lg' m={2} colorScheme={colourSchemes[colourSchemes.length - index]} key={index}>
                                {skill}
                                <TagRightIcon
                                    as={AddIcon}
                                    id={skill + '|' + index}
                                    onClick={() => {
                                        addSkillTagFromList(skill, index)
                                    }}
                                />
                            </Tag>
                        )
                    })}
                </Flex>
            </FormControl>
        </Flex>
    )

    const [interestTags, setInterestTags] = useState([] as string[])

    const addInterestTag = (e: any) => {
        const interest = e.target.value.trim()
        if (interest === '') {
            console.log('empty skill')
        } else {
            setInterestTags([...interestTags, interest])
        }
        e.target.value = ''
    }

    const addInterestTagFromList = (interestName, index) => {
        const Interest = interestName.trim()
        if (Interest === '') {
            console.log('empty skill')
        } else {
            setInterestTags([...interestTags, Interest])
        }
        interestsList.splice(index, 1)
    }

    const removeInterestTag = interest => {
        let array = [...interestTags]
        array.splice(interest.split('|')[1], 1)
        setInterestTags(array)
    }

    const [interestsList, setInterestsList] = useState([
        'Engineers',
        'Designers',
        'Entrepreneurs',
        'Students',
        'Mentors',
    ])

    const renderPageSeven = (
        <Flex alignItems='center' direction='column' w='100vw' px={4}>
            <Heading size='sm' mb={4}>
                Interest in meeting
            </Heading>
            <FormControl id='IM'>
                <Flex
                    border='1px solid #E0E1E7'
                    alignItems='center'
                    wrap='wrap'
                    background='gray.100'
                    borderRadius='md'>
                    {interestTags.map((interest, index) => {
                        return (
                            <Tag size='lg' m={2} colorScheme={colourSchemes[index]} key={index}>
                                {interest}
                                <TagRightIcon
                                    as={CloseIcon}
                                    id={interest + '|' + index}
                                    onClick={e => {
                                        removeInterestTag(e.target.id)
                                    }}
                                />
                            </Tag>
                        )
                    })}
                    <Input
                        border='none'
                        placeholder='Type or select a skill from the list'
                        _focusVisible={{
                            border: '1px solid transparent',
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') addInterestTag(e)
                        }}
                    />
                    <Input display='none' value={interestTags} {...register('interests')} />
                </Flex>
                <Flex wrap='wrap' mt={4}>
                    {interestsList.map((interest, index) => {
                        return (
                            <Tag size='lg' m={2} colorScheme={colourSchemes[colourSchemes.length - index]} key={index}>
                                {interest}
                                <TagRightIcon
                                    as={AddIcon}
                                    id={interest + '|' + index}
                                    onClick={() => {
                                        addInterestTagFromList(interest, index)
                                    }}
                                />
                            </Tag>
                        )
                    })}
                </Flex>
            </FormControl>
        </Flex>
    )

    const renderPageEight = (
        // <Flex direction='column' maxH='100%' w='100vw' px={4} overflowY='scroll'>
        <InputGroup flexDirection='column' h='50vh' w='100vw' px={4} overflowY='scroll'>
            {socialInputs.map(({ name, label, icon, placeholder }, index) => (
                <Flex direction='column' w='100%' bg='gray.100' p={4} my={2} height='60px' key={index}>
                    <Flex fontSize='xl' fontWeight={700} justifyContent='space-between' alignItems='center'>
                        {label}
                        <InputRightAddon
                            children={<AddIcon />}
                            onClick={e => {
                                e.target.parentElement.parentElement.parentElement.parentElement.style.height =
                                    'min-content'
                                e.target.parentElement.parentElement.parentElement.nextElementSibling.style.zIndex = 1
                                e.target.parentElement.parentElement.style.display = 'none'
                            }}
                        />
                    </Flex>
                    <Flex zIndex={-10}>
                        <Input border='none' placeholder={placeholder} {...register(name)}></Input>
                    </Flex>
                </Flex>
            ))}
        </InputGroup>
        // </Flex>
    )

    //<Input {...sharedInputProps} placeholder={placeholder} {...register(name)} />
    //onClick={handleSubmit(onSubmit)}

    const successPage = (
        <Flex alignItems='center' direction='column' w='100vw' px={4} p={16}>
            <Image w='90%' src={'/icons/SuccessImage.svg'} />
            <Box textAlign='center' py={20}>
                <Heading size='xl' fontWeight='extrabold'>
                    Success!
                </Heading>
                <Box>
                    <Text fontWeight='400' fontSize='lg'>
                        Your decentralized profile is now online and you can use it to share contavts with the people
                        you meet
                    </Text>
                </Box>
            </Box>
            <Button onClick={() => push('/profile')} colorScheme='twitter' size='lg'>
                View your profile
            </Button>
        </Flex>
    )

    const [success, setSuccess] = useState(false)

    const renderInputs = [
        renderPageOne,
        renderPageTwo,
        renderPageThree,
        renderPageFour,
        renderPageFive,
        renderPageSix,
        renderPageSeven,
        renderPageEight,
        successPage,
    ]

    return (
        <VStack spacing='4' maxH='100vh' overflowY='hidden'>
            {success? (
                <Box h='100%'>{successPage}</Box>
            ) : (
                <>
                    <Box h='40%' display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                        <Box px={4} pt={10} textAlign='center' mt='20%'>
                            <Heading size='xl' fontWeight='extrabold'>
                                Create your profile
                            </Heading>
                            <Box px={8} py={6}>
                                <Text fontWeight='400' fontSize='md' color='gray'>
                                    Share a few things about yourself to other event attendees
                                </Text>
                            </Box>
                        </Box>
                        <Box
                            w='100vw'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            flexDirection='column'>
                            <Box h='10px' w='80%' background='gray.200' borderRadius='full' overflow='hidden'>
                                <motion.div
                                    style={{
                                        background: '#3083FF',
                                        transformOrigin: '0%',
                                        height: '10px',
                                    }}
                                    animate={{ width: `${pageNum * 12.5}%` }}></motion.div>
                            </Box>
                            <Text>{pageNum}/8</Text>
                        </Box>
                    </Box>
                    <Box h='40%'>{renderInputs[pageNum - 1]}</Box>
                    <Box h='20%' display='flex' w='100%' justifyContent='space-evenly'>
                        {pageNum != 1 ? (
                            <Button
                                variant='outline'
                                colorScheme='twitter'
                                size='lg'
                                w='40%'
                                onClick={() => {
                                    setPageNum(pageNum - 1)
                                }}>
                                Back
                            </Button>
                        ) : null}
                        {pageNum != 8 ? (
                            <Button
                                colorScheme='twitter'
                                size='lg'
                                w='40%'
                                onClick={() => {
                                    setPageNum(pageNum + 1)
                                }}>
                                Next
                            </Button>
                        ) : (
                            <Button colorScheme='twitter' size='lg' w='40%' onClick={handleSubmit(onSubmit)}>
                                Submit
                            </Button>
                        )}
                    </Box>
                </>
            )}
        </VStack>
    )
}
