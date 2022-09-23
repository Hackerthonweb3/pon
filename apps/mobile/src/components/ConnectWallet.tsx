import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ConnectWallet() {
    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding')
        } catch (error) {
            console.log('Error @clearOnboarding', error)
        }
    }

    return (
        <View style={styles.container}>
            <Text>ConnectWallet</Text>
            <TouchableOpacity onPress={clearOnboarding}>
                <Text>Reset Onboarding</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
