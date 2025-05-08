import Button from '~/components/Button';
import routes from '~/config/routes';
import { CheckCircleIcon } from '~/assets/icons';
import styles from './OrderSuccess.module.scss';

function OrderSuccess() {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                {/* Info */}
                <div className={styles['info']}>
                    <CheckCircleIcon className={styles['icon']} />
                    <h1 className={styles['header']}>Order Successful</h1>
                    <p>
                        Thank you for your purchase. Your order has been placed and is now being
                        processed. You will receive an email confirmation shortly.
                    </p>
                    <h2 className={styles['order-id']}>Order #ORD-2024-001</h2>
                    <p>Estimated delivery: 1-2 business days</p>
                </div>

                {/* Group button navigation */}
                <div className={styles['actions']}>
                    <Button to={routes.orderDetail} customStyle={styles['view-btn']}>
                        View Your Order
                    </Button>
                    <Button deepBlack to={routes.home} customStyle={styles['continue-btn']}>
                        Continue Shipping
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
