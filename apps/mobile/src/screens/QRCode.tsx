import React, { useState, useEffect } from 'react';
import {
	ActivityIndicator,
    AppRegistry,
    Button,
    StyleSheet,
    // Text,
    TouchableOpacity,
    Linking,
    Image,
    Modal,
} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import {
	RootTabScreenProps,
	Setter,
} from '../types'
import { useSdk } from '@business-card/sdk'
import { BarCodeScanner } from 'expo-barcode-scanner';




export default function QRCode({ navigation }: RootTabScreenProps<'QRCode'>) {
	
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
	const [activityIndicatorIsVisible, setActivityIndicatorIsVisible] = useState(false)
    const [modalIsVisible, setModalVisible] = useState(false);
  
	
	
    const showActivityIndicator = (ms: number) => {
      setActivityIndicatorIsVisible(true)
      setTimeout(() => setActivityIndicatorIsVisible(false), ms)
	}
	
	const load = (ms: number, setter: Setter) => {
		showActivityIndicator(ms);
   		setTimeout(() => setter(true), ms)
	}
  
    const handleBarCodeScanned = ({ type, data } : { type: any, data: any }) => {
		setScanned(true);
		load(3000, setModalVisible)
	}
	
    const hideDialog = () => setModalVisible(false);
  
	
	
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
    }, []);
  
	
	
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
        <View style={styles.screen}>
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
            <Modal
                style={{ backgroundColor: 'transparent' }}
                transparent={true}
                visible={activityIndicatorIsVisible}>
				<ActivityIndicator 
					animating={activityIndicatorIsVisible}
					color="#00ff00"
					size={100}
					style={{ flex: 1 }} />
            </Modal>
            <Modal
                style={{ backgroundColor: 'transparent' }}
                onDismiss={hideDialog}
                transparent={true}
                visible={modalIsVisible}>
                <View style={styles.modal}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            You have connected with Hidetaka!
                        </Text>
                    	<View style={styles.avatarView}>
							<Image
								style={styles.avatar}
								source={require("../assets/images/hidetaka.png")}
							/>
                    	</View>
						<Button title={'Done'} onPress={hideDialog}/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
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
    button: {
      padding: 16
    },
    barCodeScanner: {
        flex: 5,
        alignSelf: 'center',
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
    modalText: {
		color: 'white',
		alignSelf: 'center',
		fontSize: 14,
		margin: 10
    },
    modalView: {
        alignSelf: 'center',
        width: 300,
        margin: 10,
        padding: 10,
        borderRadius: 20
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    avatarView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
	avatar: {
		margin: 10
    },
})
