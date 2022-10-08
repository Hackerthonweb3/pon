import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { indexer } from '@orbisclub/orbis-sdk/lib/indexer-db'
import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import { useDisconnect } from 'wagmi'
import { useRouter } from 'next/router'

export default function MiniProfile({ didProfile }: InferGetStaticPropsType<typeof getStaticProps>) {
    const { push } = useRouter()
    const { disconnect } = useDisconnect()

    const handleBack = () => {
        disconnect()
        push('/app')
    }

    if (!didProfile?.data.username) return <Text>Loading...</Text>

    return (
        <VStack spacing='10'>
            <Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }} lineHeight={'110%'}>
                Visiting {didProfile.data.username} profile
            </Heading>
            <Text fontSize='l' mt={{ sm: 3, md: 3, lg: 5 }} color='gray.500'>
                Profile data here...
            </Text>
            <Button position='absolute' right='10px' bottom='10px' onClick={handleBack}>
                Go back
            </Button>
        </VStack>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // TODO: pass the event here
    if (!params?.did) return { notFound: true }

    const response = await indexer.from('orbis_v_profiles').select().eq('did', params.did).single()
    if (response.status !== 200) return { notFound: true }

    return {
        props: { didProfile: response },
        revalidate: 60 * 20, // In seconds: 20 minutes
    }
}
