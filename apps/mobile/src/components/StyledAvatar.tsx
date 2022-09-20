import { Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    avatar: {
        width: 108,
        height: 108,
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
