import { useCallback, useState } from 'react';

import { api, backEndApi, patternValidate, toastError, toastSuccess } from '~/utils';

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
            const result = await api.getAll(`${backEndApi.orderTracking}?phone=${phone}`);

            toastSuccess(result.message);
            setPhone('');
            setOrders(result.data);
        } catch (err) {
            console.log('Filter order failed...', err);
            toastError(err?.response?.data?.message);
        }
    }, [phone]);

    console.log('Orders: ', orders);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Order Tracking</h1>

                <div className={styles['find-wrap']}>
                    <input
                        className={styles['input']}
                        type="text"
                        placeholder="Enter your phone order"
                        autoFocus
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Button
                        deepBlack
                        customStyle={styles['find-btn']}
                        onClick={handleFind}
                        type="submit"
                    >
                        Find order
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
