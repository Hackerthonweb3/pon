import ListItem from './ListItem'

export default function List({ data }: any) {
    if (!data) {
        return null
    }
    return (
        <>
            {data.map((item: any) => (
                <ListItem key={item.title} {...item} />
            ))}
        </>
    )
}
