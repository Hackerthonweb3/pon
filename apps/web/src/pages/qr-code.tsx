import { Scan } from '~/components/QRCode/Scan'

export default function QRCode() {
    const handleConnect = async (data: any) => {
        console.log('connected', data)
    }

    return <Scan onConnect={handleConnect} />
}
