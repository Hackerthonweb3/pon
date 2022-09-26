import styled from 'styled-components/native'
import { colors } from '../constants/colors'

export const Layout = styled.View`
    background-color: ${colors.background};
    font-family: VT323;
    flex: 1;
`

export const Flex = styled.View`
    display: flex;
    flex-direction: row;
`

export const SpaceBetween = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const SpaceEnd = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`
export const SpaceStart = styled.View`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

interface ContainerFlexProps {
    br: any
    justify: any
    p: any
    pt: any
    pb: any
    pl: any
    pr: any
    m: any
    mt: any
    mb: any
    ml: any
    mr: any
}
export const ContainerFlex = styled.View<ContainerFlexProps>`
    display: flex;
    justify-content: ${({ justify }) => justify ?? 'space-between'};
    border-radius: ${({ br }) => br ?? '0px'};
    margin-bottom: ${({ m, mb }) => m ?? mb ?? '0'};
    margin-left: ${({ m, ml }) => m ?? ml ?? '0'};
    margin-right: ${({ m, mr }) => m ?? mr ?? '0'};
    margin-top: ${({ m, mt }) => m ?? mt ?? '20px'};
    padding-bottom: ${({ p, pb }) => p ?? pb ?? '10px'};
    padding-left: ${({ p, pl }) => p ?? pl ?? '10px'};
    padding-right: ${({ p, pr }) => p ?? pr ?? '10px'};
    padding-top: ${({ p, pt }) => p ?? pt ?? '10px'};
`
