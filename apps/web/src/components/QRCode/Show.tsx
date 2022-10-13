import { Center, Spinner } from '@chakra-ui/react'
import QRCodeStyling from 'qr-code-styling'
import { useEffect, useRef } from 'react'

const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    dotsOptions: {
        type: 'dots',
        color: '#bfc0c3',
    },
    backgroundOptions: { color: '#2B2E38' },
    cornersSquareOptions: { type: 'square', color: '#bfc0c3' },
    cornersDotOptions: { type: 'square', color: '#bfc0c3' },
    qrOptions: {
        typeNumber: 5,
        errorCorrectionLevel: 'L',
        mode: 'Byte',
    },
})

export function Show({ did }: { did?: string }) {
    const qrElement = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (qrElement.current) {
            qrCode.update({
                data: `https://web3card.vercel.app/${did}`,
            })
            qrCode.append(qrElement.current)
        }
    }, [qrElement])

    if (!did)
        return (
            <Center h='full'>
                <Spinner size='xl' />
            </Center>
        )

    return <div ref={qrElement} />
}
