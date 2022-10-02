import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'

const App = () => {
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <WebView source={{ uri: 'https://web3card.vercel.app' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default App
