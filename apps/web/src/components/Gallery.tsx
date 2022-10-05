import Image from 'next/image'
import { ContainerFlex, SpaceBetween } from './DesignSystem'
import { SubTitle } from './StyledText'
import greenApePng from '../media/mock/ape_green.png'
import blueApePng from '../media/mock/ape_green.png'

const mockGallery = [{ pfpSrc: blueApePng }, { pfpSrc: greenApePng }, { pfpSrc: blueApePng }]

export default function Gallery(props: any) {
    const { title } = props

    return (
        <ContainerFlex mt='10px' mb='10px' p='10px' br='12px'>
            <div style={{ background: 'rgb(53, 56, 68)' }}>
                <SpaceBetween>
                    {mockGallery.map((item, index) => {
                        return (
                            <ContainerFlex key={index} m='0px' pr='4px'>
                                <Image src={item.pfpSrc} alt='gallery' width={208} height={208} />
                            </ContainerFlex>
                        )
                    })}
                </SpaceBetween>
            </div>
        </ContainerFlex>
    )
}
