import { useState } from 'react'
import Image from 'next/image'
import { Text, Button, Flex, Box } from '@chakra-ui/react'
import { Layout, SpaceEnd, ContainerFlex, CenteredContainer } from './DesignSystem'
import Gallery from './Gallery'
// import { Social } from './Social'
import ImageMask from './ImageMask'
import InfoContainer from './InfoContainer'
import { Title, SubTitle, Note, NoteMono } from './StyledText'
import { colors } from '../constants/colors'
import { mockProfile } from '../constants/mock'
import coverSvg from '../media/mock/cover1.png'

const styles = {
    backgroundContainer: {
        position: 'absolute',
        top: ' 0',
        left: '0',
        right: '0',
    },
    overlay: {
        top: -55,
        alignItems: 'center',
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
}

enum EGallery {
    NFTS = 'NFTs',
    SBTS = 'SBTs',
}

export default function Profile() {
    const { name, description, pfp, location, occupation, organization, whatCan, wantMeet } = mockProfile

    const [selectedGalleryTab, setSelectedGalleryTab] = useState(EGallery.NFTS)
    const [isPreferedContact, setIsPreferedContact] = useState(false)
    const [isFullView, setIsFullView] = useState(false)

    const fullProfileTitle = isFullView ? 'Done' : 'Full Profile'

    const address = '0x32...2sak3' // TODO get address from wallet

    const toggleSwitch = () => setIsPreferedContact((previousState: boolean) => !previousState)

    function handleEditLink() {
        // console.log("edit")
    }

    const renderGalleryButton = (galleryName: EGallery) => (
        <div
            onClick={() => setSelectedGalleryTab(galleryName)}
            style={{
                borderRadius: '10px 10px 0px',
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
        </div>
    )
    const renderFullInfo = isFullView && (
        <Flex flexDirection='column' alignItems='center'>
            <Button mb='10px' width={280} style={{ width: 260 }} onClick={handleEditLink}>
                Edit Profile
            </Button>
            <InfoContainer title='Location' text={location} />
            <InfoContainer title='Job Title' text={occupation} />
            <InfoContainer title='Organization' text={organization} />
            <InfoContainer title='Skills' text={whatCan} />
            <InfoContainer title='Interested in meeting' text={wantMeet} />
        </Flex>
    )

    return (
        <Box width={{ base: '100%', md: '50%', lg: '50%' }}>
            <Layout>
                <CenteredContainer style={{ padding: '0 20px' }}>
                    <Image src={coverSvg} alt='' width='900px' />
                    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
                        <ImageMask imageCid={pfp} />
                        <div style={{ right: -175, top: -65 }} onClick={() => setIsFullView(!isFullView)}>
                            <Text style={{ color: colors.textAction, fontWeight: '600' }}>{fullProfileTitle}</Text>
                        </div>
                        <Title>{name}</Title>
                        <SubTitle>{address}</SubTitle>
                        <Note style={styles.description}>{description}</Note>
                    </Flex>
                    {renderFullInfo}
                    <Flex style={styles.switch}>
                        <Text style={styles.actionText}>Preferred contact method</Text>
                    </Flex>
                    {/* <Social profile={mockProfile} /> */}
                </CenteredContainer>

                <div style={{ padding: '0 10px' }}>
                    <Flex style={{ backgroundColor: colors.overlay, width: '100%' }}>
                        {renderGalleryButton(EGallery.NFTS)}
                        {renderGalleryButton(EGallery.SBTS)}
                    </Flex>
                    {selectedGalleryTab === EGallery.NFTS && <Gallery title='NFT Gallery' />}
                    {selectedGalleryTab === EGallery.SBTS && <Gallery title='POAPs' />}
                </div>
            </Layout>
        </Box>
    )
}
