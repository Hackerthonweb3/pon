import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { colors } from '../../constants'
import { Tab, TabOptions } from './Tab'

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { routes } = state
    const [selected, setSelected] = useState('Scan')

    const handlePress = (activeTab: string, index: number) => {
        if (state.index !== index) {
            setSelected(activeTab)
            navigation.navigate(activeTab)
        }
    }

    const renderColor = (currentTab: any) => {
        return currentTab === selected ? colors.tabIconSelected : colors.tabIconDefault
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {routes.map((route, index) => (
                    <Tab
                        tab={route}
                        icon={descriptors[route.key].options.tabBarIcon as TabOptions['icon']}
                        onPress={() => handlePress(route.name, index)}
                        color={renderColor(route.name)}
                        key={route.key}
                    />
                ))}
            </View>
            <View style={styles.separator} />
        </View>
    )
}

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
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
        backgroundColor: '#00000047',
        justifyContent: 'space-between',
        borderRadius: 14,
    },
    separator: {
        position: 'absolute',
        width: 1,
        height: 60,
        backgroundColor: '#ffffff1e',
    },
})
