import { useState } from 'react';

import { CheckCircleIcon, CloseCircleIcon } from '~/assets/icons';
import Button from '~/components/Button';
import OrderCart from '~/components/OrderCart';
import styles from './OrderTracking.module.scss';

const item = {
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

function OrderTracking() {
    const [order, setOrder] = useState(true);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Order Tracking</h1>

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
            {!order && (
                <div className={styles['not-found']}>
                    <CloseCircleIcon />
                    <h3>Can't find your order</h3>.
                    <p>
                        The order number doesn't match any orders in our system. Please check the
                        number and try again.
                    </p>
                </div>
            )}

            {/* Find order  */}
            {order && (
                <>
                    {/* <div className={styles['found-success']}>
                        <CheckCircleIcon />
                        <h3>Find your order success</h3>
                    </div> */}

                    <OrderCart item={item} />
                </>
            )}
        </div>
    );
}

export default OrderTracking;
