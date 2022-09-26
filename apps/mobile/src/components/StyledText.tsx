import styled from 'styled-components/native'
import { colors } from '../constants/colors'

import { typeScale } from '../constants/TypeScale'

export const MonoText = styled.Text`
    font-family: 'Inter';
`
export const VtText = styled.Text`
    font-family: 'VT323';
`
export const Title = styled(VtText)`
    color: ${colors.textMain};
    font-size: ${typeScale.title}px;
    font-weight: 700;
    letter-spacing: 0;
`

export const SubTitle = styled(VtText)`
    font-size: ${typeScale.subtitle}px;
    color: ${colors.textMain};
    margin-bottom: 10;
    font-weight: 600;
`

export const Note = styled(VtText)`
    color: ${colors.textSecondary};
    font-size: ${typeScale.md}px;
    font-family: 'VT323',
    text-align: center;
`
export const NoteMono = styled(MonoText)`
    color: ${colors.textSecondary};
    font-size: ${typeScale.md}px;
    font-family: 'VT323',
    text-align: center;
`
export const Label = styled(VtText)`
    color: ${colors.textSecondary};
    font-size: ${typeScale.sm}px;
    font-weight: 600;
    padding: 6px;
`
