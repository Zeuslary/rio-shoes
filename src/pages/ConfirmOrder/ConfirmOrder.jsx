import CartItemSummary from '~/components/CartItemSummary';
import Button from '~/components/Button';
import styles from './ConfirmOrder.module.scss';

// Fake confirm order
const fakeConfirmOrderData = {
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
    ],
    summary: {
        subTotal: 495,
        shipping: 19.99,
        discount: 0,
        total: 514.99,
    },
    createdAt: '2025-05-07',
};

function ConfirmOrder() {
    const { contactInfo, shippingMethod, paymentMethod, items, summary } = fakeConfirmOrderData;

    return (
        <div className={styles['wrapper']}>
            <div className={styles['body']}>
                <h1 className={styles['header']}>Confirm Your Order</h1>

                <div className={styles['content']}>
                    <div className={styles['section']}>
                        {/* Shipping info */}
                        <h2 className={styles['section-title']}>Shipping Information</h2>

                        <div className={styles['info']}>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Name</span>
                                <span>{contactInfo.fullName}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Phone number</span>
                                <span>{contactInfo.phone}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Email</span>
                                <span>{contactInfo.email}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Address</span>
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
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Message</span>
                                <span>{contactInfo.message}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Shipping</span>
                                <span>{shippingMethod.name + ' - $' + shippingMethod.price}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Payment</span>
                                <span>{paymentMethod.type}</span>
                            </p>
                        </div>
                    </div>

                    {/* Order detail */}
                    <div className={styles['section']}>
                        <h2 className={styles['section-title']}>Order detail</h2>

                        {/* List items */}
                        <div className={styles['list-items']}>
                            {items.map((item, index) => (
                                <CartItemSummary key={item.id || index} item={item} />
                            ))}
                        </div>

                        {/* Summary */}
                        <div className={styles['summary']}>
                            <p>
                                <span>Subtotal</span>
                                <span>${summary.subTotal}</span>
                            </p>
                            <p>
                                <span>Shipping</span>
                                <span>${summary.shipping}</span>
                            </p>
                            <p>
                                <span>Discount</span>
                                <span>-${summary.discount}</span>
                            </p>
                            <p className={styles['total']}>
                                <strong>Total</strong>
                                <strong>${summary.total}</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles['confirm']}>
                    <p>Please review all information before confirming your order</p>
                    <Button deepBlack customStyle={styles['order-btn']}>
                        Place Order
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmOrder;
