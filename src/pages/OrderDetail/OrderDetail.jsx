import clsx from 'clsx';

import Button from '~/components/Button';
import CartItemSummary from '~/components/CartItemSummary';
import routes from '~/config/routes';
import styles from './OrderDetail.module.scss';

// Fake order history
const fakeOrderHistory = {
    id: 103,
    status: 'processing',
    createdAt: '2025-05-06',
    contactInfo: {
        fullName: 'John Doe',
        phone: '0912345678',
        email: 'john.doe@example.com',
        address: {
            houseNumber: '123',
            ward: 'Ward 1',
            district: 'District 3',
            city: 'Ho Chi Minh City',
        },
    },
    shippingMethod: {
        id: 'express',
        name: 'Express',
        description: '1-2 business days',
        price: 19.99,
    },
    paymentMethod: {
        type: 'Cash on Delivery (COD)',
        description: 'Pay when you receive your order',
    },
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
};

function OrderDetail() {
    const { id, createdAt, status, contactInfo, items, summary } = fakeOrderHistory;

    return (
        <div className={styles['wrapper']}>
            <div className={clsx('grid wide', styles['custom-grid'])}>
                <h1 className={styles['header']}>Order detail</h1>

                <div className={clsx('row', styles['custom-row'])}>
                    <div className={clsx('col-6', styles['custom-col-6'])}>
                        {/* Order Info */}
                        <div className={styles['section-group']}>
                            <h2 className={styles['section-header']}>Order Information</h2>

                            <div className={styles['section-body']}>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Order number</span>
                                    <span>{id}</span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Order date</span>
                                    <span>{createdAt}</span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Status</span>
                                    <span>
                                        {status.slice(0, 1).toUpperCase() + status.slice(1)}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Shipping info */}
                        <div className={styles['section-group']}>
                            <h2 className={styles['section-header']}>Shipping Information</h2>

                            <div className={styles['section-body']}>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Name</span>
                                    <span>{contactInfo.fullName}</span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Phone number</span>
                                    <span>{contactInfo.phone}</span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Email</span>
                                    <span>{contactInfo.email}</span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Address</span>
                                    <span>
                                        {contactInfo.address.houseNumber +
                                            ' ' +
                                            contactInfo.address.ward +
                                            ' ' +
                                            contactInfo.address.district +
                                            ' ' +
                                            contactInfo.address.city}
                                    </span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Message</span>
                                    <span>{contactInfo.message}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order detail */}
                    <div className={clsx('col-6', styles['custom-col-6'])}>
                        <div className={styles['section-group']}>
                            <h2 className={styles['section-header']}>Order items</h2>

                            {/* List items */}
                            <div className={styles['list-items']}>
                                {items.map((item, index) => (
                                    <CartItemSummary key={item.id || index} item={item} />
                                ))}
                            </div>

                            {/* Summary */}
                            <div className={styles['summary']}>
                                <p className={clsx('space-between', 'mt-12')}>
                                    <span>Subtotal</span>
                                    <span>${summary.subTotal}</span>
                                </p>
                                <p className={clsx('space-between', 'mt-12')}>
                                    <span>Shipping</span>
                                    <span>${summary.shipping}</span>
                                </p>
                                <p className={clsx('space-between', 'mt-12')}>
                                    <span>Discount</span>
                                    <span>-${summary.discount}</span>
                                </p>
                                <h5 className={clsx('space-between', styles['total'])}>
                                    <span>Total</span>
                                    <span>${summary.total}</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className={styles['continue-btn']}>
                    <Button deepBlack to={routes.home}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
