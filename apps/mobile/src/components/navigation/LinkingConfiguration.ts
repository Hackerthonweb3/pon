import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { MainNavigationScreens } from '../../types'

const linking: LinkingOptions<MainNavigationScreens> = {
    prefixes: [Linking.createURL('pon://')],
    config: {
        screens: {
            Create: 'create',
            Onboarding: 'onboarding',
            MainBottomBar: {
                screens: {
                    Contacts: 'contacts',
                    Profile: 'profile',
                    QRCode: 'qr',
                },
            },
            Modal: 'modal',
            NotFound: '*',
        },
    },
}

export default linking
