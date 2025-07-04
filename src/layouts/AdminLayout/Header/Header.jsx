import { BellIcon, SearchIcon } from '~/assets/icons';
import styles from './Header.module.scss';

function Header() {
    return (
        <div className={styles['wrapper']}>
            <h1 className={styles['header']}>Welcome back, Admin!</h1>

            {/* <div className={styles['actions']}>
                <div className={styles['search']}>
                    <input className={styles['search-input']} type="text" placeholder="Search..." />
                    <SearchIcon className={styles['search-icon']} />
                </div>
                <BellIcon className={styles['bell-icon']} />
            </div> */}
        </div>
    );
}

export default Header;
