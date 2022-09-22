import { Image, StyleSheet } from 'react-native'

import { ContainerFlex, SpaceStart } from './DesignSystem'
import { Divider } from './StyledDivider'
import { Note } from './StyledText'

// configs
const socialImgs: any = {
    twitter: require('../assets/images/socials/sns-twitter.png'),
    telegram: require('../assets/images/socials/telegram.png'),
    discord: require('../assets/images/socials/sns-discord.png'),
    email: require('../assets/images/socials/email.png'),
}
const socialsList = ['twitter', 'telegram', 'email', 'discord']

const styles = StyleSheet.create({
    avatar: {
        width: 108,
        height: 108,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
    },
})
const sharedContanterStyle = {
    lightColor: '#ecf3f6',
    darkColor: '#353844',
}

const SocialItem = (item: any, profile: any) => {
    const hasProfileItem = profile[item]
    if (!hasProfileItem) return null

    return (
        <>
            <SpaceStart>
                <Image style={styles.avatar} source={socialImgs[item]} />
                <Note>{hasProfileItem}</Note>
            </SpaceStart>
            <Divider />
        </>
    )
}

export function Social(props: any) {
    const { profile } = props

    return (
        <ContainerFlex {...sharedContanterStyle} m='0px' p='10px' br='12px'>
            {socialsList.map((item: string, index: any) => {
                return <SocialItem item={item} profile={profile} key={index} />
            })}
        </ContainerFlex>
    )
}
