import { Text, View } from '../components/Themed'
import { CodeScan } from '../components/CodeScan'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import QRIcon from '../assets/images/qr.svg'
import ScanIcon from '../assets/images/scan.svg'
import { useEffect, useState } from 'react'
import { Setter } from '../types'
import { BarCodeScanner } from 'expo-barcode-scanner'

const BottomTab = createBottomTabNavigator()

interface TabOptions {
    color: string
    onPress: () => void
    icon: (props: { color: string }) => React.ReactNode
    tab: {
        name: string
    }
}

const Tab = ({ color, tab, onPress, icon }: TabOptions) => {
    return (
        <TouchableOpacity style={styles.tabContainer}>
            {icon({ color })}
            <Text style={{ ...styles.tabText, color }}>{tab.name}</Text>
        </TouchableOpacity>
    )
}

const { width } = Dimensions.get('screen')

const TabBar = ({ state, descriptors }: BottomTabBarProps) => {
    const { routes } = state

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {routes.map(route => (
                    <Tab
                        tab={route}
                        icon={descriptors[route.key].options.tabBarIcon as TabOptions['icon']}
                        onPress={() => {}}
                        color='#fff'
                        key={route.key}
                    />
                ))}
            </View>
            <View style={styles.separator} />
        </View>
    )
}

export default function QRCode() {
    const [hasPermission, setHasPermission] = useState(false)
    const [scannerOn, setScannerOn] = useState(false)
    const [activityIndicatorIsVisible, setActivityIndicatorIsVisible] = useState(false)
    const [messageModalIsVisible, setMessageModalVisible] = useState(false)

    const showActivityIndicator = (ms: number) => {
        setActivityIndicatorIsVisible(true)
        setTimeout(() => setActivityIndicatorIsVisible(false), ms)
    }

    const load = (ms: number, setter: Setter) => {
        showActivityIndicator(ms)
        setTimeout(() => setter(true), ms)
    }

    const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
        load(3000, setMessageModalVisible)
    }

    const hideMessageModal = () => {
        setMessageModalVisible(false)
        setScannerOn(false)
    }

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }

        getBarCodeScannerPermissions()
    }, [])

    // if (hasPermission === null) {
    //     return <Text>Requesting for camera permission</Text>
    // }
    // if (hasPermission === false) {
    //     return <Text>No access to camera</Text>
    // }

    return (
        <View style={styles.screen}>
            <BottomTab.Navigator initialRouteName='QRcode' tabBar={props => <TabBar {...props} />}>
                <BottomTab.Screen
                    name='QRcode'
                    component={CodeScan}
                    options={{ tabBarIcon: ({ color }) => <QRIcon color={color} width={38} height={38} /> }}
                />
                <BottomTab.Screen
                    name='Scan'
                    component={CodeScan}
                    options={{ tabBarIcon: ({ color }) => <ScanIcon color={color} width={38} height={38} /> }}
                />
            </BottomTab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    wrapper: {
        position: 'absolute',
        bottom: 38,
        width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingLeft: 20,
        paddingRight: 20,
    },
    container: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.28)',
        // backgroundColor: '#333',
        justifyContent: 'space-between',
        borderRadius: 14,
    },
    tabContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    separator: {
        position: 'absolute',
        width: 1,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    tabText: {
        fontWeight: '400',
        fontSize: 16,
        // lineHeight: 30
        marginTop: 8,
    },
})
