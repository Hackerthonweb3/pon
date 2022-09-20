import { Image, StyleSheet } from 'react-native'
import { ContainerFlex, SpaceStart } from './DesignSystem'
import { Note } from './StyledText'
import { Divider } from './StyledDivider'

// configs
const socialImgs: any = {
    twitter: require('../assets/images/sns-twitter.png'),
    telegram: require('../assets/images/telegram.png'),
    discord: require('../assets/images/sns-discord.png'),
    email: require('../assets/images/email.png'),
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

export function Social(props: any) {
    const { profile } = props

    return (
        <ContainerFlex {...sharedContanterStyle} m='0px' p='10px' br='12px'>
            {socialsList.map((item: string, index: any) => {
                if (profile[item]) {
                    const imgSrc = socialImgs[item]

                    return (
                        <>
                            <SpaceStart key={index}>
                                <Image style={styles.avatar} source={imgSrc} />
                                <Note>{profile[item]}</Note>
                            </SpaceStart>
                            <Divider />
                        </>
                    )
                }
            })}
        </ContainerFlex>
    )
}
