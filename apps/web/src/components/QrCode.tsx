import QRCodeStyling from 'qr-code-styling'
import { useContext, useEffect, useRef } from 'react'
import { OrbisContext } from '~/contexts'

const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    dotsOptions: {
        type: 'dots',
        color: '#bfc0c3',
    },
    backgroundOptions: { color: '#0000' },
    cornersSquareOptions: { type: 'square', color: '#bfc0c3' },
    cornersDotOptions: { type: 'square', color: '#bfc0c3' },
    qrOptions: {
        typeNumber: 3,
        errorCorrectionLevel: 'M',
        mode: 'Byte',
    },
})

export default function QrCode() {
    const orbis = useContext(OrbisContext)

    useEffect(() => {
        const checkOrbis = async () => {
            const result = await orbis?.isConnected()
            if (result.status === 200) {
                // TODO: encode here the result.did
                qrCode.update({
                    data: 'https://pon.ninja/qwertyuiopasdfg',
                })
            }
        }
        checkOrbis()
    }, [])

    const qrElement = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (qrElement.current) {
            qrCode.append(qrElement.current)
            // qrCode.update({
            //     data: 'https://pon.ninja/qwertyuiopasdfg',
            // })
        }
    }, [qrElement])

    return <div ref={qrElement} />
}
