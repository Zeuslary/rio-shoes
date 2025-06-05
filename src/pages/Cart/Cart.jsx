import clsx from 'clsx';
import { useContext, useState } from 'react';

import { api, backEndApi, formatCurrencyVN, toastError } from '~/utils';
import routes from '~/config/routes';

import CartItem from './CartItem';

import { Button } from '~/components';
import { ProviderContext } from '~/components/Provider';
import { CartIcon } from '~/assets/icons';
import styles from './Cart.module.scss';

function Cart() {
    const { cartList, subTotal, shipping, discount, setDiscount, total } =
        useContext(ProviderContext);

    const [code, setCode] = useState('');

    const handleLoadDiscount = async () => {
        if (!code) {
            toastError('Please enter your code!');
            return;
        }

        try {
            const res = await api.getAll(`${backEndApi.voucher}/check?code=${code}`);

            setDiscount(res.data);
        } catch (err) {
            console.error('Apply voucher failed...', err);
            toastError(err.response?.data?.message || 'Apply voucher error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <div className="grid wide">
                <h2 className={styles['heading']}>Shopping Cart</h2>
                <div className={styles['content']}>
                    {/* List cards */}
                    <div className={styles['list-carts']}>
                        {cartList.map((item, index) => (
                            <CartItem key={index} item={item} />
                        ))}
                    </div>

                    <div className={styles['summary-wrapper']}>
                        {/* Summary */}
                        <div className={styles['summary']}>
                            <h3 className={styles['title']}>Order Summary</h3>

                            <div className={styles['space-between']}>
                                <span>Subtotal:</span>
                                <span>{formatCurrencyVN(subTotal)}</span>
                            </div>

                            <div className={styles['space-between']}>
                                <span>Shipping:</span>
                                <span>{formatCurrencyVN(shipping?.price)}</span>
                            </div>

                            <div className={styles['code']}>
                                <input
                                    type="text"
                                    placeholder="Enter promotion code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <Button
                                    deepBlack
                                    small
                                    customStyle={styles['apply-btn']}
                                    onClick={handleLoadDiscount}
                                >
                                    Apply
                                </Button>
                            </div>

                            <div className={styles['space-between']}>
                                <span>Discount:</span>
                                <span>-{formatCurrencyVN(discount?.discountValue)}</span>
                            </div>

                            <div
                                className={clsx(styles['space-between'], styles['total'])}
                            >
                                <span>Total:</span>
                                <strong>{formatCurrencyVN(total)}</strong>
                            </div>

                            <Button
                                to={routes.checkout}
                                deepBlack
                                small
                                customStyle={styles['checkout-btn']}
                            >
                                Checkout
                            </Button>
                        </div>

                        {/* Promotion */}
                        <div className={styles['promotions']}>
                            <div className={styles['promotion-item']}>
                                <CartIcon className={styles['promotion-icon']} />
                                <div>
                                    <h4>Free Shipping</h4>
                                    <p>On order over $999</p>
                                </div>
                            </div>

                            <div className={styles['promotion-item']}>
                                <CartIcon className={styles['promotion-icon']} />
                                <div>
                                    <h4>30 Days Return</h4>
                                    <p>Easy returns within 30 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
