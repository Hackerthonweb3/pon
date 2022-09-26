import { View } from 'react-native'
import { SubTitle, Note } from '../components/StyledText'

export const InfoContainer = ({ title, text }: { title: string; text: string }) => (
    <View
        style={{
            alignItems: 'center',
            backgroundColor: '#353844',
            borderRadius: 12,
            marginBottom: 10,
            padding: 12,
            width: '100%',
        }}>
        <SubTitle>{title}</SubTitle>
        <Note>{text}</Note>
    </View>
)
