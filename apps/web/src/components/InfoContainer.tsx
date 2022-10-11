import { SubTitle, Note } from './StyledText'

export default function InfoContainer({ title, text }: { title: string; text: string }) {
    return (
        <div
            style={{
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: '#353844',
                borderRadius: 12,
                marginBottom: '3px',
                padding: '10px',
                width: '100%',
            }}>
            <SubTitle>{title}</SubTitle>
            <Note>{text}</Note>
        </div>
    )
}
