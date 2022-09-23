import styled from 'styled-components/native'

export const CallToActionLabel = styled.Text<{ b?: string }>`
    position: relative;
    text-align: center;
    font-family: 'VT323';
    font-size: 29rem;
    color: #bfc0c3;
    bottom: ${({ b }) => b ?? 'auto'};
`
