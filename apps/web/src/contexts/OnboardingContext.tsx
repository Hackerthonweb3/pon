import { createContext, ReactNode, useEffect, useState } from 'react'

const OnboardingContext = createContext<any | undefined>(undefined)

const OnboardingProvider = ({ children }: { children: ReactNode }) => {
    const [isOnboarding, setIsOnboarding] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const setViewedOnboarding = async (status: boolean) => {
        try {
            if (status) {
                await localStorage.setItem('@viewedOnboarding', 'true')
            } else {
                await localStorage.removeItem('@viewedOnboarding')
            }
            setIsOnboarding(!status)
        } catch (error) {
            console.log('Error @setViewedOnboarding', error)
        } finally {
            console.log('setViewedOnboarding to', status, isOnboarding)
        }
    }

    const checkViewedOnboarding = async () => {
        try {
            const value = await localStorage.getItem('@viewedOnboarding')
            if (value) setIsOnboarding(false)
        } catch (error) {
            console.log('Error @checkOnboarding', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkViewedOnboarding()
    }, [])

    return (
        <OnboardingContext.Provider value={{ isLoading, isOnboarding, setViewedOnboarding }}>
            {children}
        </OnboardingContext.Provider>
    )
}

export { OnboardingProvider, OnboardingContext }
