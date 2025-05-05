import Button from '~/components/Button';
import styles from './OrderTracking.module.scss';
import { CheckCircleIcon, CloseCircleIcon } from '~/assets/icons';

function OrderTracking() {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h2>Order Tracking</h2>

                <div className={styles['find-wrap']}>
                    <input
                        className={styles['input']}
                        type="text"
                        placeholder="Enter your order number"
                    />
                    <Button deepBlack customStyle={styles['find-btn']}>
                        Find order
                    </Button>
                </div>
            </div>

            {/* Can't find order */}
            <div className={styles['not-found']}>
                <CloseCircleIcon />
                <h3>Can't find your order</h3>.
                <p>
                    The order number doesn't match any orders in our system. Please check the number
                    and try again.
                </p>
            </div>

            {/* Find order  */}
            <div className={styles['found-success']}>
                <CheckCircleIcon />
                <h3>Find your order success</h3>
            </div>
        </div>
    );
}

export default OrderTracking;
