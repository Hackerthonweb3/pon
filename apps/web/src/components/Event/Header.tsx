import { Box, Text, Heading, Button } from '@chakra-ui/react';

type Props = {
    intro: string
    title: string
    summary: string;
    date: string;
}

export default function Header({ intro, title, date, summary }: Props) {
    return (
        <Box>
            <Box backgroundColor={'red'} pt={2} px={7} minHeight="80px" mb={6}>
                <Heading>{title}</Heading>
                <Text align="center">{date}</Text>
            </Box>
            <Text align="center">{intro}</Text>
            <Text align="center">{summary}</Text>
            <Button mb={6} width="100%">REGISTER</Button>
        </Box>
    )
}