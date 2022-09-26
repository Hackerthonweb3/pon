import { Image, StyleSheet, ScrollView } from 'react-native'

import { ContainerFlex, SpaceBetween } from './DesignSystem'
import { SubTitle } from './StyledText'
import { colors } from '../constants/colors'

const styles = StyleSheet.create({
    avatar: {
        width: 118,
        height: 118,
    },
})

export function Gallery(props: any) {
    const { data } = props

    return (
        <ContainerFlex style={{ backgroundColor: colors.overlay }} mt='0px' mb='10px' p='10px'>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <SpaceBetween>
                    {data.map((item: any, index: any) => {
                        return (
                            <ContainerFlex key={index} m='0px' pr='4px'>
                                <Image style={styles.avatar} source={item.pfpSrc} />
                            </ContainerFlex>
                        )
                    })}
                </SpaceBetween>
            </ScrollView>
        </ContainerFlex>
    )
}
