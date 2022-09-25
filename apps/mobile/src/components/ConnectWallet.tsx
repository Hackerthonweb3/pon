// import { useNavigation } from '@react-navigation/native'
import { useWalletConnect } from '@walletconnect/react-native-dapp'
import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

import Indicator from '../assets/images/graphics/indicator.svg'
// import { useOnboarding } from '../hooks/useOnboarding'
import { Button } from './shared/Button'
import { CenteredContainer } from './shared/CenteredContainer'

const stageColor = { pending: '#ffffffb2', loading: '#fff', complete: '#99f0ff' }

export default function ConnectWallet() {
    const connector: any = useWalletConnect()
    connector.getProvider = () => {}
    connector.options = {
        qrcode: true,
    }
    // const { address } = useAccount()

    // useEffect(() => {
    //     if (connector?.accounts?.length && !address) {
    //         // connector.connect()
    //     } else {
    //         // connector.killSession()
    //     }
    // }, [connector])

    const handleConnect = async () => {
        console.log('connect wallet', connector)
        try {
            // await handle()
            await connector.connect()
            // console.log(context.connector?.uri)
            // console.log(address)
        } catch (error) {
            console.log('connecting error', error)
        }
    }

    // const { navigate } = useNavigation()
    // const { setViewedOnboarding } = useOnboarding()

    // const handle = async () => {
    //     await setViewedOnboarding(false)
    //     navigate('MainBottomBar')
    // }

    return (
        <CenteredContainer>
            <Title>Validating</Title>
            <Subtitle>Give us 30 seconds while we validate your profile</Subtitle>
            <ProgressBlock data={progressData} renderItem={ProgressItem} />
            <Button onPress={handleConnect} label='Continue' />
        </CenteredContainer>
    )
}

const Spinner = () => {
    const rotation = useRef(new Animated.Value(0)).current

    const animation = useRef(
        Animated.loop(
            Animated.sequence([
                Animated.timing(rotation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(rotation, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ]),
        ),
    )
    useEffect(() => {
        animation.current.start()
        return () => animation.current.stop()
    }, [])

    return (
        <Animated.View
            style={{
                left: -3,
                marginRight: 12,
                transform: [
                    {
                        rotate: rotation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg'],
                        }),
                    },
                ],
            }}>
            <Indicator width={15} height={15} />
        </Animated.View>
    )
}

const ProgressItem = ({ item }: { item: ProgessDataShape }) => {
    const color = stageColor[item.stage]
    return (
        <HStack>
            {item.stage === 'loading' ? <Spinner /> : <ListDecoration color={color} />}
            <ProgressText color={color}>{item.text}</ProgressText>
        </HStack>
    )
}

const Title = styled.Text`
    top: -3%;
    margin-bottom: -1%;
    font-family: 'VT323';
    font-size: 36pt;
    color: #99f0ff;
`

const Subtitle = styled.Text`
    margin: 0 18% 8%;
    text-align: center;
    font-family: 'VT323';
    font-size: 18pt;
    color: #fff;
    line-height: 23pt;
`

const ProgressBlock = styled.FlatList`
    color: #ffffffb2;
    flex: 0.22;
    margin-bottom: 11%;
    padding: 0 5px;
`

const ProgressText = styled.Text<{ color: string }>`
    margin: 4.8% 0;
    font-family: 'VT323';
    font-size: 18pt;
    color: ${({ color }) => color};
`

const HStack = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: left;
`

const ListDecoration = styled.View<{ color: string }>`
    height: 7.5px;
    width: 7.5px;
    border-radius: 10px;
    margin-right: 20px;
    background-color: ${({ color }) => color};
`

interface ProgessDataShape {
    text: string
    stage: keyof typeof stageColor
}

const progressData: ProgessDataShape[] = [
    { text: 'Connecting wallet', stage: 'complete' },
    { text: 'Giving permission to Ceramic', stage: 'loading' },
    { text: 'Signing in for Lit Protocol', stage: 'pending' },
]
