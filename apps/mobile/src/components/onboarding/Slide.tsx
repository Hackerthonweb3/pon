import { useWindowDimensions } from 'react-native'
import styled from 'styled-components/native'

export const Slide = ({ item }: any) => {
    const { height, width } = useWindowDimensions()

    const SlideImage = item.image

    return (
        <Container width={width}>
            <ImageContainer style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-end' }}>
                <SlideImage width={width * item.imageZoom.horizontal} height={height * item.imageZoom.vertical} />
            </ImageContainer>
            <TextContainer>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
            </TextContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const ImageContainer = styled.View`
    flex: 0.5;
    align-items: center;
    justify-content: flex-end;
`

const TextContainer = styled.View`
    flex: 0.5;
    justify-content: 'center';
    padding: 0 43px;
    display: flex;
`

const Title = styled.Text`
    margin-top: 44px;
    margin-bottom: 10px;
    font-family: 'VT323';
    font-size: 36px;
    text-align: center;
    color: #ffffff;
`

const Description = styled.Text`
    font-family: 'VT323';
    font-size: 21px;
    text-align: center;
    color: #ffffffb3;
`
