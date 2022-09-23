import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, View } from 'react-native'

import QRIcon from '../assets/images/svg-icons/qr.svg'
import ScanIcon from '../assets/images/svg-icons/scan.svg'
import { CodeScan } from '../components/qrcode/Scan'
import { Show } from '../components/qrcode/Show'
import { TabBar } from '../components/qrcode/TabBar'

const BottomTab = createBottomTabNavigator()

export const QRCode = () => {
    return (
        <View style={styles.screen}>
            <BottomTab.Navigator initialRouteName='QRcode' tabBar={props => <TabBar {...props} />}>
                <BottomTab.Screen
                    name='QRcode'
                    component={Show}
                    options={{ tabBarIcon: ({ color }) => <QRIcon color={color} width={38} height={38} /> }}
                />
                <BottomTab.Screen
                    name='Scan'
                    component={CodeScan}
                    options={{
                        tabBarIcon: ({ color }) => <ScanIcon color={color} width={38} height={38} />,
                    }}
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
})
