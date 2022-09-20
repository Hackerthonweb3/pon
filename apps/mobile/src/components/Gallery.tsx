import { Image, StyleSheet, ScrollView } from 'react-native'

import { ContainerFlex, SpaceBetween } from './DesignSystem'
import { SubTitle } from './StyledText'

const mockGallery = [
    { pfpSrc: '../assets/images/ape.png' },
    { pfpSrc: '../assets/images/ape.png' },
    { pfpSrc: '../assets/images/ape.png' },
]

const styles = StyleSheet.create({
    avatar: {
        width: 108,
        height: 108,
    },
})
const sharedContanterStyle = {
    lightColor: '#ecf3f6',
    darkColor: '#353844',
}

export function Gallery(props: any) {
    const { title } = props

    return (
        <ContainerFlex {...sharedContanterStyle} mt='10px' mb='10px' p='10px' br='12px'>
            <SubTitle>{title}</SubTitle>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <SpaceBetween>
                    {mockGallery.map((item, index) => {
                        return (
                            <ContainerFlex key={index} m='0px' pr='4px' {...sharedContanterStyle}>
                                <Image style={styles.avatar} source={require('../assets/images/ape.png')} />
                            </ContainerFlex>
                        )
                    })}
                </SpaceBetween>
            </ScrollView>
        </ContainerFlex>
    )
}
