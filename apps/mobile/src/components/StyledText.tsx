import styled from 'styled-components/native'
import { colors } from '../constants/colors'

import { typeScale } from '../constants/TypeScale'

const MonoText = styled.Text`
    font-family: 'Inter';
`

export const Title = styled(MonoText)`
    color: ${colors.textMain};
    font-size: ${typeScale.title};
    font-weight: 700;
    letter-spacing: 0;
`

export const SubTitle = styled(MonoText)`
    font-size: ${typeScale.subtitle};
    margin-bottom: 10;
    font-weight: 600;
`

export const Note = styled(MonoText)`
    color: ${colors.textSecondary};
    font-size: ${typeScale.l};
`

export const Label = styled(MonoText)`
    color: ${colors.textSecondary};
    font-size: ${typeScale.sm};
    font-weight: 600;
    padding: 6px;
`
