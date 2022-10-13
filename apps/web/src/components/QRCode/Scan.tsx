import { Spinner as Loading } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ReactQrReader = dynamic(() => import('react-qr-reader-es6'), { ssr: false })

/** Types */
interface IProps {
    onConnect: (uri: string) => Promise<void>
}

export function Scan({ onConnect }: IProps) {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setShow(true)

        return () => {
            setShow(false)
        }
    }, [])

    function onError() {
        setShow(false)
    }

    async function onScan(data: string | null) {
        if (data) {
            await onConnect(data)
            setShow(false)
        }
    }

    if (!show) {
        return null
    }

    return (
        <>
            {loading && <Loading css={{ position: 'absolute' }} />}
            <ReactQrReader
                onLoad={() => setLoading(false)}
                showViewFinder={false}
                onError={onError}
                onScan={onScan}
                style={{ height: '100%', display: loading ? 'none' : 'flex' }}
            />
        </>
    )
}
