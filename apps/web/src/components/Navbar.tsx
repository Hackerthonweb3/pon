import Link from 'next/link'
import styles from '~/App.module.css';
import Image from 'next/image'

import EventIcon from '~/media/svg/event.svg';
import ProfileIcon from '~/media/svg/profile.svg';

export default function Navbar() {
    return (
        <nav>
            <ul className={styles.nav}>
                <li className={styles['nav-item']}><Link href="/event"><Image src={EventIcon} alt="event" /></Link></li>
                <li className={styles['nav-item']}><Link href="/profile"><Image src={ProfileIcon} alt="event" /></Link></li>
            </ul>
        </nav>
    )
}