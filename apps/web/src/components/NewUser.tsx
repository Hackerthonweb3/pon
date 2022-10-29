/* eslint-disable */
import { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
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
    Box,
    Tag,
    Badge
} from '@chakra-ui/react'
import { FiMail, FiTwitter, FiGithub, FiInstagram, FiLinkedin, FiSend } from 'react-icons/fi'
import { FaDiscord, FaLeaf } from 'react-icons/fa'

import { ipfsClient } from '~/lib'
import { useOrbis } from '~/hooks'
import { Profile } from '~/hooks'
import { FileUploader } from './FileUploader'
import { create } from 'ipfs-http-client'
import { OrbisContext } from '~/contexts'

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
    const router = useRouter()
    const { address } = useAccount()
    const { connect, profile, updateProfile } = useOrbis()
    const { handleSubmit, register, control } = useForm()
    const [error, setError] = useState(null as any)
    const [pageNum, setPageNum] = useState(1)
    const orbis = useContext(OrbisContext)

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

        if (newData.cover) {
            try {
                const created = await ipfsClient.add(data.cover)
                newData.cover = created.path
            } catch (error) {
                setError(error)
                newData.cover = ''
            }
        } else {
            newData.cover = ''
        }

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

        if (newData.skills) {
            try {
                const created = await ipfsClient.add(skills.toString())
                newData.skills = created
            } catch (error) {
                setError(error)
                newData.skills = ''
            }
        } else {
            newData.skills = ''
        }

        if (newData.interests) {
            try {
                const created = await ipfsClient.add(Interests.toString())
                newData.interests = created
            } catch (error) {
                setError(error)
                newData.interests = ''
            }
        } else {
            newData.interests = ''
        }

        const isCreated = await createProfile(newData)

        if (isCreated) {
            router.push('/profile')
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

    const [skills, setSkills] = useState([] as string[]);

    const addSkill = (e:any) => { 
        const skill = e.target.value.trim();
        if (skill === "") {
            console.log("empty skill");
        }
        else (
            setSkills([...skills, skill])
        )
        console.log(e.target.value.trim());
        console.log(skills);
        e.target.value = "";
    }

    const [Interests, setInterests] = useState([] as string[]);

    const addInterest = (e:any) => { 
        const Interest = e.target.value.trim();
        if (Interest === "") {
            console.log("empty skill");
        }
        else (
            setInterests([...Interests, Interest])
        )
        console.log(e.target.value.trim());
        console.log(Interests);
        e.target.value = "";
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

    const renderPageOne = (
        <>
            <Flex width='100%' justifyContent='right' alignItems='right' px={2}>
                <Text
                    cursor='pointer'
                    textAlign='right'
                    onClick={() => setPageNum(pageNum+1)}
                    fontSize='l'
                    mt={{ sm: 3, md: 3, lg: 5 }}
                    color='blue.300'>
                    Next
                </Text>
            </Flex>
            <Text color='red.400'>{error}</Text>
            <FormControl id='name' isRequired mt={0}>
                <FormLabel>Username</FormLabel>
                <InputGroup borderColor='#E0E1E7'>
                    <Input
                        variant='filled'
                        type='text'
                        {...register('name', {
                            required: 'This is required',
                        })}
                    />
                </InputGroup>
            </FormControl>
            <FormControl id='description' isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                    {...sharedTxtInputProps}
                    placeholder='Something about you'
                    {...register('description', {
                        required: 'This is required',
                    })}
                />
            </FormControl>
            <FormControl id='location'>
                <FormLabel>Location</FormLabel>
                <Input {...sharedInputProps} placeholder='Where are you located?' {...register('location')} />
            </FormControl>
            <FileUploader name='cover' acceptedFileTypes='image/*' placeholder='Your cover image' control={control}>
                Cover image
            </FileUploader>
            <FileUploader name='pfp' acceptedFileTypes='image/*' placeholder='Your avatar' control={control}>
                PFP
            </FileUploader>

            <FormControl id='organization'>
                <FormLabel>Organization</FormLabel>
                <Input {...sharedInputProps} placeholder='Where do you work' {...register('organization')} />
            </FormControl>
            <FormControl id='jobTitle'>
                <FormLabel>Job Title</FormLabel>
                <Input {...sharedInputProps} placeholder='What is your Job Title' {...register('job_title')} />
            </FormControl>
            <FormControl id='skills'>
                <FormLabel>Skills</FormLabel>
                <Input {...sharedInputProps}
                    placeholder='What are your skills'
                    onKeyDown={(e) => { if (e.key === "Enter") addSkill(e) }} {...register('skills')}
                />
                {
                    skills.map((skill, index) => { 
                        return (
                            <Badge colorScheme={colourSchemes[index]} mx={2}>{skill}</Badge>
                        )
                    })
                }
            </FormControl>
            <FormControl id='IM'>
                <FormLabel>Interested in meeting</FormLabel>
                <Input
                    {...sharedInputProps}
                    placeholder='What kind of people are interested in meeting?'
                    onKeyDown={(e) => { if (e.key === "Enter") addInterest(e) }} {...register('interests')}
                />
                {
                    Interests.map((Interest, index) => { 
                        return (
                            <Badge colorScheme={colourSchemes[index]} mx={2}>{Interest}</Badge>
                        )
                    })
                }
            </FormControl>
        
        </>
    )

    const renderPageTwo = (
        <>
            <Flex width='100%' justifyContent='left' alignItems='left' px={2}>
                <Text
                    textAlign='left'
                    onClick={() => setPageNum(pageNum-1)}
                    fontSize='l'
                    mt={{ sm: 3, md: 3, lg: 5 }}
                    color='blue.300'>
                    Back
                </Text>
            </Flex>
            {socialInputs.map(({ name, label, icon, placeholder }) => (
                <FormControl id={name} key={name}>
                    <InputGroup borderColor='#E0E1E7'>
                        <InputLeftAddon children={icon} />
                        <Input {...sharedInputProps} placeholder={placeholder} {...register(name)} />
                    </InputGroup>
                </FormControl>
            ))}
            <FormControl id='button'>
                <Button onClick={handleSubmit(onSubmit)}>Create profile</Button>
            </FormControl>
        </>
    )

    const renderInputs = pageNum === 1 ? renderPageOne : renderPageTwo

    return (
        <VStack spacing='4'>
            <Heading
                fontWeight={600}
                fontSize={{ base: '1xl', sm: '2xl', md: '2xl' }}
                lineHeight={'110%'}
                letterSpacing='1px'>
                Create your Profile ({pageNum} of 2)
            </Heading>
            <Box mb={10} w="100%" h="100%">
                {renderInputs}
            </Box>
        </VStack>
    )
}
