import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './OrderCart.module.scss';
import Button from '../Button';
import ItemCart from '../ItemCart';

const statuses = ['delivered', 'in-transit', 'processing', 'completed'];

function OrderCart() {
    return (
        <div className={styles['wrapper']}>
            <h3 className={styles['id']}>Order #342</h3>
            <span className={styles['date']}>Order date: 05-05-2025</span>

            <span className={clsx(styles['status'], styles[statuses[2]])}>{statuses[2]}</span>

            <ItemCart />

            <div className={styles['summary']}>
                <span>
                    Total: <strong>$178</strong>
                </span>
                <Button customStyle={styles['detail-btn']}>View detail</Button>
            </div>
        </div>
    );
}

OrderCart.propTypes = {
    // numPages: PropTypes.number.isRequired,
    // currentPage: PropTypes.number,
    // viewPages: PropTypes.number,
};

export default OrderCart;
