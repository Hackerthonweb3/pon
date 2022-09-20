/** Learn more about using TypeScript with React Navigation: https://reactnavigation.org/docs/typescript/ */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dispatch, SetStateAction } from 'react'

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined
    Modal: undefined
    Create: any
    NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>

export type RootTabParamList = {
    Contacts: undefined
    Profile: undefined
    QRCode: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
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
