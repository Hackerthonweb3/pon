import React, { useState } from 'react'
import { StyleSheet, ScrollView, Image, SafeAreaView, Button, TextInput, View, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import CountryPicker from 'rn-country-dropdown-picker'
import * as ImagePicker from 'expo-image-picker'

import { useSdk } from '@business-card/sdk'
import { Layout, SpaceEnd, ContainerFlex, SpaceStart } from '../components/DesignSystem'
import Dropdown from '../components/Dropdown'
import { Avatar } from '../components/StyledAvatar'
import { Text } from '../components/Themed'
import { Title, SubTitle, Label } from '../components/StyledText'
import { LinkButton } from '../components/StyledButtons'
import { newUserInputs } from '../constants/configs'
import { mockProfile } from '../constants/mock'
import { EInputTypes, TInputProps } from '../types'

const styles = StyleSheet.create({
    input: {
        borderColor: 'gray',
        width: '100%',
        borderWidth: 1,
        height: 40,
        borderRadius: 2,
        fontSize: 14,
        padding: 8,
    },
    textStyle: {
        padding: 10,
        color: 'black',
    },
    imageStyle: {
        width: 80,
        height: 80,
        margin: 5,
    },
    cover: {
        width: 180,
        height: 100,
        margin: 5,
    },
})

export default function Create({ navigation }: any) {
    const currentText = useSdk()
    const [profileImg, setProfileImg] = useState({} as any)
    const [coverImg, setCoverImg] = useState({} as any)
    const [isEdit, setIsEdit] = useState(false)
    const [text, setText] = useState('')
    const { name, description, pfp, twitter } = mockProfile
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' })

    const onSubmit = (data: any) => console.log(data)
    const getInput = getInputCurry(control)

    async function chooseFile(setResult: any) {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            if (!result.cancelled) {
                setResult(result.uri)
            }
        } catch (e) {
            console.log(e)
        }
    }

    function getInputCurry(control: any) {
        return function (
            { name, label = '', placeholder = '', type = EInputTypes.Input, multi = false }: TInputProps,
            onChange: any,
            value: any,
            onBlur: any,
        ) {
            const inputsMap: any = {
                [EInputTypes.Input]: (
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                    />
                ),
                [EInputTypes.Country]: <CountryPicker InputFieldStyle={styles.input} selectedItem={onChange} />,
            }

            return inputsMap[type]
        }
    }

    return (
        <ScrollView>
            <Layout lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
                <ContainerFlex>
                    <Image
                        source={{ uri: profileImg || require('../assets/images/grey.png') }}
                        style={styles.imageStyle}
                    />
                    <Button title='Profile Photo' onPress={() => chooseFile(setProfileImg)} />
                    <Image source={{ uri: coverImg || require('../assets/images/grey.png') }} style={styles.cover} />
                    <Button title='Cover Photo' onPress={() => chooseFile(setProfileImg)} />
                    {newUserInputs.map(input => (
                        <ContainerFlex mt='3px' mb='3px'>
                            <Label>{input.label}</Label>
                            <Controller
                                control={control}
                                name={input.name}
                                render={({ field: { onChange, value, onBlur } }) =>
                                    getInput({ ...input }, onChange, value, onBlur)
                                }
                            />
                        </ContainerFlex>
                    ))}
                    <Button title='Submit' onPress={handleSubmit(onSubmit)} />
                </ContainerFlex>
            </Layout>
        </ScrollView>
    )
}
