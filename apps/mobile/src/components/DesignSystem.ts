import styled from 'styled-components/native'

import { View as ThemedView } from './Themed'

export const Layout = styled(ThemedView)`
    flex: 1;
`

export const Flex = styled.View`
    display: flex;
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
export const ContainerFlex = styled(ThemedView)`
    display: flex;
    border-radius: ${(props: any) => (props.br ? props.br : '0px')};
    padding-top: ${(props: any) => (props.p ? props.p : props.pt ? props.pt : '10px')};
    padding-bottom: ${(props: any) => (props.p ? props.p : props.pb ? props.pb : '10px')};
    padding-left: ${(props: any) => (props.p ? props.p : props.pl ? props.pl : '10px')};
    padding-right: ${(props: any) => (props.p ? props.p : props.pr ? props.pr : '10px')};
    margin-top: ${(props: any) => (props.m ? props.m : props.mt ? props.mt : '20px')};
    margin-bottom: ${(props: any) => (props.m ? props.m : props.mb ? props.mb : '0px')};
    margin-left: ${(props: any) => (props.m ? props.m : props.ml ? props.ml : '0px')};
    margin-right: ${(props: any) => (props.m ? props.m : props.mr ? props.mr : '0px')};
    justify-content: space-between;
`
