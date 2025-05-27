import styles from './AccountLayout.module.scss';

function AccountLayout({ children }) {
    return <div className={styles['wrapper']}>{children}</div>;
}

export default AccountLayout;
