/** Component for a user profile */
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Box, Text, Flex, Button, FormControl } from '@chakra-ui/react'

// import { useOrbis } from '~/hooks'
import { ipfsClient } from '~/lib'
import { EditableField } from './Profile/EditableField'
import { FileUploader } from './FileUploader'
import List from './List'
import ImageMask from './ImageMask'
import ProfileIcon from '../media/avatar.svg'
import Profile from './Profile'

export default function UserProfile({ isMyProfile, profile }: any) {
    const [isEdit, setIsEdit] = useState(false)
    const [profileData, setProfileData] = useState(profile)
    const [pfpCid, setPfpCid] = useState(profile?.pfp)
    const [updateMsg, setUpdateMsg] = useState('')
    const { handleSubmit, control } = useForm()
    // const { connect, updateProfile } = useOrbis()
    const [error, setError] = useState(null as any)

    const router = useRouter()

    useEffect(() => {
        console.log('profile')
        console.log(profile)
        setProfileData(profile)
        setPfpCid(profile?.pfp)
    }, [])

    return <Profile />
}
