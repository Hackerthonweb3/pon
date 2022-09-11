/** Component for a user profile */
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Text, Flex, Button, FormControl } from '@chakra-ui/react'

import { useOrbis } from '~/hooks'
import { ipfsClient } from '~/lib'
import { EditableField } from './Profile/EditableField'
import { FileUploader } from './FileUploader'
import NftGallery from './NftGallery'
import List from './List'
import ImageMask from './ImageMask'
import ProfileIcon from '../media/avatar.svg'
import ProfileOneIcon from '../media/p1.png'
import ProfileTwoIcon from '../media/p2.png'

// change to contact data
const mockCProfile = [{ title: 'hidetaka.eth', icon: ProfileIcon, text: '@deepdiver_web3' }]

const mockNfts = [
    {
        id: '1',
        icon: ProfileOneIcon,
    },
    {
        id: '2',
        icon: ProfileTwoIcon,
    },
    {
        id: '1',
        icon: ProfileOneIcon,
    },
]

export default function UserProfile({ isMyProfile, profile }: any) {
    const [isEdit, setIsEdit] = useState(false)
    const [profileData, setProfileData] = useState(profile)
    const [pfpCid, setPfpCid] = useState(profile?.pfp)
    const [updateMsg, setUpdateMsg] = useState('')
    const { handleSubmit, control } = useForm()
    const { connect, updateProfile } = useOrbis()
    const [error, setError] = useState(null as any)

    const router = useRouter()

    function showAll() {
        router.push('/contacts')
    }

    const handleEdit = () => {
        setIsEdit(!isEdit)
    }

    function handleDisplayMsg(setMessage: any, msg: string) {
        setMessage(msg)
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }

    useEffect(() => {
        setProfileData(profile)
        setPfpCid(profile?.pfp)
    }, [profile])

    async function onSubmit(fileVals: any) {
        const newData = { ...profileData }
        let ipfsPath = null

        if (fileVals.pfp) {
            ipfsPath = await ipfsClient.add(fileVals.pfp)
            newData.pfp = ipfsPath?.path
        }

        const connected = await connect()

        if (connected) {
            const { updated, error } = await updateProfile(newData)

            if (updated) {
                setPfpCid(ipfsPath?.path)
                handleDisplayMsg(setUpdateMsg, 'Updated')
            }
            if (error) {
                handleDisplayMsg(setError, error)
            }
        }
    }

    // TODO add note from orbis
    const renderNote = !isMyProfile && (
        <>
            <Flex justifyContent='space-between' px={2}>
                <Text fontWeight={400}>{mockNfts.length} Your Note</Text>
                <Text cursor='pointer' fontWeight={400} color='blue.400' onClick={showAll}>
                    Edit
                </Text>
            </Flex>
            <Flex>Met at EthCC Hack and ETHBarcelona</Flex>
        </>
    )
    const renderContacts = mockNfts.length && isMyProfile && <NftGallery data={mockNfts} />

    const profileImage = pfpCid ? (
        <ImageMask imageCid={pfpCid} />
    ) : (
        <Image src={ProfileIcon} width='80px' height='80px' alt='avatar' />
    )

    const renderProfileImageVal = !isEdit ? (
        profileImage
    ) : (
        <FileUploader placeholder='Your avatar' control={control} name='pfp' acceptedFileTypes='image/*'>
            PFP
        </FileUploader>
    )

    return (
        <>
            {isMyProfile && (
                <>
                    <Text color='red.400'>{error}</Text>
                    <Flex
                        fontWeight='bold'
                        letterSpacing='1px'
                        color='cyan.400'
                        cursor='pointer'
                        justifyContent={'flex-end'}
                        onClick={handleEdit}>
                        {isEdit ? (
                            <Flex justifyContent='flex-end'>
                                <Button variant='outline' mr={4} onClick={() => setIsEdit(false)}>
                                    Cancel
                                </Button>
                                <FormControl id='button'>
                                    <Button onClick={handleSubmit(onSubmit)}>Update profile</Button>
                                </FormControl>
                            </Flex>
                        ) : (
                            'Edit my page'
                        )}
                    </Flex>
                </>
            )}
            <Box p={1}>
                {isMyProfile ? (
                    <>
                        {renderProfileImageVal}
                        {profile?.name && (
                            <>
                                <EditableField
                                    fontSize='24px'
                                    isEdit={isEdit}
                                    value={profileData?.name}
                                    onSubmit={val =>
                                        setProfileData({
                                            ...profileData,
                                            name: val,
                                        })
                                    }
                                />
                                <EditableField
                                    isEdit={isEdit}
                                    value={profileData?.description}
                                    onSubmit={val =>
                                        setProfileData({
                                            ...profileData,
                                            description: val,
                                        })
                                    }
                                />
                                <EditableField
                                    isEdit={isEdit}
                                    value={profileData?.twitter}
                                    onSubmit={val =>
                                        setProfileData({
                                            ...profileData,
                                            twitter: val,
                                        })
                                    }
                                />
                            </>
                        )}
                        <Text color='red.500'>{updateMsg}</Text>
                    </>
                ) : (
                    <List data={mockCProfile} />
                )}
            </Box>
            {renderContacts}
            {renderNote}
            <Box>Prefered contact method</Box>
        </>
    )
}
