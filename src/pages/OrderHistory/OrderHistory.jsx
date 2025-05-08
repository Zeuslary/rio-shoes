import { useState } from 'react';

import { CheckCircleIcon, CloseCircleIcon } from '~/assets/icons';
import CartItemSummary from '~/components/CartItemSummary';
import Button from '~/components/Button';
import OrderCart from '~/components/OrderCart';
import styles from './OrderHistory.module.scss';

// Fake order history
const fakeOrderHistory = [
    {
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
    },
    {
        id: 102,
        status: 'in-transit',
        createdAt: '2025-05-03',
        items: [
            {
                name: 'Adidas Samba',
                image: '/src/assets/images/product/nike-1.png',
                size: 42,
                color: 'Black',
                price: 100,
                quantity: 1,
            },
            {
                name: 'Vans Old Skool',
                image: '/src/assets/images/product/nike-1.png',
                size: 42,
                color: 'Navy',
                price: 85,
                quantity: 1,
            },
        ],
        summary: {
            subTotal: 185,
            shipping: 19.99,
            discount: 0,
            total: 204.99,
        },
    },
    {
        id: 103,
        status: 'processing',
        createdAt: '2025-05-06',
        items: [
            {
                name: 'New Balance 574',
                image: '/src/assets/images/product/nike-1.png',
                size: 43,
                color: 'Grey',
                price: 110,
                quantity: 1,
            },
            {
                name: 'Puma Suede Classic',
                image: '/src/assets/images/product/nike-1.png',
                size: 42,
                color: 'Green',
                price: 90,
                quantity: 1,
            },
            {
                name: 'Converse Chuck 70',
                image: '/src/assets/images/product/nike-1.png',
                size: 41,
                color: 'Black',
                price: 95,
                quantity: 1,
            },
        ],
        summary: {
            subTotal: 295,
            shipping: 19.99,
            discount: 0,
            total: 314.99,
        },
    },
    {
        id: 104,
        status: 'completed',
        createdAt: '2025-05-03',
        items: [
            {
                name: 'Adidas Samba',
                image: '/src/assets/images/product/nike-1.png',
                size: 42,
                color: 'Black',
                price: 100,
                quantity: 1,
            },
            {
                name: 'Vans Old Skool',
                image: '/src/assets/images/product/nike-1.png',
                size: 42,
                color: 'Navy',
                price: 85,
                quantity: 1,
            },
        ],
        summary: {
            subTotal: 185,
            shipping: 19.99,
            discount: 0,
            total: 204.99,
        },
    },
];

const item = fakeOrderHistory[0];

// console.log(fakeOrderHistory);

function OrderHistory() {
    const [order, setOrder] = useState(true);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Order history</h1>

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
            {/* Not found */}
            {/* Can't find order */}
            {!order && (
                <div className={styles['not-found']}>
                    <CloseCircleIcon />
                    <h3>Can't find your order.</h3>
                    <p>
                        The order number doesn't match any orders in our system. Please check the
                        number and try again.
                    </p>
                </div>
            )}

            {/* Find order  */}
            {order && (
                <>
                    <OrderCart item={item} />
                </>
            )}

            {/* Display list */}
            {/* {fakeOrderHistory.map((item, index) => (
                <OrderCart key={item.id || index} item={item} />
            ))} */}
        </div>
    );
}

export default OrderHistory;
