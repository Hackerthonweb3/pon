import { useLinkTo } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, Image, ScrollView, StyleSheet, TextInput, View } from 'react-native'
// import CountryPicker from 'rn-country-dropdown-picker'

import { Layout, ContainerFlex, SpaceStart, SpaceBetween } from '../components/DesignSystem'
import { LinkButton } from '../components/StyledButtons'
import { SubTitle, Label } from '../components/StyledText'
import { newUserInputs } from '../constants/configs'
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

export const Create = ({ navigation }: any) => {
    const linkTo = useLinkTo()
    const [profileImg, setProfileImg] = useState('')
    const [coverImg, setCoverImg] = useState('')
    const [country /*, setCountry*/] = useState({} as any)
    const [isDesigner, setDesigner] = useState(false)
    const [isDev, setDev] = useState(false)
    const [isFounder, setFounder] = useState(false)

    const {
        control,
        handleSubmit,
        // formState: { errors, isValid },
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
            const result = await ImagePicker.launchImageLibraryAsync({
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
                        <Label>Location</Label>
                        {/* TODO: commented for now, it causes an error */}
                        {/* <CountryPicker InputFieldStyle={styles.country} selectedItem={setCountry} /> */}
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
                    <LinkButton title='X' onPress={() => linkTo('/profile')} />
                    <SubTitle style={{ paddingTop: 8 }}>Edit Info</SubTitle>
                    <Button title='Save' onPress={handleSubmit(onSubmit)} />
                </SpaceBetween>
            </ContainerFlex>
            <ScrollView>
                <ContainerFlex>
                    <Image
                        source={profileImg ? { uri: profileImg } : require('../assets/images/graphics/grey.png')}
                        style={styles.imageStyle}
                    />
                    <SpaceStart>
                        <Button title='Profile Photo' onPress={() => chooseFile(setProfileImg)} />
                    </SpaceStart>
                    <Image
                        source={coverImg ? { uri: coverImg } : require('../assets/images/graphics/grey.png')}
                        style={styles.cover}
                    />
                    <SpaceStart>
                        <Button title='Cover Photo' onPress={() => chooseFile(setCoverImg)} />
                    </SpaceStart>
                    {newUserInputs.map((input, index) => (
                        <ContainerFlex mt='3px' mb='3px' key={index}>
                            {getInput({ ...input })}
                        </ContainerFlex>
                    ))}
                    <Button title='Submit' onPress={handleSubmit(onSubmit)} />
                </ContainerFlex>
            </ScrollView>
        </Layout>
    )
}
