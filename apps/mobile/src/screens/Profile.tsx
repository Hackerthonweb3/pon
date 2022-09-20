import { useNavigation } from '@react-navigation/native'
import { ScrollView, Button } from 'react-native'

// import { Layout, SpaceEnd, ContainerFlex } from '../components/DesignSystem'
import { Gallery } from '../components/Gallery'
import { Social } from '../components/Social'
import { Avatar } from '../components/StyledAvatar'
import { Title, SubTitle } from '../components/StyledText'
import { Text, View } from '../components/Themed'
import { mockProfile } from '../constants/mock'

export default function Profile() {
    const { name, description, pfp, twitter } = mockProfile
    const navigation = useNavigation()

    function handleEditLink() {
        // TODO: fix navigation here
        navigation.navigate('Create')
    }

    return (
        <View>
            <Text>Hello Profile</Text>
        </View>
    )

    // return (
    //     <ScrollView>
    //         <Layout lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
    //             <ContainerFlex>
    //                 <SpaceEnd>
    //                     <Button onPress={handleEditLink} title='Edit' />
    //                 </SpaceEnd>
    //                 <Avatar pfpCid={pfp} />
    //                 <ContainerFlex mt='15px' mb='10px' p='0px'>
    //                     <Title>{name}</Title>
    //                     <SubTitle>{twitter}</SubTitle>
    //                     <Text>{description}</Text>
    //                 </ContainerFlex>
    //                 <Gallery title='NFT Gallery' />
    //                 <Gallery title='POAP Gallery' />
    //                 <Social profile={mockProfile} />
    //             </ContainerFlex>
    //         </Layout>
    //     </ScrollView>
    // )
}
