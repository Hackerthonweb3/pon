import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import ButtonDecoration from '../../assets/images/graphics/button-decoration.svg'

export const Button = ({ label, style }: { label: string; style?: StyleProp<ViewStyle> }) => {
    return (
        <TouchableOpacity style={[style, { alignItems: 'center' }]}>
            <ButtonDecoration width={390} height={70} />
            <ButtonLabel>{label}</ButtonLabel>
        </TouchableOpacity>
    )
}

const ButtonLabel = styled.Text`
    position: 'relative';
    bottom: 50%;
    text-align: 'center';
    font-family: 'VT323';
    font-size: 29rem;
    color: #99f0ff;
`
