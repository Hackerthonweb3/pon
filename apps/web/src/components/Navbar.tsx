import Link from 'next/link'
import styles from '~/App.module.css';
import Image from 'next/image'

import EventIcon from '~/media/svg/event.svg';
import ProfileIcon from '~/media/svg/profile.svg';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();
    return (
        <nav>
            <ul className={styles.nav}>
                <li className={!router.pathname.includes('event') ? styles['nav-item'] : styles['nav-item--active']}><Link href="/event"><Image src={EventIcon} alt="event" /></Link></li>
                <li className={router.pathname.includes('event') ? styles['nav-item'] : styles['nav-item--active']}><Link href="/profile"><Image src={ProfileIcon} alt="event" /></Link></li>
            </ul>
        </nav>
    )
}