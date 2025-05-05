import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Pagination.module.scss';
import { ChevronLeftIcon, ChevronRightIcon, LoadingDotsIcon } from '~/assets/icons';

function Pagination({ numPages, currentPage = 1, viewPages = 4 }) {
    const arrPages = Array.from({ length: numPages }).map((i, index) => index + 1);
    const showPage = (page) => (
        <button
            key={page}
            className={clsx(styles['btn'], currentPage === page && styles['active'])}
        >
            {page}
        </button>
    );

    const isShort = numPages < viewPages;

    return (
        <div className={styles['wrapper']}>
            <button className={styles['btn']} disabled={currentPage === 1}>
                <ChevronLeftIcon />
            </button>

            {isShort && arrPages.map(showPage)}
            {!isShort && (
                <>
                    {currentPage < viewPages && (
                        <>
                            {arrPages.slice(0, viewPages).map(showPage)}
                            <span className={styles['break']}>
                                <LoadingDotsIcon />
                            </span>
                        </>
                    )}

                    {currentPage >= viewPages && (
                        <>
                            <span className={styles['break']}>
                                <LoadingDotsIcon />
                            </span>
                            {arrPages
                                .slice(currentPage - viewPages / 2, currentPage + viewPages / 2)
                                .map(showPage)}
                        </>
                    )}
                </>
            )}

            <button className={styles['btn']} disabled={currentPage === numPages}>
                <ChevronRightIcon />
            </button>
        </div>
    );
}

Pagination.propTypes = {
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    viewPages: PropTypes.number,
};

export default Pagination;
