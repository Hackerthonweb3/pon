import {
    AppRegistry,
    StyleSheet,
    // Text,
    TouchableOpacity,
    Linking
} from 'react-native';
  
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { useSdk } from '@business-card/sdk'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default function QRCode({ navigation }: RootTabScreenProps<'QRCode'>) {
    const onSuccess = e => {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err)
      );
    };

    const currentText = useSdk()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>QRCode</Text>
            <Text>{currentText}</Text>
            <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
            <EditScreenInfo path='/screens/QRCode.tsx' />
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                <Text style={styles.centerText}>
                    Go to{' '}
                    <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                    your computer and scan the QR code.
                </Text>
                }
                bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
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
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
})
