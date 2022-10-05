import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, Image, Input, Checkbox } from '@chakra-ui/react'
// import CountryPicker from 'rn-country-dropdown-picker'

import { Layout, ContainerFlex, SpaceStart, SpaceBetween } from '../components/DesignSystem'
import { LinkButton } from './LinkButton'
import { SubTitle, Label } from './StyledText'
import { newUserInputs } from '../constants/configs'

const styles = {
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
}

export const Create = ({ navigation }: any) => {
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
        return function ({ name, label = '', placeholder = '', type = 'input', multi = false }: any) {
            const inputsMap: any = {
                input: (
                    <>
                        <Label>{label}</Label>
                        <Controller
                            control={control}
                            name={name}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <Input style={styles.input} placeholder={placeholder} value={value} onBlur={onBlur} />
                            )}
                        />
                    </>
                ),
                country: (
                    <>
                        <Label>Location</Label>
                        {/* TODO: commented for now, it causes an error */}
                        {/* <CountryPicker InputFieldStyle={styles.country} selectedItem={setCountry} /> */}
                    </>
                ),
                checkbox: (
                    <>
                        <Label>Skills</Label>
                        <ContainerFlex ml='5px' mr='5px' mt='0' pt='0'>
                            <SpaceBetween>
                                <div>
                                    <Label>Designer</Label>
                                    <Checkbox onChange={e => setDesigner(e.target.checked)} />
                                </div>
                                <div>
                                    <Label>Developer</Label>
                                    <Checkbox onChange={e => setDev(e.target.checked)} />
                                </div>
                                <div>
                                    <Label>Founder</Label>
                                    <Checkbox onChange={e => setFounder(e.target.checked)} />
                                </div>
                            </SpaceBetween>
                        </ContainerFlex>
                    </>
                ),
            }

            return inputsMap[type]
        }
    }

    return (
        <Layout>
            <ContainerFlex>
                <SpaceBetween>
                    <LinkButton title='X' onClick={() => console.log('link to profile')} />
                    <SubTitle style={{ paddingTop: 8 }}>Edit Info</SubTitle>
                    <Button title='Save' onClick={handleSubmit(onSubmit)} />
                </SpaceBetween>
            </ContainerFlex>
            <div>
                <ContainerFlex>
                    <Image alt='profile photo' src={profileImg || ''} style={styles.imageStyle} />
                    <SpaceStart>
                        <Button title='Profile Photo' onClick={() => chooseFile(setProfileImg)} />
                    </SpaceStart>
                    <Image alt='cover image' src={coverImg || ''} style={styles.cover} />
                    <SpaceStart>
                        <Button title='Cover Photo' onClick={() => chooseFile(setCoverImg)} />
                    </SpaceStart>
                    {newUserInputs.map((input, index) => (
                        <ContainerFlex mt='3px' mb='3px' key={index}>
                            {getInput({ ...input })}
                        </ContainerFlex>
                    ))}
                    <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                </ContainerFlex>
            </div>
        </Layout>
    )
}
