import Svg from 'react-native-svg'

export default [
    {
        id: '1',
        title: 'Welcome to\n Proof of Networking',
        description: 'Share anything about yourself with one simple link.',
        image: require('../../assets/images/onboarding/slide1.svg').default,
        imageZoom: { horizontal: 1, vertical: 0.36 },
    },
    {
        id: '2',
        title: 'Search contacts seamlessly',
        description: 'Manage contacts by setting permissions, search for profiles, and even send direct messages.',
        image: require('../../assets/images/onboarding/slide2.svg').default,
        imageZoom: { horizontal: 1, vertical: 0.34 },
    },
    {
        id: '3',
        title: 'Verify',
        description: 'Connect with others, with verifiable connections. ',
        image: require('../../assets/images/onboarding/slide3.svg').default,
        imageZoom: { horizontal: 1, vertical: 0.28 },
    },
]

export interface SlideItemData {
    id: string
    title: string
    description: string
    image: Svg
    imageZoom: { horizontal: number; vertical: number }
}
