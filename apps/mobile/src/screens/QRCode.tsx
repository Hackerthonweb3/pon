import React, { useState, useEffect } from 'react';
import {
    AppRegistry,
    Button,
    StyleSheet,
    // Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { useSdk } from '@business-card/sdk'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRCode({ navigation }: RootTabScreenProps<'QRCode'>) {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
  
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

    const currentText = useSdk()

    return (
      <View style={styles.container}>
        <Text style={styles.title}>QRCode</Text>
        <Text>{currentText}</Text>
        <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
        <EditScreenInfo path='/screens/QRCode.tsx' />
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barCodeScanner}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    );
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
    },
    barCodeScanner: {
        flex: 1,
        alignSelf: 'center',
        height: 100,
        width: '100%'
    }
})
