import { Box, Text, Heading, Button } from '@chakra-ui/react';
import appStyles from '~/App.module.css';

type Props = {
    intro: string
    title: string
    // summary: string
    date: string
    id: string
}

export default function Header({ intro, title, date }: Props) {
    return (
        <div>
            <Box pt={2} px={7} height="80px" mb={6} className={appStyles.banner}>
                <Heading>{title}</Heading>
                <Text align="center">{date}</Text>
            </Box>
            <Text align="center">{intro}</Text>
            {/* <Text align="center">{summary}</Text> */}
            <button className={appStyles.button}>REGISTER</button>
        </div>
    )
}