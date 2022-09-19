import { Text, View } from './Themed'
import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, Image, Modal } from 'react-native'
import QRFrame from '../assets/images/qr-frame.svg'

export const CodeScan = () => {
    const [hasPermission, setHasPermission] = useState(false)
    const [scanned, setScanned] = useState(false)
    const [visible, setVisible] = React.useState(false)
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

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
        return <Text>Requesting for camera permission</Text>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

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

// <Modal
//     style={{ backgroundColor: 'transparent' }}
//     onDismiss={hideMessageModal}
//     transparent={true}
//     visible={messageModalIsVisible}>
//     <View style={styles.modalView}>
//         <View style={styles.modalViewView}>
//             <Text style={styles.modalText}>You have connected with Hidetaka!</Text>
//             <View style={styles.avatarView}>
//                 <Image style={styles.avatar} source={require('../assets/images/hidetaka.png')} />
//             </View>
//             <Button title={'Done'} onPress={hideMessageModal} />
//         </View>
//     </View>
// </Modal>

// const ConfirmModal = () => {
//     <Modal visible={visible} onDismiss={hideDialog} style={{ backgroundColor: 'transparent' }}>
//     <View style={styles.modal}>
//         <View style={styles.modalView}>
//             <Text style={{ ...styles.dialogText, marginBottom: 20 }}>
//                 You have connected with Hidetaka!
//             </Text>
//             <Image
//                 style={{ maxWidth: '100%', alignSelf: 'center' }}
//                 source={require('../assets/images/qr.svg')}
//             />
//             <Button title={'Done'} onPress={hideDialog} />
//         </View>
//     </View>
// </Modal>
// }

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
