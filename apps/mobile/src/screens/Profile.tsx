import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import { Avatar } from '../components/StyledAvatar'
import { Text } from '../components/Themed'
import { Layout, SpaceEnd, ContainerFlex, SpaceStart } from '../components/DesignSystem'
import { Title, SubTitle } from '../components/StyledText'
import { LinkButton } from '../components/StyledButtons'
import { Gallery } from '../components/Gallery'
import { Social } from '../components/Social'
import { RootTabScreenProps } from '../types'
import { useSdk } from '@business-card/sdk'
import { mockProfile } from '../constants/mock'

export default function Profile({ navigation }: RootTabScreenProps<'Profile'>) {
    const currentText = useSdk()
    const [isEdit, setIsEdit] = useState(false)
    const { name, description, pfp, twitter } = mockProfile

    return (
        <ScrollView>
            <Layout lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
                <ContainerFlex>
                    <SpaceEnd>
                        <LinkButton onPress={() => setIsEdit(true)} title='Edit my page' />
                    </SpaceEnd>
                    <Avatar pfpCid={pfp} />
                    <ContainerFlex mt='15px' mb='10px' p='0px'>
                        <Title>{name}</Title>
                        <SubTitle>{twitter}</SubTitle>
                        <Text>{description}</Text>
                    </ContainerFlex>
                    <Gallery title='NFT Gallery' />
                    <Gallery title='POAP Gallery' />
                    <Social profile={mockProfile} />
                </ContainerFlex>
            </Layout>
        </ScrollView>
    )
}
