import { useNavigation } from '@react-navigation/native'
import { Button, ScrollView, Text } from 'react-native'

import { Layout, SpaceEnd, ContainerFlex } from '../components/DesignSystem'
import { Gallery } from '../components/Gallery'
import { Social } from '../components/Social'
import { Avatar } from '../components/StyledAvatar'
import { Title, SubTitle } from '../components/StyledText'
import { mockProfile } from '../constants/mock'

export const Profile = () => {
    const { name, description, pfp, twitter } = mockProfile
    const navigation = useNavigation()

    function handleEditLink() {
        navigation.navigate('Create')
    }

    return (
        <ScrollView>
            <Layout lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
                <ContainerFlex>
                    <SpaceEnd style={{ marginTop: 50 }}>
                        <Button onPress={handleEditLink} title='Edit' />
                    </SpaceEnd>
                    <Avatar pfpCid={pfp} />
                    <ContainerFlex mt='15px' mb='10px' p='0px'>
                        <Title>{name}</Title>
                        <SubTitle>{twitter}</SubTitle>
                        <Text>{description}</Text>
                    </ContainerFlex>
                    <Gallery title='NFT Gallery' />
                    <Gallery title='PoN SBT Gallery' />
                    <Social profile={mockProfile} />
                </ContainerFlex>
            </Layout>
        </ScrollView>
    )
}
