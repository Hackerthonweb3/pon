import { useEffect, useState } from 'react'

export const useAnimation = (timeout: number) => {
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setAnimate(true)
        }, timeout)
    }, [timeout])

    return animate
}
