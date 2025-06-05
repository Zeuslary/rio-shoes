import clsx from 'clsx';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import {
    api,
    backEndApi,
    formatCurrencyVN,
    toastError,
    upperCaseFirstLetter,
} from '~/utils';
import routes from '~/config/routes';

import { Button, CartItemSummary } from '~/components';
import styles from './OrderDetail.module.scss';

function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState();

    // Fetch order detail using `id`
    useEffect(() => {
        const fetchingData = async (id) => {
            if (!id) {
                toastError('Get order error!');
                return;
            }
            try {
                const result = await api.getById(backEndApi.order, id);

                setOrder(result.data);
            } catch (err) {
                console.log('Get order failed...', err);
                toastError('Get order error!');
            }
        };

        fetchingData(id);
    }, [id]);

    return (
        <div className={styles['wrapper']}>
            <div className={clsx('grid wide', styles['custom-grid'])}>
                <h1 className={styles['header']}>Order detail</h1>

                <div className={clsx('row', styles['custom-row'])}>
                    <div className={clsx('col-6', styles['custom-col-6'])}>
                        {/* Order Info */}
                        <div className={styles['section-group']}>
                            <h2 className={styles['section-header']}>
                                Order Information
                            </h2>

                            <div className={styles['section-body']}>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>
                                        Order ID
                                    </span>
                                    <span>{order?._id}</span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>
                                        Order date
                                    </span>
                                    <span>{order?.createdAt}</span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>
                                        Status
                                    </span>
                                    <span>{upperCaseFirstLetter(order?.status)}</span>
                                </p>
                            </div>
                        </div>

                        {/* Shipping info */}
                        <div className={styles['section-group']}>
                            <h2 className={styles['section-header']}>
                                Shipping Information
                            </h2>

                            <div className={styles['section-body']}>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Name</span>
                                    <span>{order?.customerId?.getFullName}</span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Phone</span>
                                    <span>{order?.customerId?.phone}</span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>Email</span>
                                    <span>{order?.customerId?.email}</span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>
                                        Address
                                    </span>
                                    <span>
                                        {order?.address.houseNumber +
                                            ' ' +
                                            order?.address.ward +
                                            ' ' +
                                            order?.address.district +
                                            ' ' +
                                            order?.address.city}
                                    </span>
                                </p>
                                <p className={styles['section-item']}>
                                    <span className={styles['section-label']}>
                                        Message
                                    </span>
                                    <span>{order?.message}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order detail */}
                    <div className={clsx('col-6', styles['custom-col-6'])}>
                        <div className={styles['section-group']}>
                            <h2 className={styles['section-header']}>Order items</h2>

                            {/* List items */}
                            <div className={styles['list-items']}>
                                {order?.items?.length > 0 &&
                                    order.items.map((item, index) => (
                                        <CartItemSummary key={index} item={item} />
                                    ))}
                            </div>

                            {/* Summary */}
                            <div className={styles['summary']}>
                                <p className={clsx('space-between', 'mt-12')}>
                                    <span>Subtotal</span>
                                    <span>
                                        {formatCurrencyVN(order?.summary?.subTotal)}
                                    </span>
                                </p>
                                <p className={clsx('space-between', 'mt-12')}>
                                    <span>Shipping</span>
                                    <span>
                                        {formatCurrencyVN(order?.summary?.shippingFee)}
                                    </span>
                                </p>
                                <p className={clsx('space-between', 'mt-12')}>
                                    <span>Discount</span>
                                    <span>
                                        -{formatCurrencyVN(order?.summary?.discount)}
                                    </span>
                                </p>
                                <h5 className={clsx('space-between', styles['total'])}>
                                    <span>Total</span>
                                    <span>{formatCurrencyVN(order?.summary?.total)}</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className={styles['continue-btn']}>
                    <Button deepBlack to={routes.home}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
