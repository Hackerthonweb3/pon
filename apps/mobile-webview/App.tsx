import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { SafeAreaProvider, initialWindowMetrics, SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'

const App = () => {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <StatusBar style='auto' />
                    <WebView
                        source={{ uri: 'https://business-card-kxj4o4889-hackerthonweb3.vercel.app/qr-code' }}
                        style={styles.container}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
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
