import styles from './AdminLayout.module.scss';

import Sidebar from './Sidebar';

function AdminLayout({ children }) {
    return (
        <div className={styles['wrapper']}>
            <Sidebar />

            <div className={styles['body']}>{children}</div>
        </div>
    );
}

export default AdminLayout;
