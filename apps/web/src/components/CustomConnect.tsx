import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ButtonPng from '../media/button.png'

export const CustomConnect = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading'
                const connected =
                    ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}>
                        {(() => {
                            if (!connected) {
                                return (
                                    <button
                                        style={{ width: '280px', marginTop: '80px' }}
                                        onClick={openConnectModal}
                                        type='button'>
                                        <Image width='290px' height='70px' src={ButtonPng} alt='button' />
                                    </button>
                                )
                            }

                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type='button'>
                                        Wrong network
                                    </button>
                                )
                            }

                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        type='button'>
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}>
                                                {chain.iconUrl && (
                                                    <Image
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        width='12px'
                                                        height='12px'
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                    </button>

                                    <button onClick={openAccountModal} type='button'>
                                        {account.displayName}
                                        {account.displayBalance ? ` (${account.displayBalance})` : ''}
                                    </button>
                                </div>
                            )
                        })()}
                    </div>
                )
            }}
        </ConnectButton.Custom>
    )
}
