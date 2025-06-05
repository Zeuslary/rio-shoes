import { useContext } from 'react';

import {
    api,
    backEndApi,
    displayAddress,
    formatCurrencyVN,
    storage,
    toastError,
    toastSuccess,
} from '~/utils';
import routes from '~/config/routes';

import { ProviderContext } from '~/components/Provider';
import { Button, CartItemSummary } from '~/components';
import { ReturnIcon } from '~/assets/icons';
import styles from './ConfirmOrder.module.scss';
import { keyLocalStorageCart } from '~/constants';
import { useNavigate } from 'react-router';

function ConfirmOrder() {
    const {
        profile,
        cartList,
        setCartList,
        contactInfo,
        subTotal,
        shipping,
        payment,
        discount,
        total,
    } = useContext(ProviderContext);

    const navigate = useNavigate();

    const handleOrder = async () => {
        const dataSend = {
            profile,
            contactInfo,
            items: cartList,
            shipping,
            payment,
            discount,
        };

        try {
            const result = await api.post(backEndApi.order, dataSend);

            const shortData = {
                _id: result.data._id,
                estimateTime: shipping.estimateTime,
            };

            toastSuccess(result.message);

            // Delete items inside cart list
            setCartList([]);
            storage.remove(keyLocalStorageCart);

            // Switch to Order success
            navigate(routes.orderSuccess, {
                state: shortData,
            });
        } catch (err) {
            console.error('Order failed...', err);
            toastError(err?.response?.data?.message || 'Order error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['body']}>
                <h1 className={styles['header']}>Confirm Your Order</h1>

                <Button
                    to={routes.checkout}
                    leftIcon={<ReturnIcon />}
                    customStyle={styles['back-btn']}
                >
                    Back
                </Button>

                <div className={styles['content']}>
                    <div className={styles['section']}>
                        {/* Shipping info */}
                        <h2 className={styles['section-title']}>Shipping Information</h2>

                        <div className={styles['info']}>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Name</span>
                                <span>
                                    {(
                                        contactInfo?.fullName?.firstName +
                                        ' ' +
                                        contactInfo?.fullName?.lastName
                                    ).trim()}
                                </span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Phone number</span>
                                <span>{contactInfo?.phone}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Email</span>
                                <span>{contactInfo?.email}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Address</span>
                                <span>{displayAddress(contactInfo?.address)}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Message</span>
                                <span>{contactInfo?.message}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Shipping</span>
                                <span>
                                    {shipping?.name +
                                        ' - ' +
                                        formatCurrencyVN(shipping?.price)}
                                </span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Payment</span>
                                <span>{payment?.name}</span>
                            </p>
                        </div>
                    </div>

                    {/* Order detail */}
                    <div className={styles['section']}>
                        <h2 className={styles['section-title']}>Order detail</h2>

                        {/* List items */}
                        <div className={styles['list-items']}>
                            {cartList.length > 0 &&
                                cartList.map((item) => (
                                    <CartItemSummary key={item._id} item={item} />
                                ))}
                        </div>

                        {/* Summary */}
                        <div className={styles['summary']}>
                            <p>
                                <span>Subtotal</span>
                                <span>{formatCurrencyVN(subTotal)}</span>
                            </p>
                            <p>
                                <span>Shipping</span>
                                <span>{formatCurrencyVN(shipping?.price)}</span>
                            </p>
                            <p>
                                <span>Discount</span>
                                <span>
                                    -{formatCurrencyVN(discount?.discountValue || 0)}
                                </span>
                            </p>
                            <p className={styles['total']}>
                                <strong>Total</strong>
                                <strong>{formatCurrencyVN(total)}</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles['confirm']}>
                    <p>Please review all information before confirming your order</p>

                    <Button
                        // to={routes.orderDetail}
                        deepBlack
                        customStyle={styles['order-btn']}
                        onClick={handleOrder}
                    >
                        Place Order
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmOrder;
