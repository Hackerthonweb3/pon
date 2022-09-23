import { useContext } from 'react'

import { OnboardingContext } from '../contexts/OnboardingContext'

export const useOnboarding = () => {
    const context = useContext(OnboardingContext)

    if (!context) {
        throw new Error('useOnboarding must be used within a AppProvider')
    }

    return context
}
