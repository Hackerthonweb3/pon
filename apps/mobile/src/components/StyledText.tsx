import styled from 'styled-components/native'

import { typeScale } from '../constants/TypeScale'

const MonoText = styled.Text`
    font-family: 'Inter';
`

export const Title = styled(MonoText)`
    font-size: ${typeScale.title};
    letter-spacing: 0;
    font-weight: 700;
`

export const SubTitle = styled(MonoText)`
    font-size: ${typeScale.subtitle};
    margin-bottom: 10;
    font-weight: 600;
`

export const Note = styled(MonoText)`
    font-size: ${typeScale.l};
`

export const Label = styled(MonoText)`
    font-size: ${typeScale.sm};
    font-weight: 600;
    padding: 6px;
`
