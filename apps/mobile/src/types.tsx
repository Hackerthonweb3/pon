import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dispatch, SetStateAction } from 'react'

declare global {
    namespace ReactNavigation {
        interface RootParamList extends MainNavigationScreens { }
    }
}

export type MainNavigationScreens = {
    ConnectWallet: undefined
    Create: undefined
    Loading: undefined
    MainBottomBar: NavigatorScreenParams<MainBottomBarScreens> | undefined
    Modal: undefined
    NotFound: undefined
    Onboarding: { goToStart?: boolean } | undefined
}

export type MainNavigationScreenProps<Screen extends keyof MainNavigationScreens> = NativeStackScreenProps<
    MainNavigationScreens,
    Screen
>

export type MainBottomBarScreens = {
    Contacts: undefined
    Profile: undefined
    QRCode: undefined
}

export type MainBottomBarScreenProps<Screen extends keyof MainBottomBarScreens> = CompositeScreenProps<
    BottomTabScreenProps<MainBottomBarScreens, Screen>,
    NativeStackScreenProps<MainNavigationScreens>
>

export type Setter = Dispatch<SetStateAction<boolean>>
export enum EInputTypes {
    Input,
    Select,
    Country,
    Checkbox,
}

export type TInputProps = {
    name: string
    label?: string
    placeholder?: string
    type?: EInputTypes
    multi?: boolean
}
