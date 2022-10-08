import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { Heading, Text, VStack, FormControl, FormLabel, Input, InputGroup, Textarea, Button, Box } from '@chakra-ui/react'

import { ipfsClient } from '~/lib'
import { useOrbis } from '~/hooks'
import { Profile } from '~/hooks'
// import { FileUploader } from './FileUploader'
import { create } from 'ipfs-http-client'
import { Orbis } from '@orbisclub/orbis-sdk'

const layout = [{
    heading: 'Basic Info',
    fields: [
        {
            name: 'title',
            placeholder: 'Please enter an Event title',
            type: '',
            heading: 'Event title',
        },
        {
            name: 'organizer',
            placeholder: 'Enter name of the organizer',
            type: '',
            heading: 'Organizer'
        },
    ]
}, {
    heading: 'Location',
    fields: [
        {
            name: 'location',
            placeholder: 'Enter Event or location',
            type: '',
            heading: 'Let attendees know where to show up',
        },
    ]
}, {
    heading: 'Date and time',
    fields: [
        {
            name: 'date.day',
            placeholder: 'Select start date',
            type: '',
        },
        {
            name: 'date.time',
            placeholder: 'Enter start time',
            type: '',
        },
        {
            name: 'date.ending',
            placeholder: 'Select ending date',
            type: '',
        },
    ]
}];

export default function NewUser() {
    const { orbis } = useOrbis();
    const router = useRouter()
    const { address } = useAccount()
    const { orbis, profile } = useOrbis()
    const { handleSubmit, register, control } = useForm()
    const [error, setError] = useState(null as any)

    useEffect(() => {
        if (!address) {
            router.push('/')
        }
        if (profile && profile.name) {
            console.log('profile found', profile.name)
            router.push('/profile')
        }
    })

    const onSubmit = async (data: any) => {
        const newData = { ...data }
        const result = await orbis.createGroup({
            name: "Orbis Community",
            description: '',
            pfp: '',
        });
        console.log(result);

        if (result.status === 200) {
            router.push('/event')
        } else {
            if (error) setError(error)
        }

    }

    return (
        <VStack spacing='6'>
            <Heading
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                lineHeight={'110%'}
                letterSpacing='1px'>
                Basic Info
            </Heading>
            <Text fontSize='l' mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
                Name event and tell your attendees why they should come.
            </Text>
            <Text color='red.400'>{error}</Text>
            {
                layout.map(section => (
                    <Box key={section.heading} width="100%">
                        <Heading>{section.heading}</Heading>
                        {
                            section.fields.map(field => (
                                <FormControl id={field.name} key={field.name}>
                                    <FormLabel>{field.heading}</FormLabel>
                                    <Input
                                        variant='filled'
                                        _hover={{
                                            borderColor: 'gray.300',
                                        }}
                                        placeholder={field.placeholder}
                                        {...register(field.name, {
                                            // required: 'This is required',
                                        })}
                                    />
                                </FormControl>
                            ))
                        }
                    </Box>
                ))
            }
            {/* <FormControl id='name' isRequired>
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
            </FormControl> */}
            {/* TODO: File Uploader */}
            {/* <FileUploader name='cover' acceptedFileTypes='image/*' placeholder='Your cover image' control={control}>
                Cover image
            </FileUploader>
            <FileUploader name='pfp' acceptedFileTypes='image/*' placeholder='Your avatar' control={control}>
                PFP
            </FileUploader> */}
            {/* <FormControl id='description' isRequired>
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
            </FormControl> */}

            <FormControl id='button'>
                <Button onClick={handleSubmit(onSubmit)} width="100%">Create event</Button>
            </FormControl>
        </VStack>
    )
}
