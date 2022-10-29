import styled from 'styled-components'
import { colors } from '../constants/colors'

export const Layout = styled.div`
    background-color: ${colors.background};
    font-family: 'INTER';
    flex: 1;
    justify-content: center;
    width: 100%;
`

export const Flex = styled.div`
    display: flex;
    flex-direction: row;
`

export const SpaceBetween = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const SpaceEnd = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`
export const SpaceStart = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

export const ContainerFlex = styled.div<any>`
    display: flex;
    justify-content: space-between;
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
export const CenteredContainer = styled.div`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin: 10% 0;
`
