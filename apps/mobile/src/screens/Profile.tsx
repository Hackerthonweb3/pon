import { useState } from 'react'
import { ScrollView, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Avatar } from '../components/StyledAvatar'
import { Text } from '../components/Themed'
import { Layout, SpaceEnd, ContainerFlex } from '../components/DesignSystem'
import { Title, SubTitle } from '../components/StyledText'
import { Gallery } from '../components/Gallery'
import { Social } from '../components/Social'
import { mockProfile } from '../constants/mock'

export default function Profile() {
    const [isEdit, setIsEdit] = useState(false)
    const { name, description, pfp, twitter } = mockProfile
    const navigation = useNavigation()

    function handleEditLink() {
        navigation.navigate('Contacts')
    }

    return (
        <ScrollView>
            <Layout lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
                <ContainerFlex>
                    <SpaceEnd>
                        <Button onPress={() => navigation.navigate('Contacts')} title='Edit' />
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
