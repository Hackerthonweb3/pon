import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, initialWindowMetrics, SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'

const App = () => {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <SafeAreaView style={styles.container}>
                <StatusBar style='auto' />
                <WebView source={{ uri: 'http://localhost:3000/app' }} style={styles.container} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2E38',
    },
})

export default App
