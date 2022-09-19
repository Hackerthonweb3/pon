import { EInputTypes } from '../types'

export const newUserInputs = [
    { name: 'name', label: 'Write username', placeholder: 'Enter your username here' },
    { name: 'description', label: 'Profile description', placeholder: 'Tell us about yourself', multi: true },
    { name: 'country', type: EInputTypes.Country },
    { name: 'skill', type: EInputTypes.Checkbox },
    { name: 'occupation', label: 'Type of Occupation', placeholder: 'Enter occupation' },
    { name: 'organization', label: 'Organization', placeholder: 'Organization name' },
    { name: 'wantMeet', label: 'Whant to meet', placeholder: 'Organization name' },
    { name: 'whatCan', label: 'What I can', placeholder: 'Tell us about what you can do', multi: true },
    { name: 'email', label: 'Email', placeholder: '' },
    { name: 'twitter', label: 'Twitter', placeholder: '' },
    { name: 'discord', label: 'Discord', placeholder: '' },
]
