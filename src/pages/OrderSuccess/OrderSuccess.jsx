import { useLocation, useNavigate } from 'react-router';

import routes from '~/config/routes';

import { Button } from '~/components';
import { CheckCircleIcon } from '~/assets/icons';
import styles from './OrderSuccess.module.scss';

function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();

    const shortData = location.state;

    const handleViewDetail = () => {
        const routePath = `${routes.orderDetail}/${shortData._id}`;
        navigate(routePath);
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                {/* Info */}
                <div className={styles['info']}>
                    <CheckCircleIcon className={styles['icon']} />
                    <h1 className={styles['header']}>Order Successful</h1>
                    <p>
                        Thank you for your purchase. Your order has been placed and is now
                        being processed.
                    </p>
                    <h2 className={styles['order-id']}>Order #{shortData._id}</h2>
                    <p>Estimated delivery: {shortData.estimateTime}</p>
                </div>

                {/* Group button navigation */}
                <div className={styles['actions']}>
                    <Button customStyle={styles['view-btn']} onClick={handleViewDetail}>
                        View Your Order
                    </Button>

                    <Button
                        deepBlack
                        to={routes.home}
                        customStyle={styles['continue-btn']}
                    >
                        Continue Shipping
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
