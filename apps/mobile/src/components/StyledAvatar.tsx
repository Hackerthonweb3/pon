import { Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 130 / 2,
        height: 130,
        width: 130,
    },
})

export const Avatar = ({ pfpCid }: { pfpCid: string }) => {
    const pfp = pfpCid.startsWith('https') ? pfpCid : `https://business-card.infura-ipfs.io/ipfs/${pfpCid}`
    return (
        <Image
            style={styles.avatar}
            source={{
                uri: pfp,
            }}
        />
    )
}
