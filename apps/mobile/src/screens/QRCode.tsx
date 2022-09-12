import { StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { useSdk } from '@business-card/sdk'

export default function QRCode({ navigation }: RootTabScreenProps<'QRCode'>) {
    const currentText = useSdk()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>QRCode</Text>
            <Text>{currentText}</Text>
            <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
            <EditScreenInfo path='/screens/QRCode.tsx' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
