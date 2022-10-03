import { Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 130 / 2,
        height: 130,
        width: 130,
    },
})

export const Avatar = ({ pfpCid }: { pfpCid: string }) => {
    return (
        <Image
            style={styles.avatar}
            source={{
                uri: `https://business-card.infura-ipfs.io/ipfs/${pfpCid}`,
            }}
        />
    )
}
