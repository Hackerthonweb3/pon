import Image from 'next/image'

import { ContainerFlex, SpaceStart } from './DesignSystem'
import { Divider, Flex, Box } from '@chakra-ui/react'
import { Note } from './StyledText'
import emailImg from '../media/socials/email.png'
import telegramImg from '../media/socials/telegram.png'
import twitterImg from '../media/socials/sns-twitter.png'
import discordImg from '../media/socials/sns-discord.png'
import linkImg from '../media/socials/linkedin.png'
import githubImg from '../media/socials/github.png'

// configs
const socialImgs: any = {
    twitter: <Image src={twitterImg} alt='social' />,
    telegram: <Image src={telegramImg} alt='social' />,
    discord: <Image src={discordImg} alt='social' />,
    email: <Image src={emailImg} alt='social' />,
    github: <Image src={githubImg} alt='social' />,
    linkedin: <Image src={linkImg} alt='social' />,
}

const getSocialItem = (item: any, profile: any) => {
    const hasProfileItem = profile[item]
    if (!hasProfileItem) return null

    return (
        <Box mr={2}>
            {socialImgs[item]}
            <Note>{hasProfileItem}</Note>
        </Box>
    )
}

export function Social(props: any) {
    const { profile } = props
    const socialsList = ['twitter', 'telegram', 'email', 'discord', 'github']
    const renderSocials: any = []

    socialsList.forEach((item: string, index: any) => {
        if (profile[item]) {
            renderSocials.push(getSocialItem(item, profile))
        }
        return getSocialItem(item, profile)
    })

    return <Flex>{renderSocials}</Flex>
}
