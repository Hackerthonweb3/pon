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
    const [messageModalIsVisible, setMessageModalVisible] = useState(false);
  
	
	
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
		load(3000, setMessageModalVisible)
	}
	
    const hideDialog = () => setMessageModalVisible(false);
  
	
	
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
			
            <View style={styles.headerContainer}>
				<Text style={styles.header} category="h4">
					Get Proof of Networking
				</Text>
			</View>
			
            <View style={styles.container}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>How to get a Proof of Networking</Text>
					<Text style={styles.text} lightColor='rgba(0,0,0,0.8)' darkColor='rgba(255,255,255,0.8)'>
						Scan the QR code in your new acquaintance's mobile app:{' '}
					</Text>
				</View>
                <BarCodeScanner
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.barCodeScanner}
                />
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
                visible={messageModalIsVisible}>
                <View style={styles.modalView}>
                    <View style={styles.modalViewView}>
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
			
			<Modal
                transparent={true}
                visible={scanned}>
				<View
					style={styles.scanAgain}>
					{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
				</View>
			</Modal>
			
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
		flex: 1,
        alignItems: 'stretch',
		justifyContent: 'space-between',
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
        flex: 1,
        alignSelf: 'center',
        width: '100%'
    },
	headerContainer: {
		height: 100, 
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: '#251819',
	},
	header: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 32,
      marginTop: 40,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
	container: {
		flex: 1,
        alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 20,
    },
    textContainer: {
		alignItems: 'flex-start',
		textAlign: 'justify',
		marginBottom: 20,
		height: 100,
		width: '100%',
    },
    title: {
      	flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
      	flex: 1,
		fontSize: 18,
		lineHeight: 20,
		alignItems: 'center',
		color: '#ccc',
    },
    modalText: {
		color: 'white',
		alignSelf: 'center',
		fontSize: 14,
		margin: 10
    },
    modalView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    modalViewView: {
        alignSelf: 'center',
        width: 300,
        margin: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.66)',
    },
    avatarView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
	avatar: {
		margin: 10
	},
	scanAgain: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		height: '100%',
		paddingBottom: 120,
        backgroundColor: 'transparent',
	},
})
