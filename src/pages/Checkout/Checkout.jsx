import clsx from 'clsx';
import { useState } from 'react';

import routes from '~/config/routes';
import ContactInfo from './ContactInfo';
import Button from '~/components/Button';
import CartItemSummary from '../../components/CartItemSummary';
import styles from './Checkout.module.scss';

const shippingMethods = [
    {
        id: 'standard',
        name: 'Standard',
        description: '3-5 business days',
        price: 9.99,
    },
    {
        id: 'express',
        name: 'Express',
        description: '1-2 business days',
        price: 19.99,
    },
];

// Fake item
const items = [
    {
        name: 'Adidas Ultraboost 22',
        image: '/src/assets/images/product/nike-1.png',
        size: 42,
        color: 'Black',
        price: 150,
        quantity: 2,
    },
    {
        name: 'Converse Chuck Taylor All Star',
        image: '/src/assets/images/product/nike-1.png',
        size: 40,
        color: 'Red',
        price: 75,
        quantity: 1,
    },
    {
        name: 'Nike Air Force 1',
        image: '/src/assets/images/product/nike-1.png',
        size: 38,
        color: 'White',
        price: 120,
        quantity: 1,
    },
];

function Checkout() {
    const [shippingId, setShippingId] = useState(shippingMethods[0].id);

    const subTotal = items.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
    );

    const shippingFee = Number(shippingMethods.find((item) => item.id === shippingId).price);

    const discount = 0;

    const total = subTotal + shippingFee;

    return (
        <div className={styles['wrapper']}>
            <div className="grid wide">
                <h1 className={styles['heading']}>Checkout</h1>

                <div className={styles['content']}>
                    <div className={styles['container']}>
                        {/* Contact info */}
                        <ContactInfo />

                        {/* Shipping method */}
                        <div className={styles['shipping']}>
                            <h3>Shipping method</h3>

                            <div className="row">
                                {shippingMethods.map((method) => (
                                    <div key={method.id} className="col-6">
                                        <div
                                            className={clsx(
                                                styles['option'],
                                                shippingId === method.id && styles['option-active'],
                                            )}
                                            onClick={() => setShippingId(method.id)}
                                        >
                                            <div className={styles['option-info']}>
                                                <h5 className={styles['option-title']}>
                                                    {method.name}
                                                </h5>
                                                <p className={styles['option-desc']}>
                                                    {method.description}
                                                </p>
                                            </div>
                                            <span className={styles['option-price']}>
                                                ${method.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment method */}
                        <div className={styles['payment']}>
                            <h3>Payment method</h3>

                            <div className={clsx(styles['option'], styles['option-active'])}>
                                <div className={styles['option-info']}>
                                    <h5 className={styles['option-title']}>
                                        Cash on Delivery (COD)
                                    </h5>
                                    <p className={styles['option-desc']}>
                                        Pay when you receive your order
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order-detail */}
                    <div className={styles['order-detail']}>
                        <h3>Order detail</h3>

                        {/* List item */}
                        {items.map((item, index) => (
                            <CartItemSummary key={item.id || index} item={item} />
                        ))}

                        <div className={styles['summary']}>
                            <div className={styles['space-between']}>
                                <span>Subtotal:</span>
                                <span>${subTotal}</span>
                            </div>
                            <div className={styles['space-between']}>
                                <span>Shipping:</span>
                                <span>${shippingFee}</span>
                            </div>

                            <div className={styles['space-between']}>
                                <span>Discount:</span>
                                <span>-${discount}</span>
                            </div>

                            <div className={styles['space-between']}>
                                <span>Total:</span>
                                <strong>${total}</strong>
                            </div>

                            <Button
                                to={routes.confirmOrder}
                                deepBlack
                                customStyle={styles['confirm-btn']}
                            >
                                Confirm order
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
