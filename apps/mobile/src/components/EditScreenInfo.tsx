import * as WebBrowser from 'expo-web-browser'
import { StyleSheet, TouchableOpacity } from 'react-native'

import Colors from '../constants/Colors'
import { MonoText } from './StyledText'
import { Text, View } from './Themed'

export default function EditScreenInfo({ path }: { path: string }) {
    return (
        <View style={styles.screen}>
            <View style={styles.getStartedContainer}>
                <Text style={styles.title}>How to get a Proof of Networking</Text>
                <Text style={styles.getStartedText} lightColor='rgba(0,0,0,0.8)' darkColor='rgba(255,255,255,0.8)'>
                    Scan the QR code in your new acquaintance's mobile app:{' '}
                    <MonoText style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>{path}</MonoText>{' '}
                    Change any of the text, save the file, and your app will automatically update.
                </Text>
            </View>
        </View>
    )
}

function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet',
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 30,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})
