import { useCallback, useState } from 'react';

import { userApi, backEndApi, patternValidate, toastError, toastSuccess } from '~/utils';

import { Button, OrderCart } from '~/components';
import styles from './OrderTracking.module.scss';

function OrderTracking() {
    const [orders, setOrders] = useState([]);
    const [phone, setPhone] = useState('');

    const handleFind = useCallback(async () => {
        console.log('Phone: ', phone);

        setOrders([]);

        if (!phone) {
            toastError('Please enter your phone order!');
            return;
        }

        const isPhone = patternValidate.phone.value.test(phone);

        if (!isPhone) {
            toastError(patternValidate.phone.message + '!');
            return;
        }

        try {
            const result = await userApi.getAll(
                `${backEndApi.orderTracking}?phone=${phone}`,
            );

            toastSuccess(result.message);
            setPhone('');
            setOrders(result.data);
        } catch (err) {
            console.log('Filter order failed...', err);
            toastError(err?.response?.data?.message);
        }
    }, [phone]);

    // console.log('Orders: ', orders);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Tra cứu đơn hàng</h1>

                <div className={styles['find-wrap']}>
                    <input
                        className={styles['input']}
                        type="text"
                        placeholder="Nhập số điện thoại đặt hàng"
                        autoFocus
                        value={phone}
                        onChange={(e) => setPhone(e.target.value?.trim())}
                        onKeyUp={(e) => e.keyCode === 13 && handleFind()}
                    />

                    <Button
                        deepBlack
                        customStyle={styles['find-btn']}
                        onClick={handleFind}
                        type="submit"
                    >
                        Tra cứu
                    </Button>
                </div>
            </div>

            {/* Find order  */}
            {orders.length > 0 && (
                <>
                    {orders.map((order) => (
                        <OrderCart key={order._id} order={order} />
                    ))}
                </>
            )}
        </div>
    );
}

export default OrderTracking;
