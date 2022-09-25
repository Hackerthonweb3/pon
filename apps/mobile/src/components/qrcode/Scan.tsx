import { useIsFocused as isFocused } from '@react-navigation/native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import QRFrame from '../../assets/images/graphics/qr-frame.svg'

export const CodeScan = () => {
    const [hasPermission, setHasPermission] = useState(false)
    const [scanned, setScanned] = useState(false)
    const [, setVisible] = useState(false)

    const showDialog = () => setVisible(true)

    // const hideDialog = () => setVisible(false)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }

        getBarCodeScannerPermissions()
    }, [])

    const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
        setScanned(true)
        showDialog()
        alert(`Bar code with type ${type} and data ${data} has been scanned!`)
    }

    if (hasPermission === null) {
        return (
            <SafeAreaView>
                <Text>Requesting for camera permission</Text>
            </SafeAreaView>
        )
    }
    if (hasPermission === false) {
        return (
            <SafeAreaView>
                <Text>No access to camera</Text>
            </SafeAreaView>
        )
    }

    // to disable camera when not in use
    if (!isFocused()) return null

    return (
        <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.barCodeScanner}>
            <View style={styles.centered}>
                <QRFrame width='160' height='160' />
            </View>
        </BarCodeScanner>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    barCodeScanner: {
        flex: 5,
        alignSelf: 'center',
        width: '100%',
    },
    dialogText: {
        color: 'white',
        alignSelf: 'center',
        padding: 10,
        fontSize: 15,
    },
    modal: {
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    modalView: {
        alignSelf: 'center',
        width: 300,
        margin: 10,
        padding: 10,
        borderRadius: 20,
    },
})
