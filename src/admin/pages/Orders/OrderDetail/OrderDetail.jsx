import { formatCurrencyVN } from '~/utils';

import CartItemSummary from '../CartItemSummary';

import { CartBox } from '~/admin/components';
import styles from './OrderDetail.module.scss';

function OrderDetail({ orderDetail }) {
    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>View Order detail</h2>

            <div className="row">
                <div className="col-6">
                    {/* Shipping info */}
                    <CartBox>
                        <h2 className={styles['section-title']}>Shipping Information</h2>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>ID</span>
                            <span>{orderDetail._id}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Name</span>
                            <span>{orderDetail.customerName}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Phone</span>
                            <span>{orderDetail.phone}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Email</span>
                            <span>{orderDetail?.email}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Address</span>
                            <span>{orderDetail.addressDetail}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Message</span>
                            <span>{orderDetail.message}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Shipping</span>
                            <span>{orderDetail.shippingId?.name}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Payment</span>
                            <span>{orderDetail.paymentId.name}</span>
                        </p>
                    </CartBox>

                    {/* Order status */}
                    <div className="mt-24">
                        <CartBox>
                            <h2 className={styles['section-title']}>Order Status</h2>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title-longer']}>
                                    Status
                                </span>
                                <span>{orderDetail.status}</span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title-longer']}>
                                    Shipping Date
                                </span>
                                <span>
                                    {orderDetail.statusDate?.shipping?.slice(0, 10)}
                                </span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title-longer']}>
                                    Delivery Date
                                </span>
                                <span>
                                    {orderDetail.statusDate?.delivery?.slice(0, 10)}
                                </span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title-longer']}>
                                    Completed Date
                                </span>
                                <span>
                                    {orderDetail.statusDate?.complete?.slice(0, 10)}
                                </span>
                            </p>
                            <p className={styles['info-item']}>
                                <span className={styles['info-title-longer']}>
                                    Cancelled Date
                                </span>
                                <span>
                                    {orderDetail.statusDate?.cancelled?.slice(0, 10)}
                                </span>
                            </p>
                        </CartBox>
                    </div>
                </div>

                {/* Order detail */}
                <div className="col-6">
                    <CartBox>
                        <h2 className={styles['section-title']}>Order detail</h2>

                        {/* List items */}
                        <div className={styles['list-items']}>
                            {orderDetail.items.map((item) => (
                                <CartItemSummary key={item._id} item={item} />
                            ))}
                        </div>

                        {/* Summary */}
                        <div className={styles['summary']}>
                            <p>
                                <span>Subtotal</span>
                                <span>
                                    {formatCurrencyVN(orderDetail.summary.subtotal)}
                                </span>
                            </p>
                            <p>
                                <span>Shipping</span>
                                <span>
                                    {formatCurrencyVN(orderDetail.summary.shippingFee)}
                                </span>
                            </p>
                            <p>
                                <span>Discount</span>
                                <span>
                                    -{formatCurrencyVN(orderDetail.summary.discount)}
                                </span>
                            </p>
                            <p className={styles['total']}>
                                <strong>Total</strong>
                                <strong>
                                    {formatCurrencyVN(orderDetail.summary.total)}
                                </strong>
                            </p>
                        </div>
                    </CartBox>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
