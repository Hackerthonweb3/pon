import styled from 'styled-components'

export const CallToActionLabel = styled.div<{ b?: string }>`
    bottom: ${({ b }) => b ?? 'auto'};
    color: #bfc0c3;
    font-family: 'VT323';
    font-size: 32px;
    position: relative;
    text-align: center;
    padding: 0 15%;
`
