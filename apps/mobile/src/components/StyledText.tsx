import { Text, TextProps } from './Themed'
import { typeScale } from '../constants/TypeScale'

export function MonoText(props: TextProps) {
    return <Text {...props} style={[props.style, { fontFamily: 'Inter' }]} />
}

export function Title(props: TextProps) {
    return (
        <MonoText
            {...props}
            style={[props.style, { fontSize: typeScale.title, letterSpacing: 0, fontWeight: '700' }]}
        />
    )
}

export function SubTitle(props: TextProps) {
    return (
        <MonoText
            {...props}
            style={[props.style, { fontSize: typeScale.subtitle, marginBottom: 10, fontWeight: '600' }]}
        />
    )
}

export function Note(props: TextProps) {
    return <MonoText {...props} style={[props.style, { fontSize: typeScale.l }]} />
}
