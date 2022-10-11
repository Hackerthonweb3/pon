import { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { Heading, Text, VStack, FormControl, FormLabel, Input, InputGroup, Textarea, Button, Flex } from '@chakra-ui/react'

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
    },
    {
        name: 'telegram',
        placeholder: 'Your Telegram handle',
        label: 'Telegram',
    },
    {
        name: 'lens',
        placeholder: 'Your lens handle',
        label: 'Lens',
    },
    {
        name: 'discord',
        placeholder: 'Your discord id',
        label: 'Discord',
    },
    {
        name: 'github',
        placeholder: 'Your github handle',
        label: 'Github',
    },
    {
        name: 'linkedin',
        placeholder: 'Your linkedIn handle',
        label: 'LinkedIn',
    },
    {
        name: 'email',
        placeholder: 'Your email',
        label: 'Email',
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

    const createProfile = async (newUserData) => {
        // trigger reconnection to get did
        const result = await orbis?.isConnected()

        if (result.did) {
            console.log('checking profile for did', result.did)

            let { updated, error } = await orbis?.updateProfile(newUserData)

            if (error) {
                console.log('error fetching profile', error)
                setError(error)
                return false;
            }

            return true;
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
            }
        } else {
            newData.pfp = ''
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

    const renderPageOne = (
        <>
            <Flex width="100%" justifyContent="right"  alignItems="right" pr={2}>
                <Text
                    cursor="pointer"
                    textAlign='right'
                    onClick={() => setPageNum(2)}
                    fontSize='l' mt={{ sm: 3, md: 3, lg: 5 }}
                    color='blue.300'>
                    Next
                </Text>
            </Flex>
            <Text color='red.400'>{error}</Text>
            <FormControl id='name' isRequired>
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
            <FileUploader name='cover' acceptedFileTypes='image/*' placeholder='Your cover image' control={control}>
                Cover image
            </FileUploader>
            <FileUploader name='pfp' acceptedFileTypes='image/*' placeholder='Your avatar' control={control}>
                PFP
            </FileUploader>
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
            <FormControl id='organization'>
                <FormLabel>Organization</FormLabel>
                <Input
                    {...sharedInputProps}
                    placeholder='Where do you work'
                    {...register('organization')}
                />
            </FormControl>
            <FormControl id='organization'>
                <FormLabel>Skills</FormLabel>
                <Input
                    {...sharedInputProps}
                    placeholder='What are your skills'
                    {...register('skills')}
                />
            </FormControl>
            <FormControl id='organization'>
                <FormLabel>Interested in meeting</FormLabel>
                <Input
                    {...sharedInputProps}
                    placeholder='Please enter who do you want to meet'
                    {...register('wantToMeet')}
                />
            </FormControl>
        </>
    )
    
    const renderPageTwo = (
        <>
            <Flex width="100%" justifyContent="left"  alignItems="left" pr={2}>
                <Text
                    textAlign='left'
                    onClick={() => setPageNum(1)}
                    fontSize='l' mt={{ sm: 3, md: 3, lg: 5 }}
                    color='blue.300'>
                    Back
                </Text>
            </Flex>
            {socialInputs.map((input) => (
                <FormControl id={input.name} key={input.name}>
                    <FormLabel>{input.label}</FormLabel>
                    <InputGroup borderColor='#E0E1E7'>
                        <Input {...sharedInputProps} placeholder={input.placeholder} {...register(input.name)} />
                    </InputGroup>
                </FormControl>
            ))}
            <FormControl id='button'>
                <Button onClick={handleSubmit(onSubmit)}>Create profile</Button>
            </FormControl>
        </>
    )

    
    const renderInputs = pageNum === 1 ? renderPageOne : renderPageTwo;

    return (
        <VStack spacing='6'>
            <Heading
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                lineHeight={'110%'}
                letterSpacing='1px'>
                Create your Profile ({pageNum} of 2)
            </Heading>
            {renderInputs}
        </VStack>
    )
}
