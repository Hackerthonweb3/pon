import Link from 'next/link'
import styles from '~/App.module.css'
import Image from 'next/image'

import EventIcon from '~/media/svg/event.svg'
import ProfileIcon from '~/media/svg/profile.svg'
import QRCode from '~/media/qr.svg'
import Contacts from '~/media/svg/cards.svg'
import Account from '~/media/svg/account-circle.svg'
import { useRouter } from 'next/router'

export default function Navbar() {
    const router = useRouter()
    return (
        <nav>
            <ul className={styles.nav}>
                <li className={!router.pathname.includes('event') ? styles['nav-item'] : styles['nav-item--active']}>
                    <Link href='/contacts'>
                        <Image src={Contacts} alt='contacts' height='45px' width='45px' />
                    </Link>
                </li>
                <li className={!router.pathname.includes('event') ? styles['nav-item'] : styles['nav-item--active']}>
                    <Link href='/scan'>
                        <Image src={QRCode} alt='scan qr code' height='45px' width='45px' />
                    </Link>
                </li>
                <li className={!router.pathname.includes('event') ? styles['nav-item'] : styles['nav-item--active']}>
                    <Link href='/event'>
                        <Image src={EventIcon} alt='events' height='45px' width='45px' />
                    </Link>
                </li>
                <li className={router.pathname.includes('event') ? styles['nav-item'] : styles['nav-item--active']}>
                    <Link href='/profile'>
                        <Image src={Account} alt='profile' height='45px' width='45px' />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
