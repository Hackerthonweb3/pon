import React, { useState } from 'react'
import { StyleSheet, ScrollView, Image, Button, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import CountryPicker from 'rn-country-dropdown-picker'
import * as ImagePicker from 'expo-image-picker'
import Checkbox from 'expo-checkbox'

import { Layout, ContainerFlex, SpaceStart, SpaceBetween } from '../components/DesignSystem'
import { SubTitle, Label } from '../components/StyledText'
import { LinkButton } from '../components/StyledButtons'
import { newUserInputs } from '../constants/configs'
import { View } from '../components/Themed'
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
    country: {
        borderColor: 'gray',
        borderRadius: 2,
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
    const [profileImg, setProfileImg] = useState('')
    const [coverImg, setCoverImg] = useState('')
    const [country, setCountry] = useState({} as any)
    const [isDesigner, setDesigner] = useState(false)
    const [isDev, setDev] = useState(false)
    const [isFounder, setFounder] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' })

    const onSubmit = (data: any) => {
        console.log(data)
        console.log(country)
        console.log(profileImg)
        // TODO: create/update profile
    }

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
        return function ({ name, label = '', placeholder = '', type = EInputTypes.Input, multi = false }: TInputProps) {
            const inputsMap: any = {
                [EInputTypes.Input]: (
                    <>
                        <Label>{label}</Label>
                        <Controller
                            control={control}
                            name={name}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextInput
                                    multiline={Boolean(multi)}
                                    numberOfLines={4}
                                    style={styles.input}
                                    placeholder={placeholder}
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                />
                            )}
                        />
                    </>
                ),
                [EInputTypes.Country]: (
                    <>
                        <Label>Country of origin</Label>
                        <CountryPicker InputFieldStyle={styles.country} selectedItem={setCountry} />
                    </>
                ),
                [EInputTypes.Checkbox]: (
                    <>
                        <Label>Skills</Label>
                        <ContainerFlex ml='5px' mr='5px' mt='0' pt='0'>
                            <SpaceBetween>
                                <View>
                                    <Label>Designer</Label>
                                    <Checkbox value={isDesigner} onValueChange={setDesigner} />
                                </View>
                                <View>
                                    <Label>Developer</Label>
                                    <Checkbox value={isDev} onValueChange={setDev} />
                                </View>
                                <View>
                                    <Label>Founder</Label>
                                    <Checkbox value={isFounder} onValueChange={setFounder} />
                                </View>
                            </SpaceBetween>
                        </ContainerFlex>
                    </>
                ),
            }

            return inputsMap[type]
        }
    }

    return (
        <Layout lightColor='#eee' darkColor='rgba(255,255,255,0.1)'>
            <ContainerFlex>
                <SpaceBetween>
                    <LinkButton title='X' onPress={() => navigation.navigate('Profile')} />
                    <SubTitle style={{ paddingTop: 8 }}>Edit Info</SubTitle>
                    <Button title='Save' onPress={handleSubmit(onSubmit)} />
                </SpaceBetween>
            </ContainerFlex>
            <ScrollView>
                <ContainerFlex>
                    <Image
                        source={profileImg ? { uri: profileImg } : require('../assets/images/grey.png')}
                        style={styles.imageStyle}
                    />
                    <SpaceStart>
                        <Button title='Profile Photo' onPress={() => chooseFile(setProfileImg)} />
                    </SpaceStart>
                    <Image
                        source={coverImg ? { uri: coverImg } : require('../assets/images/grey.png')}
                        style={styles.cover}
                    />
                    <SpaceStart>
                        <Button title='Cover Photo' onPress={() => chooseFile(setCoverImg)} />
                    </SpaceStart>
                    {newUserInputs.map(input => (
                        <ContainerFlex mt='3px' mb='3px'>
                            {getInput({ ...input })}
                        </ContainerFlex>
                    ))}
                    <Button title='Submit' onPress={handleSubmit(onSubmit)} />
                </ContainerFlex>
            </ScrollView>
        </Layout>
    )
}
