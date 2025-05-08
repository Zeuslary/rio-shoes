import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './OrderCart.module.scss';
import Button from '../Button';
import ItemCart from '../ItemCart';
import routes from '~/config/routes';

const statuses = ['delivered', 'in-transit', 'processing', 'completed'];
const defaultItem = {
    id: 101,
    status: 'delivered',
    createdAt: '2025-05-01',
    items: [
        {
            name: 'Nike Air Max 90',
            image: '/src/assets/images/product/nike-1.png',
            size: 41,
            color: 'White',
            price: 120,
            quantity: 1,
        },
    ],
    summary: {
        subTotal: 120,
        shipping: 19.99,
        discount: 0,
        total: 139.99,
    },
};

function OrderCart({ item }) {
    const status = statuses.find((status) => status === item.status) || statuses[0];

    return (
        <div className={styles['wrapper']}>
            <h3 className={styles['id']}>Order #{item.id}</h3>
            <span className={styles['date']}>Order date: {item.createdAt}</span>

            <span className={clsx(styles['status'], styles[status])}>
                {status.slice(0, 1).toUpperCase() + status.slice(1)}
            </span>

            <ItemCart />

            <div className={styles['summary']}>
                <span>
                    Total: <strong>${item.summary.total}</strong>
                </span>
                <Button to={routes.orderDetail} deepBlack customStyle={styles['detail-btn']}>
                    View detail
                </Button>
            </div>
        </div>
    );
}

OrderCart.propTypes = {
    item: PropTypes.object.isRequired,
};

export default OrderCart;
