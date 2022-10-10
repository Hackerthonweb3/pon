import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { Heading, Text, VStack, FormControl, FormLabel, Input, InputGroup, Textarea, Button } from '@chakra-ui/react'

import { ipfsClient } from '~/lib'
// import { useOrbis } from '~/hooks'
import { Profile } from '~/hooks'
import { FileUploader } from './FileUploader'
import { create } from 'ipfs-http-client'

export default function NewUser() {
    const router = useRouter()
    const { address } = useAccount()
    // const { connect, profile, updateProfile } = useOrbis()
    const { handleSubmit, register, control } = useForm()
    const [error, setError] = useState(null as any)

    // useEffect(() => {
    //     if (!address) {
    //         router.push('/')
    //     }
    //     if (profile && profile.name) {
    //         console.log('profile found', profile.name)
    //         router.push('/profile')
    //     }
    // })

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

        // const connected = await connect()

        // if (connected) {
        //     const { updated, error } = await updateProfile(newData)

        //     if (updated) router.push('/profile')
        //     if (error) setError(error)
        // }
    }

    return (
        <VStack spacing='6'>
            <Heading
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                lineHeight={'110%'}
                letterSpacing='1px'>
                New Profile
            </Heading>
            <Text fontSize='l' mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
                Set up your data
            </Text>
            <Text color='red.400'>{error}</Text>
            <FormControl id='name' isRequired>
                <FormLabel>Nickname</FormLabel>
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
                    variant='filled'
                    _hover={{
                        borderColor: 'gray.300',
                    }}
                    placeholder='Something about you'
                    {...register('description', {
                        required: 'This is required',
                    })}
                />
            </FormControl>

            <FormControl id='twitter'>
                <FormLabel>Twitter account</FormLabel>
                <InputGroup borderColor='#E0E1E7'>
                    <Input variant='filled' type='text' {...register('twitter', {})} />
                </InputGroup>
            </FormControl>
            <FormControl id='button'>
                <Button onClick={handleSubmit(onSubmit)}>Create profile</Button>
            </FormControl>
        </VStack>
    )
}
