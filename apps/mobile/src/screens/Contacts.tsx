import { StyleSheet } from 'react-native'

import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { useSdk } from '@business-card/sdk'
import SurpriseIcon from '../assets/images/surprised.svg'
import ArrowDown from '../assets/images/arrow-down.svg'

export default function Contacts({ navigation }: RootTabScreenProps<'Contacts'>) {
    const currentText = useSdk()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contacts</Text>
            <View style={styles.content}>
                <SurpriseIcon /* transform={{ scale: 1.15, x: -4 }} */ />
                <Text style={styles.heading}>You have no one yet</Text>
                <Text style={styles.text}>
                    Have your friends scan your QR code or share your links to make a list of contacts
                </Text>
                <ArrowDown height={115} /* transform={{ scale: 1.15, y: -2 }} */ />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingLeft: 20,
        paddingRight: 20,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    content: {
        flex: 1,
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: '600',
        marginBottom: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 18,
    },
    text: {
        fontSize: 17,
        fontWeight: '400',
        marginBottom: 10,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.7)',
        paddingLeft: 10,
        paddingRight: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
