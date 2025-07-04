import { useContext } from 'react';

import {
    userApi,
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
        cartList,
        setCartList,

        customerProfile,

        subTotal,
        shipping,
        payment,
        discount,
        total,
    } = useContext(ProviderContext);

    const navigate = useNavigate();

    const handleOrder = async () => {
        const dataSend = {
            profile: customerProfile,
            items: cartList,
            shipping,
            payment,
            discount,
        };

        // console.log('Data send: ', dataSend);

        try {
            const result = await userApi.post(backEndApi.order, dataSend);

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

    console.log('Customer: ', customerProfile);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['body']}>
                <h1 className={styles['header']}>Xác nhận đơn hàng</h1>

                <Button
                    to={routes.checkout}
                    leftIcon={<ReturnIcon />}
                    customStyle={styles['back-btn']}
                >
                    Quay lại
                </Button>

                <div className={styles['content']}>
                    <div className={styles['section']}>
                        {/* Shipping info */}
                        <h2 className={styles['section-title']}>Thông tin vận chuyển</h2>

                        <div className={styles['info']}>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Họ và tên:</span>
                                <span>
                                    {(
                                        customerProfile?.fullName?.firstName +
                                        ' ' +
                                        customerProfile?.fullName?.lastName
                                    ).trim()}
                                </span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>
                                    Số điện thoại
                                </span>
                                <span>{customerProfile?.phone}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Email</span>
                                <span>{customerProfile?.email}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Địa chỉ</span>
                                <span>{displayAddress(customerProfile?.address)}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Tin nhắn</span>
                                <span>{customerProfile?.message}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Vận chuyển</span>
                                <span>
                                    {shipping?.name +
                                        ' - ' +
                                        formatCurrencyVN(shipping?.price)}
                                </span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title']}>Thanh toán</span>
                                <span>{payment?.name}</span>
                            </p>
                        </div>
                    </div>

                    {/* Order detail */}
                    <div className={styles['section']}>
                        <h2 className={styles['section-title']}>Chi tiết đơn hàng</h2>

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
                                <span>Tạm tính</span>
                                <span>{formatCurrencyVN(subTotal)}</span>
                            </p>
                            <p>
                                <span>Phí vận chuyển</span>
                                <span>{formatCurrencyVN(shipping?.price)}</span>
                            </p>
                            <p>
                                <span>Giảm giá</span>
                                <span>
                                    -{formatCurrencyVN(discount?.discountValue || 0)}
                                </span>
                            </p>
                            <p className={styles['total']}>
                                <strong>Tổng</strong>
                                <strong>{formatCurrencyVN(total)}</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles['confirm']}>
                    <p>Vui lòng kiểm tra tất cả thông tin trước khi xác nhận đơn hàng</p>

                    <Button
                        // to={routes.orderDetail}
                        deepBlack
                        customStyle={styles['order-btn']}
                        onClick={handleOrder}
                    >
                        Xác nhận
                    </Button>
                </div>

                {/* Confirm mobile */}
                <div className={styles['confirm-mobile']}>
                    <p className={styles['total']}>
                        <span>Tổng: </span>
                        <strong>{formatCurrencyVN(total)}</strong>
                    </p>

                    <Button
                        // to={routes.orderDetail}
                        deepBlack
                        customStyle={styles['order-btn-mobile']}
                        onClick={handleOrder}
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmOrder;
