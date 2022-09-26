import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

import ButtonDecoration from '../../assets/images/graphics/button-decoration.svg'

type ButtonProps = TouchableOpacityProps & { label: string; width?: number | string }

export const Button = (props: ButtonProps) => {
    const { label, style, width, ...otherProps } = props

    return (
        <TouchableOpacity style={[{ alignItems: 'center' }, style]} {...otherProps}>
            <ButtonDecoration width={width ?? 390} height={70} />
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
