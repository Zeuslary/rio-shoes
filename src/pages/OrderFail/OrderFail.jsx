import { Link } from 'react-router';

import { CloseCircleIcon } from '~/assets/icons';
import Button from '~/components/Button';
import routes from '~/config/routes';
import styles from './OrderFail.module.scss';

function OrderFail() {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                {/* Info */}
                <div className={styles['info']}>
                    <CloseCircleIcon className={styles['icon']} />
                    <h1 className={styles['header']}>Order Failed</h1>
                    <p>
                        We're sorry, but there was an issue processing your order. Please try again.
                    </p>
                </div>

                {/* Group button navigation */}
                <div className={styles['actions']}>
                    <Button to={routes.cart} customStyle={styles['back-btn']}>
                        Back to cart
                    </Button>
                    <Button deepBlack to={routes.confirmOrder} customStyle={styles['again-btn']}>
                        Try Again
                    </Button>
                    <p>
                        Need help?
                        <strong>
                            <Link to={routes.contact} className={styles['contact-btn']}>
                                Contact our support team.
                            </Link>
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OrderFail;
