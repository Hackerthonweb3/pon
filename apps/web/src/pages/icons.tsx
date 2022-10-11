import { Center } from '@chakra-ui/react'
import { ClipLoader } from 'react-spinners'
import { ReactSVG } from 'react-svg'

export default function Icon({ name }: { name: string }) {
    return (
        <Center bg='green.900' h='full'>
            <ReactSVG
                beforeInjection={svg => {
                    svg.setAttribute('style', 'width: 45px; fill: green')
                }}
                loading={() => <ClipLoader />}
                src='icons/contacts.svg'
            />
        </Center>
    )
}
