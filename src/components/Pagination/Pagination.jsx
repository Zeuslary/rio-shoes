import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Pagination.module.scss';
import { ChevronLeftIcon, ChevronRightIcon, LoadingDotsIcon } from '~/assets/icons';

// Auto switch page when click next or prev page
function Pagination({
    numPages,
    currentPage = 1,
    viewPages = 4,
    setPage,
    handleClick = () => {},
}) {
    const arrPages = Array.from({ length: numPages }).map((i, index) => index + 1);
    const isShort = numPages < viewPages;

    const showPage = (page) => (
        <button
            key={page}
            className={clsx(styles['btn'], currentPage === page && styles['active'])}
            onClick={() => {
                setPage(page);
                handleClick(page);
            }}
        >
            {page}
        </button>
    );

    const handlePrevPage = () => {
        const prevPage = currentPage - 1;

        setPage(prevPage);
        handleClick(prevPage);
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;

        setPage(nextPage);
        handleClick(nextPage);
    };

    return (
        <div className={styles['wrapper']}>
            {currentPage !== 1 && (
                <button className={styles['btn']} onClick={handlePrevPage}>
                    <ChevronLeftIcon />
                </button>
            )}

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
                                .slice(
                                    currentPage - viewPages / 2,
                                    currentPage + viewPages / 2,
                                )
                                .map(showPage)}
                        </>
                    )}
                </>
            )}

            {currentPage < numPages && (
                <button className={styles['btn']} onClick={handleNextPage}>
                    <ChevronRightIcon />
                </button>
            )}
        </div>
    );
}

Pagination.propTypes = {
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    viewPages: PropTypes.number,
};

export default Pagination;
