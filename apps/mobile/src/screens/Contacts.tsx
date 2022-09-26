import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

import ArrowDown from '../assets/images/graphics/arrow-down.svg'
import SurpriseIcon from '../assets/images/graphics/surprised.svg'
import { colors } from '../constants/colors'
import { MainBottomBarScreenProps } from '../types'

export const Contacts = ({ navigation }: MainBottomBarScreenProps<'Contacts'>) => {
    const [contactName, setContactName] = useState('')
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const filteredContatcts = contacts // TODO filter by contactName
        setContacts(filteredContatcts)
    }, [contactName])

    const renderSearch = (
        <TextInput
            style={styles.input}
            placeholder='Search by name'
            value={contactName}
            onChangeText={value => setContactName(value)}
        />
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Contacts</Text>
            {renderSearch}
            <View style={styles.content}>
                <SurpriseIcon width='110' height='110' />
                <Text style={styles.heading}>You have no contacts</Text>
                <Text style={styles.text}>
                    Have your friends scan your QR code or share your links to make a list of contacts
                </Text>
                <ArrowDown height='105' width='22' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: colors.background,
        fontFamily: 'VT323',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    content: {
        flex: 1,
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: colors.textMain,
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 20,
    },
    heading: {
        color: colors.textMain,
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 10,
    },
    text: {
        color: colors.textSecondary,
        fontSize: 17,
        fontWeight: '400',
        marginBottom: 20,
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        width: '80%',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    input: {
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        color: 'rgba(255, 255, 255, 0.3)',
        fontSize: 14,
        height: 38,
        padding: 8,
        width: '100%',
    },
})
