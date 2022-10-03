import { processColor, StyleSheet, Text, TouchableOpacity } from 'react-native'

export interface TabOptions {
    color: any
    onPress: () => void
    icon: (props: { color: string }) => React.ReactNode
    tab: {
        name: string
    }
}

export const Tab = ({ color, tab, onPress, icon }: TabOptions) => {
    return (
        <TouchableOpacity style={styles.tabContainer} onPress={onPress}>
            {icon({ color: processColor(color) as any })}
            <Text style={{ ...styles.tabText, color }}>{tab.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    tabText: {
        fontWeight: '400',
        fontSize: 16,
        marginTop: 8,
    },
})
