import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { ButtonGroup, IconButton, useEditableControls } from '@chakra-ui/react'

export const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls()

    const renderEditing = () => (
        <>
            <IconButton variant={'ghost'} aria-label='accept edit' icon={<CheckIcon />} {...getSubmitButtonProps()} />
            <IconButton variant={'ghost'} aria-label='cancel edit' icon={<CloseIcon />} {...getCancelButtonProps()} />
        </>
    )

    const renderNotEditing = () => (
        <IconButton variant={'ghost'} aria-label='edit field' icon={<EditIcon />} {...getEditButtonProps()} />
    )

    return (
        <ButtonGroup justifyContent='right' size='sm'>
            {isEditing ? renderEditing() : renderNotEditing()}
        </ButtonGroup>
    )
}
