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
                    <h1 className={styles['header']}>Đặt hàng thành công</h1>
                    <p>
                        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận và đang
                        được xử lý.
                    </p>
                    <h2 className={styles['order-id']}>Order #{shortData._id}</h2>
                    <p>Dự kiến giao hàng: {shortData.estimateTime}</p>
                </div>

                {/* Group button navigation */}
                <div className={styles['actions']}>
                    <Button customStyle={styles['view-btn']} onClick={handleViewDetail}>
                        Xem đơn hàng
                    </Button>

                    <Button
                        deepBlack
                        to={routes.home}
                        customStyle={styles['continue-btn']}
                    >
                        Tiếp tục mua sắm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
