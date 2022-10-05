import { SliderBase } from 'react-native'

const slides = [
    {
        id: '1',
        title: 'Welcome to\n Proof of Networking',
        description: 'Share anything about yourself with one simple link.',
        image: require('../../media/onboarding/slide1.svg').default,
        imageZoom: { horizontal: 1, vertical: 0.36 },
    },
    {
        id: '2',
        title: 'Search contacts seamlessly',
        description: 'Manage contacts by setting permissions, search for profiles, and even send direct messages.',
        image: require('../../media/onboarding/slide2.svg').default,
        imageZoom: { horizontal: 1, vertical: 0.34 },
    },
    {
        id: '3',
        title: 'Verify',
        description: 'Connect with others, with verifiable connetions. ',
        image: require('../../media/onboarding/slide3.svg').default,
        imageZoom: { horizontal: 1, vertical: 0.28 },
    },
]
export default slides

export interface SlideItemData {
    id: string
    title: string
    description: string
    image: any
    imageZoom: { horizontal: number; vertical: number }
}
