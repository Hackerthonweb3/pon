/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 */
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import Profile from '../screens/Profile'
import Contacts from '../screens/Contacts'
import QRCode from '../screens/QRCode'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import QRIcon from '../assets/images/qr.svg'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='Modal' component={ModalScreen} options={{ headerShown: false }} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
    const colorScheme = useColorScheme()

    return (
        <BottomTab.Navigator
            initialRouteName='Contacts'
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
                tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Colors[colorScheme].background,
                    borderTopWidth: 1,
                    borderTopColor: '#363A45',
                    height: 100,
                },
            }}>
            <BottomTab.Screen
                name='Contacts'
                component={Contacts}
                options={({ navigation }: RootTabScreenProps<'Contacts'>) => ({
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
                                color={Colors[colorScheme].headerIcon}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name='QRCode'
                component={QRCode}
                options={({ navigation }: RootTabScreenProps<'QRCode'>) => ({
                    title: 'QR',
                    tabBarIcon: ({ color }) => <QRIcon height={28} color={color} />,
                    tabBarStyle: { display: 'none' },
                    headerBackgroundContainerStyle: {
                        backgroundColor: Colors[colorScheme].background,
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
                                color={Colors[colorScheme].headerIcon}
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
                                color={Colors[colorScheme].headerIcon}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name='Profile'
                component={Profile}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <TabBarIcon name='account-circle' color={color} />,
                }}
            />
        </BottomTab.Navigator>
    )
}

/** You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/ */
function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
    return <MaterialCommunityIcons size={34} {...props} />
}
