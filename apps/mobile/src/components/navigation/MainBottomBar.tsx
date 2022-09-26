import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Pressable } from 'react-native'

import QRIcon from '../../assets/images/svg-icons/qr.svg'
import { colors } from '../../constants/colors'
import { Contacts, Profile, QRCode } from '../../screens'
import { MainBottomBarScreens, MainBottomBarScreenProps } from '../../types'

const BottomBar = createBottomTabNavigator<MainBottomBarScreens>()

export const MainBottomBar = () => {
    return (
        <BottomBar.Navigator
            initialRouteName='Contacts'
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                //tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
                //tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
                tabBarShowLabel: false,
                tabBarStyle: {
                    //  backgroundColor: Colors[colorScheme].background,
                    borderTopWidth: 1,
                    borderTopColor: '#363A45',
                    backgroundColor: colors.background,
                    height: 100,
                },
            }}>
            <BottomBar.Screen
                name='Contacts'
                component={Contacts}
                options={({ navigation }: MainBottomBarScreenProps<'Contacts'>) => ({
                    tabBarIcon: ({ color }) => <TabBarIcon name='cards' color={color} />,
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Modal')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <MaterialCommunityIcons
                                name='cog'
                                size={26}
                                // color={Colors[colorScheme].headerIcon}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomBar.Screen
                name='QRCode'
                component={QRCode}
                options={({ navigation }: MainBottomBarScreenProps<'QRCode'>) => ({
                    title: 'QR',
                    tabBarIcon: ({ color }) => <QRIcon height={28} color={color} />,
                    tabBarStyle: { display: 'none' },
                    headerBackgroundContainerStyle: {
                        // backgroundColor: Colors[colorScheme].background,
                    },
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <MaterialCommunityIcons
                                name='close'
                                size={26}
                                // color={Colors[colorScheme].headerIcon}
                                style={{ marginLeft: 15 }}
                            />
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('NotFound')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}>
                            <Ionicons
                                name='ios-share-outline'
                                size={26}
                                // color={Colors[colorScheme].headerIcon}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomBar.Screen
                name='Profile'
                component={Profile}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <TabBarIcon name='account-circle' color={color} />,
                }}
            />
        </BottomBar.Navigator>
    )
}

function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
    return <MaterialCommunityIcons size={34} {...props} />
}
