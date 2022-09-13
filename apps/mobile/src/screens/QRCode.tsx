import React, { useState, useEffect } from 'react';
import {
    AppRegistry,
    Button,
    StyleSheet,
    // Text,
    TouchableOpacity,
    Linking,
    Image,
} from 'react-native';
import {
    Portal,
    Modal
} from "react-native-paper";
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { useSdk } from '@business-card/sdk'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRCode({ navigation }: RootTabScreenProps<'QRCode'>) {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
  
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
    }, []);
  
    const handleBarCodeScanned = ({ type, data } : { type: any, data: any }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.headerText} category="h4">
                    Get Proof of Networking
                </Text>
                <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
                <EditScreenInfo path='/screens/QRCode.tsx' />
                <BarCodeScanner
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.barCodeScanner}
                />
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
            <View>
                <Portal>
                    <Modal visible={visible} onDismiss={hideDialog}>
                        <Text style={{...styles.dialogText, marginBottom: 20}}>
                            This is the digital signature of the certificate issued by Franck Muller. Scan the QR code to verify the signature:
                        </Text>
                            {/* <View> */}
                            <Image
                                style={{ maxWidth: '100%', alignSelf: 'center' }}
                                source={require("../assets/images/qr.svg")}
                            />
                        <Button title={'Done'} onPress={hideDialog}/>
                    </Modal>
                </Portal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        marginVertical: 10,
        height: 1,
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
    },
    barCodeScanner: {
        flex: 1,
        alignSelf: 'center',
        height: 100,
        width: '100%'
    },
    headerText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 35,
      marginTop: 40,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    dialogText: {
      color: 'white',
      alignSelf: 'center',
      paddingHorizontal: 60,
      fontSize: 15
    },
})
