import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';

import { ProviderContext } from '~/components/Provider';
import { api, backEndApi, formatCurrencyVN, toastError } from '~/utils';
import routes from '~/config/routes';

import ContactInfo from './ContactInfo';

import { CartItemSummary, Button } from '~/components';
import styles from './Checkout.module.scss';

function Checkout() {
    const [shippingMethods, setShippingMethods] = useState([]);
    const { cartList, subTotal, shippingFee, setShippingFee, discount, total } =
        useContext(ProviderContext);

    // ref for form
    const contactFormRef = useRef();

    useEffect(() => {
        const fetchingShipping = async () => {
            try {
                const res = await api.getAll(backEndApi.shipping);
                console.log(res);
                setShippingMethods(res);
                setShippingId(res[0]._id);
            } catch (err) {
                console.error('Fetching shipping failed...', err);
                toastError(err.response?.data?.message || 'Fetching shipping error!');
            }
        };

        fetchingShipping();
    }, []);

    const [shippingId, setShippingId] = useState();

    const handleShipping = (method) => {
        setShippingId(method._id);
        setShippingFee(method.price);
    };

    const handleConfirm = () => {
        contactFormRef.current.submit();
    };

    return (
        <div className={styles['wrapper']}>
            <div className="grid wide">
                <h1 className={styles['heading']}>Checkout</h1>

                <div className={styles['content']}>
                    <div className={styles['container']}>
                        {/* Contact info */}
                        <ContactInfo ref={contactFormRef} />

                        {/* Shipping method */}
                        <div className={styles['shipping']}>
                            <h3>Shipping method</h3>

                            <div className="row">
                                {shippingMethods &&
                                    shippingMethods.map((method) => (
                                        <div key={method._id} className="col-6">
                                            <div
                                                className={clsx(
                                                    styles['option'],
                                                    shippingId === method._id &&
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
                            <h3>Payment method</h3>

                            <div
                                className={clsx(
                                    styles['option'],
                                    styles['option-active'],
                                )}
                            >
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
                        {cartList.map((item) => (
                            <CartItemSummary key={item._id} item={item} />
                        ))}

                        <div className={styles['summary']}>
                            <div className={styles['space-between']}>
                                <span>Subtotal:</span>
                                <span>{formatCurrencyVN(subTotal)}</span>
                            </div>
                            <div className={styles['space-between']}>
                                <span>Shipping:</span>
                                <span>{formatCurrencyVN(shippingFee)}</span>
                            </div>

                            <div className={styles['space-between']}>
                                <span>Discount:</span>
                                <span>-{formatCurrencyVN(discount)}</span>
                            </div>

                            <div className={styles['space-between']}>
                                <span>Total:</span>
                                <strong>{formatCurrencyVN(total)}</strong>
                            </div>

                            <Button
                                deepBlack
                                customStyle={styles['confirm-btn']}
                                onClick={handleConfirm}
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
