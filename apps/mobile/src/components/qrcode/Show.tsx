import { Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Text, View } from '../Themed'

export function Show() {
    return (
        <SafeAreaView>
			<View style={styles.centered}>
				<View style={styles.message}>
					<Image
						source={require("../../assets/images/hidetaka.png")}
					/>
					<Text style={styles.title}>Hidetaka Ko</Text>
					<Image
						style={{height: 200, width: 200}}
						source={require("../../assets/images/qr.png")}
					/>
				</View>
        	</View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
    },
    centered: {
        justifyContent: 'flex-start',
		width: '100%',
		height: '100%',
    },
    message: {
        alignItems: 'center',
        justifyContent: 'space-between',
		width: '100%',
		height: '50%',
		marginTop: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: '600',
        marginVertical: 20,
    },
})