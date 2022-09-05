export default function ImageMask({ imageCid }: any) {
    return (
        <div
            style={{
                width: '150px',
                height: '120px',
                margin: '-24px 0 0 0px',
                overflow: 'hidden',
                visibility: 'hidden',
                transform: 'rotate(120deg)',
            }}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    transform: 'rotate(-60deg)',
                }}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        visibility: 'visible',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '50%',
                        backgroundSize: 'contain',
                        transform: 'rotate(-60deg)',
                        backgroundImage: `url(https://business-card.infura-ipfs.io/ipfs/${imageCid})`,
                    }}
                />
            </div>
        </div>
    )
}
