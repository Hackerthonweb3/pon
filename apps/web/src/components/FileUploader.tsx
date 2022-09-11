import { Input, FormControl, FormLabel, InputGroup, FormErrorMessage, Icon } from '@chakra-ui/react'
import { useController } from 'react-hook-form'
import { useRef } from 'react'

export const FileUploader = ({ name, placeholder, acceptedFileTypes, control, children }: any) => {
    const inputRef: any = useRef()
    const {
        field: { ref, onChange, value, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
    } = useController({
        name,
        control,
    })

    return (
        <FormControl id='pfp' isInvalid={invalid}>
            <FormLabel htmlFor='writeUpFile'>{children}</FormLabel>
            <InputGroup>
                <input
                    type='file'
                    onChange={event => onChange(event?.target?.files?.[0])}
                    accept={acceptedFileTypes}
                    ref={inputRef}
                    {...inputProps}
                    style={{ display: 'none' }}
                />
                <Input
                    placeholder={placeholder || 'Your file ...'}
                    onClick={() => inputRef?.current?.click()}
                    readOnly={true}
                    value={(value && value.name) || ''}
                />
            </InputGroup>
            <FormErrorMessage>{invalid}</FormErrorMessage>
        </FormControl>
    )
}
