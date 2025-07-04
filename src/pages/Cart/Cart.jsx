import clsx from 'clsx';
import { useCallback, useContext, useState } from 'react';

import { userApi, backEndApi, formatCurrencyVN, toastError } from '~/utils';
import routes from '~/config/routes';

import CartItem from './CartItem';

import images from '~/assets/images';
import { Button, Image } from '~/components';
import { ProviderContext } from '~/components/Provider';
import { CartIcon, ChevronDownIcon, ChevronUpIcon } from '~/assets/icons';
import styles from './Cart.module.scss';

function Cart() {
    const { cartList, subTotal, shipping, discount, setDiscount, total } =
        useContext(ProviderContext);

    const [code, setCode] = useState('');

    const [isShowSummary, setIsShowSummary] = useState(false);

    const handleLoadDiscount = useCallback(async () => {
        if (!code) {
            toastError('Please enter your code!');
            return;
        }

        try {
            const res = await userApi.getAll(`${backEndApi.voucher}/check?code=${code}`);

            setDiscount(res.data);
        } catch (err) {
            console.error('Apply voucher failed...', err);
            toastError(err.response?.data?.message || 'Apply voucher error!');
        }
    }, [code]);

    const handleSummary = useCallback(() => {
        setIsShowSummary((pre) => !pre);
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className="grid wide">
                <h2 className={styles['heading']}>Giỏ hàng</h2>
                {/* Cart empty */}
                {cartList.length == 0 && (
                    <div className={styles['cart-empty']}>
                        <Image
                            src={images.cartEmpty}
                            className={styles['cart-empty-img']}
                        />
                        <h3 className={styles['cart-empty-label']}>
                            Giỏ hàng đang trống
                        </h3>
                    </div>
                )}

                {/* Have products */}
                {cartList.length > 0 && (
                    <div className={styles['content']}>
                        {/* List cards */}
                        <div className={styles['list-carts']}>
                            {cartList.map((item, index) => (
                                <CartItem key={index} item={item} />
                            ))}
                        </div>

                        <div className={styles['summary-wrapper']}>
                            {/* Summary */}
                            <div className={clsx(styles['summary'])}>
                                <h3 className={styles['title']}>Tóm tắt đơn hàng</h3>

                                {!isShowSummary && (
                                    <Button
                                        rounder
                                        leftIcon={<ChevronDownIcon />}
                                        customStyle={styles['summary-btn']}
                                        onClick={handleSummary}
                                    ></Button>
                                )}

                                {isShowSummary && (
                                    <Button
                                        rounder
                                        leftIcon={<ChevronUpIcon />}
                                        customStyle={styles['summary-btn']}
                                        onClick={handleSummary}
                                    ></Button>
                                )}

                                <div
                                    className={clsx(
                                        isShowSummary ? '' : 's-hidden',
                                        styles['summary-body'],
                                    )}
                                >
                                    <div className={styles['space-between']}>
                                        <span>Tạm tính:</span>
                                        <span>{formatCurrencyVN(subTotal)}</span>
                                    </div>

                                    <div className={styles['space-between']}>
                                        <span>Phí vận chuyển:</span>
                                        <span>{formatCurrencyVN(shipping?.price)}</span>
                                    </div>

                                    <div className={styles['code']}>
                                        <input
                                            type="text"
                                            placeholder="Nhập mã giảm giá"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                        <Button
                                            deepBlack
                                            small
                                            customStyle={styles['apply-btn']}
                                            onClick={handleLoadDiscount}
                                        >
                                            Áp dụng
                                        </Button>
                                    </div>

                                    <div className={styles['space-between']}>
                                        <span>Giảm giá:</span>
                                        <span>
                                            -
                                            {formatCurrencyVN(
                                                discount?.discountValue || 0,
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles['summary-footer']}>
                                    <div
                                        className={clsx(
                                            styles['space-between'],
                                            styles['total'],
                                        )}
                                    >
                                        <span>Tổng: </span>
                                        <strong>{formatCurrencyVN(total)}</strong>
                                    </div>

                                    <Button
                                        to={routes.checkout}
                                        deepBlack
                                        small
                                        customStyle={styles['checkout-btn']}
                                    >
                                        Thanh toán
                                    </Button>
                                </div>
                            </div>

                            {/* Summary for mobile */}
                            {/* <div className={styles['summary-mobile']}>
                                <h3 className={styles['title']}>Tóm tắt đơn hàng</h3>

                                <div className={styles['space-between']}>
                                    <span>Tạm tính:</span>
                                    <span>{formatCurrencyVN(subTotal)}</span>
                                </div>

                                <div className={styles['space-between']}>
                                    <span>Phí vận chuyển:</span>
                                    <span>{formatCurrencyVN(shipping?.price)}</span>
                                </div>

                                <div className={styles['code']}>
                                    <input
                                        type="text"
                                        placeholder="Nhập mã giảm giá"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    <Button
                                        deepBlack
                                        small
                                        customStyle={styles['apply-btn']}
                                        onClick={handleLoadDiscount}
                                    >
                                        Áp dụng
                                    </Button>
                                </div>

                                <div className={styles['space-between']}>
                                    <span>Giảm giá:</span>
                                    <span>
                                        -{formatCurrencyVN(discount?.discountValue)}
                                    </span>
                                </div>

                                <div
                                    className={clsx(
                                        styles['space-between'],
                                        styles['total'],
                                    )}
                                >
                                    <span>Tổng:</span>
                                    <strong>{formatCurrencyVN(total)}</strong>
                                </div>

                                <Button
                                    to={routes.checkout}
                                    deepBlack
                                    small
                                    customStyle={styles['checkout-btn']}
                                >
                                    Thanh toán
                                </Button>
                            </div> */}

                            {/* Promotion */}
                            <div className={clsx('s-hidden', styles['promotions'])}>
                                <div className={styles['promotion-item']}>
                                    <CartIcon className={styles['promotion-icon']} />
                                    <div>
                                        <h4>Miễn phí vận chuyển</h4>
                                        <p>
                                            Cho đơn hàng từ {formatCurrencyVN(5000000)}{' '}
                                            trở lên
                                        </p>
                                    </div>
                                </div>

                                <div className={styles['promotion-item']}>
                                    <CartIcon className={styles['promotion-icon']} />
                                    <div>
                                        <h4> Đổi trả trong 30 ngày</h4>
                                        <p>Dễ dàng hoàn trả trong vòng 30 ngày</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
