import { Button } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Suspense } from 'react'

const QrCodeStyling = dynamic(() => import('~/components/QrCode'), { ssr: false })

export default function LogicQr() {
    const { push } = useRouter()

    // placeholder DID to decode: purple tail

    // A function to parse the scanned QR code data and redirect to a page to add the scanned contact
    const handleScannedCode = () => {}

    // A function to generate and trigger signature request from wallet after the special scanned did page is entered
    const requestSignature = () => {}

    // A function to poll the ceramic network for signed step from the other party
    const pollForSignature = () => {}

    // scan screen: read qr code and redirect to scanned/[did]
    // show code screen: generate qr with did

    // TODO: the URI will be a full universal html link:
    // we need to minify the link to something like: https://pon.ninja/riek4939fj
    // - if read from the app, it will parse the code and load the content
    // - if read from regular camera it will go to the url that will show the profile preview
    // - and prompt to download app to save profile
    // - the web will have a button or progress indicator
    // to come after download app to save the contact

    return (
        <>
            <Button onClick={() => push('logic')}>Go to Logic</Button>
            <QrCodeStyling />
        </>
    )
}
