import styled from 'styled-components'
import { colors } from '../constants/colors'

const typeScale = {
    heading: 48,
    title: 32,
    subtitle: 20,
    xxl: 24,
    xl: 20,
    l: 18,
    md: 16,
    sm: 14,
    xsm: 12,
}

const MonoText = styled.div`
    font-family: 'Inter';
`
export const VtText = styled.div`
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
    margin-bottom: 10px;
    font-weight: 600;
`

export const Note = styled(VtText)`
    color: ${colors.textSecondary};
    font-size: ${typeScale.md}px;
    font-family: 'VT323';
    text-align: center;
`
export const NoteMono = styled(MonoText)`
    color: ${colors.textSecondary};
    font-size: ${typeScale.md}px;
    font-family: 'VT323';
    text-align: center;
`
export const Label = styled(VtText)`
    color: ${colors.textSecondary};
    font-size: ${typeScale.sm}px;
    font-weight: 600;
    padding: 6px;
`
