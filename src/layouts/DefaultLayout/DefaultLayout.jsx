import styles from './DefaultLayout.module.scss';

import { Header, Footer } from '~/layouts/components';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className={styles['body']}>{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
