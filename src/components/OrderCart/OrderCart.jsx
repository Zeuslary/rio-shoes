import clsx from 'clsx';
import PropTypes from 'prop-types';

import { formatCurrencyVN, styleStatus, upperCaseFirstLetter } from '~/utils';
import routes from '~/config/routes';

import { Button, ItemCart } from '~/components';

import styles from './OrderCart.module.scss';

function OrderCart({ order }) {
    return (
        <div className={styles['wrapper']}>
            <div className="space-between">
                <div>
                    <h3 className={styles['id']}>Order #{order?._id}</h3>
                    <span className={styles['date']}>
                        Order date: {order?.createdAt?.slice(0, 10)}
                    </span>
                </div>

                <span className={clsx(styleStatus(order?.status), styles['status'])}>
                    {upperCaseFirstLetter(order?.status)}
                </span>
            </div>

            {order.items?.map((item) => (
                <ItemCart key={item._id} item={item} />
            ))}

            <div className={styles['summary']}>
                <span>
                    Total: <strong>{formatCurrencyVN(order?.summary?.total)}</strong>
                </span>
                <Button
                    to={`${routes.orderDetail}/${order._id}`}
                    deepBlack
                    customStyle={styles['detail-btn']}
                >
                    View detail
                </Button>
            </div>
        </div>
    );
}

OrderCart.propTypes = {
    order: PropTypes.object.isRequired,
};

export default OrderCart;
