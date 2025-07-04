import clsx from 'clsx';
import { useContext, useEffect, useRef } from 'react';

import { ProviderContext } from '~/components/Provider';
import { userApi, backEndApi, formatCurrencyVN, storage, toastError } from '~/utils';

import ContactInfo from './ContactInfo';

import { CartItemSummary, Button } from '~/components';
import styles from './Checkout.module.scss';
import { keyPaymentMethods, keyShippingMethods } from '~/constants';

function Checkout() {
    const {
        cartList,

        shippingMethods,
        setShippingMethods,

        shipping,
        setShipping,

        payment,
        setPayment,

        paymentMethods,
        setPaymentMethods,

        discount,
        subTotal,
        total,
    } = useContext(ProviderContext);

    // ref for form
    const contactFormRef = useRef();

    // Loading shipping
    useEffect(() => {
        if (shippingMethods.length === 0) {
            const cached = storage.get(keyShippingMethods);

            if (cached) {
                setShippingMethods(cached);
                setShipping(cached[0]);
            } else {
                const fetchShippings = async () => {
                    try {
                        const res = await userApi.getAll(backEndApi.shipping);

                        setShippingMethods(res);
                        setShipping(res[0]);
                    } catch (err) {
                        toastError(
                            err.response?.data?.message || 'Fetching shipping error!',
                        );
                    }
                };

                fetchShippings();
            }
        }
    }, []);

    // Load payment
    useEffect(() => {
        if (paymentMethods.length === 0) {
            const cached = storage.get(keyPaymentMethods);

            if (cached) {
                setPaymentMethods(cached);
                setPayment(cached.find((payment) => payment.code === 'cod'));
            } else {
                const fetchPayments = async () => {
                    try {
                        const res = await userApi.getAll(backEndApi.payment);

                        setPaymentMethods(res);
                        setPayment(res.find((payment) => payment.code === 'cod'));
                    } catch (err) {
                        toastError(
                            err.response?.data?.message || 'Fetching payment error!',
                        );
                    }
                };
                fetchPayments();
            }
        }
    }, []);

    const handleShipping = (method) => {
        setShipping(method);
    };

    const handleConfirm = () => {
        contactFormRef.current.submit();
    };

    return (
        <div className={styles['wrapper']}>
            <div className="grid wide">
                <h1 className={styles['heading']}>Thanh toán</h1>

                <div className={styles['content']}>
                    <div className={styles['container']}>
                        {/* Contact info */}
                        <ContactInfo ref={contactFormRef} />

                        {/* Shipping method */}
                        <div className={styles['shipping']}>
                            <h3>Phương thức vận chuyển</h3>

                            <div className="row">
                                {shippingMethods &&
                                    shippingMethods.map((method) => (
                                        <div key={method?._id} className="col-6 col-s-12">
                                            <div
                                                className={clsx(
                                                    styles['option'],
                                                    shipping?._id === method?._id &&
                                                        styles['option-active'],
                                                )}
                                                onClick={() => handleShipping(method)}
                                            >
                                                <div className={styles['option-info']}>
                                                    <h5
                                                        className={styles['option-title']}
                                                    >
                                                        {method.name}
                                                    </h5>

                                                    <p className={styles['option-desc']}>
                                                        {method.estimateTime}
                                                    </p>
                                                </div>
                                                <span className={styles['option-price']}>
                                                    {formatCurrencyVN(method.price)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Payment method */}
                        <div className={styles['payment']}>
                            <h3>Phương thức thanh toán</h3>

                            <div
                                className={clsx(
                                    styles['option'],
                                    styles['option-active'],
                                )}
                            >
                                <div className={styles['option-info']}>
                                    <h5 className={styles['option-title']}>
                                        {`${
                                            payment?.name
                                        } (${payment?.code?.toUpperCase()})`}
                                    </h5>
                                    <p className={styles['option-desc']}>
                                        {payment?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order-detail */}
                    <div className={styles['order-detail']}>
                        <h3>Chi tiết đơn hàng</h3>

                        {/* List item */}
                        {cartList.map((item) => (
                            <CartItemSummary key={item._id} item={item} />
                        ))}

                        <div className={styles['summary']}>
                            <div className={styles['space-between']}>
                                <span>Tạm tính:</span>
                                <span>{formatCurrencyVN(subTotal)}</span>
                            </div>
                            <div className={styles['space-between']}>
                                <span>Phí vận chuyển:</span>
                                <span>{formatCurrencyVN(shipping?.price)}</span>
                            </div>

                            <div className={styles['space-between']}>
                                <span>Giảm giá:</span>
                                <span>
                                    -{formatCurrencyVN(discount?.discountValue || 0)}
                                </span>
                            </div>

                            <div className={styles['space-between']}>
                                <span>Tổng: </span>
                                <strong>{formatCurrencyVN(total)}</strong>
                            </div>

                            <Button
                                deepBlack
                                customStyle={clsx('s-m-hidden', styles['confirm-btn'])}
                                onClick={handleConfirm}
                            >
                                Thanh toán
                            </Button>
                        </div>

                        {/* Button Confirm for mobile */}
                        <div className={styles['confirm-mobile']}>
                            <div className={styles['space-between']}>
                                <span>Tổng: </span>
                                <strong>{formatCurrencyVN(total)}</strong>
                            </div>

                            <Button
                                deepBlack
                                customStyle={clsx(styles['confirm-btn'])}
                                onClick={handleConfirm}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
