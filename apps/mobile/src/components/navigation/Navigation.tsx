import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { defaultScreenOptions } from '../../constants/configs'
import { useOnboarding } from '../../hooks/useOnboarding'
import { Modal } from '../../screens'
import { MainNavigationScreens } from '../../types'
import ConnectWallet from '../ConnectWallet'
import { Onboarding } from '../onboarding/Onboarding'
import { Loading } from '../shared/Loading'
import LinkingConfiguration from './LinkingConfiguration'
import { MainBottomBar } from './MainBottomBar'

const Stack = createNativeStackNavigator<MainNavigationScreens>()

export const Navigation = () => {
    const { isLoading, isOnboarding } = useOnboarding()

    return (
        <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
                <Stack.Group screenOptions={defaultScreenOptions}>
                    {/* {isLoading && <Stack.Screen name='Loading' component={Loading} />}
                    {isOnboarding && <Stack.Screen name='Onboarding' component={Onboarding} />}
                    <Stack.Screen name='ConnectWallet' component={ConnectWallet} /> */}
                    <Stack.Screen name='MainBottomBar' component={MainBottomBar} />
                </Stack.Group>

                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name='Modal' component={Modal} options={{ headerShown: false }} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
