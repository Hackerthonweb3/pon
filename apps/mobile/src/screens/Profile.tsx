import { background, color, requiredChakraThemeKeys } from '@chakra-ui/react'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import {
    ScrollView,
    Text,
    Image,
    View,
    StyleSheet,
    Switch,
    TouchableOpacity,
    Button as ButtonNative,
} from 'react-native'
import { Button } from '../components/shared/Button'

import { Layout, SpaceEnd, ContainerFlex, Flex, SpaceBetween } from '../components/DesignSystem'
import { Title, SubTitle, Note, NoteMono } from '../components/StyledText'
import { InfoContainer } from '../components/InfoContainer'
import { Gallery } from '../components/Gallery'
import { Social } from '../components/Social'
import { Avatar } from '../components/StyledAvatar'
import { CenteredContainer } from '../components/shared/CenteredContainer'
import { colors } from '../constants/colors'
import { mockProfile } from '../constants/mock'

var styles = StyleSheet.create({
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    overlay: {
        top: -55,
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column',
    },
    switch: {
        alignContent: 'center',
        top: -10,
        marginTop: 8,
    },
    info: {
        top: -30,
        marginTop: 0,
        paddingTop: 0,
    },
    fullInfo: {
        backgroundColor: '#353844',
        borderRadius: 12,
        alignItems: 'center',
        top: -10,
        width: '100%',
        padding: 12,
        marginBottom: 10,
    },
    description: {
        paddingTop: 5,
        paddingHorizontal: 20,
    },
    actionText: {
        color: colors.textAction,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'VT323',
        marginRight: 10,
        paddingTop: 3,
    },
})

const mockNftGallery = [
    { pfpSrc: require('../assets/images/mocks/ape.png') },
    { pfpSrc: require('../assets/images/mocks/ape3.png') },
    { pfpSrc: require('../assets/images/mocks/ape.png') },
]
const mockPoapGallery = [
    { pfpSrc: require('../assets/images/mocks/poap.png') },
    { pfpSrc: require('../assets/images/mocks/poap.png') },
]

enum EGallery {
    NFTS = 'NFTs',
    POAPS = 'POAPs',
}

export const Profile = () => {
    const { name, description, pfp, twitter, cover, location, occupation, organization, whatCan, wantMeet } =
        mockProfile

    const [selectedGalleryTab, setSelectedGalleryTab] = useState(EGallery.NFTS)
    const [isPreferedContact, setIsPreferedContact] = useState(false)
    const [isFullView, setIsFullView] = useState(false)

    const fullProfileTitle = isFullView ? 'Done' : 'Full Profile'

    const navigation = useNavigation()
    const address = '0x32...2sak3' // TODO get address from wallet

    const toggleSwitch = () => setIsPreferedContact(previousState => !previousState)

    function handleEditLink() {
        navigation.navigate('Create')
    }

    const renderInfo = (title: string, text: string) => (
        <View style={styles.fullInfo}>
            <SubTitle>{title}</SubTitle>
            <Note>{text}</Note>
        </View>
    )
    const renderGalleryButton = (galleryName: EGallery) => (
        <TouchableOpacity
            onPress={() => setSelectedGalleryTab(galleryName)}
            style={{
                width: '50%',
            }}>
            <NoteMono
                style={{
                    paddingTop: 12,
                    textAlign: 'center',
                    height: 42,
                    backgroundColor: selectedGalleryTab === galleryName ? '#353844' : '#6d6d6f',
                }}>
                {galleryName}
            </NoteMono>
        </TouchableOpacity>
    )
    const renderFullInfo = isFullView && (
        <>
            <Button label='Edit Profile' width={280} style={{ width: 260 }} onPress={handleEditLink} />
            {renderInfo('Location', location)}
            {renderInfo('Job Title', occupation)}
            {renderInfo('Organization', organization)}
            {renderInfo('Skills', whatCan)}
            {renderInfo('Interested in meeting', wantMeet)}
        </>
    )

    return (
        <Layout>
            <ScrollView>
                <CenteredContainer style={{ paddingHorizontal: 10 }}>
                    <Image source={require('../assets/images/mocks/cover1.png')} />
                    <View style={styles.backgroundContainer}>
                        <Image
                            source={require('../assets/images/mocks/cover1.png')}
                            resizeMode='cover'
                            style={styles.backdrop}
                        />
                    </View>
                    <View style={styles.overlay}>
                        <Avatar pfpCid={pfp} />
                        <TouchableOpacity style={{ right: -175, top: -65 }} onPress={() => setIsFullView(!isFullView)}>
                            <Text style={{ color: colors.textAction, fontWeight: '600' }}>{fullProfileTitle}</Text>
                        </TouchableOpacity>
                    </View>
                    <CenteredContainer style={styles.info}>
                        <Title>{name}</Title>
                        <SubTitle>{address}</SubTitle>
                        <Note style={styles.description}>{description}</Note>
                    </CenteredContainer>
                    {renderFullInfo}
                    <Flex style={styles.switch}>
                        <Text style={styles.actionText}>Preferred contact method</Text>
                        <Switch
                            trackColor={{ false: '#ffff', true: colors.textAction }}
                            onValueChange={toggleSwitch}
                            value={isPreferedContact}
                        />
                    </Flex>
                    <Social profile={mockProfile} />
                </CenteredContainer>

                <View style={{ paddingHorizontal: 10 }}>
                    <Flex style={{ backgroundColor: colors.overlay, width: '100%' }}>
                        {renderGalleryButton(EGallery.NFTS)}
                        {renderGalleryButton(EGallery.POAPS)}
                    </Flex>
                    {selectedGalleryTab === EGallery.NFTS && <Gallery data={mockNftGallery} />}
                    {selectedGalleryTab === EGallery.POAPS && <Gallery data={mockPoapGallery} />}
                </View>
            </ScrollView>
        </Layout>
    )
}
