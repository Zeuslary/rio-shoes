import Header from './Header';
import styles from './AdminLayout.module.scss';

import Sidebar from './Sidebar';

function AdminLayout({ children }) {
    return (
        <div className={styles['wrapper']}>
            <Sidebar />

            <div className={styles['body']}>
                <Header />
                <div className={styles['content']}>{children}</div>
            </div>
        </div>
    );
}

export default AdminLayout;
