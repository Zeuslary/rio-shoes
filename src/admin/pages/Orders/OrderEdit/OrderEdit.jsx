import clsx from 'clsx';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
    api,
    backEndApi,
    formatCurrencyVN,
    flatObject,
    toastError,
    toastSuccess,
    upperCaseFirstLetter,
} from '~/utils';

import CartItemSummary from '../CartItemSummary';

import { CartBox } from '~/admin/components';
import { AddressForm, Button } from '~/components';
import styles from './OrderEdit.module.scss';

function OrderEdit({ orderEdit, setOrderEdit, setMode, setOrders }) {
    // console.log('Editing...', orderEdit);
    const methods = useForm({
        defaultValues: {
            address: {
                city: orderEdit.address.city,
                district: orderEdit.address.district,
                ward: orderEdit.address.ward,
                houseNumber: orderEdit.address.houseNumber,
            },
            message: orderEdit?.message,
            status: orderEdit?.status,
            statusDate: {
                shipping: orderEdit?.statusDate?.shipping?.slice(0, 10),
                delivered: orderEdit?.statusDate?.delivered?.slice(0, 10),
                completed: orderEdit?.statusDate?.completed?.slice(0, 10),
                cancelled: orderEdit?.statusDate?.cancelled?.slice(0, 10),
            },
        },
    });

    const {
        register,
        trigger,
        formState: { errors },
        watch,
        handleSubmit,
    } = methods;

    const status = watch('status');
    const shippingDate = watch('statusDate.shipping');
    const deliveredDate = watch('statusDate.delivered');
    const completedDate = watch('statusDate.completed');
    const cancelledDate = watch('statusDate.cancelled');

    useEffect(() => {
        trigger('statusDate.delivered');
    }, [shippingDate]);

    useEffect(() => {
        trigger('statusDate.delivered');
        trigger('statusDate.completed');
    }, [deliveredDate]);

    useEffect(() => {
        trigger('statusDate.completed');
        trigger('statusDate.cancelled');
    }, [completedDate]);

    useEffect(() => {
        trigger('statusDate.cancelled');
    }, [cancelledDate]);

    const handleEdit = async (data) => {
        try {
            const result = await api.putById(
                backEndApi.order,
                orderEdit._id,
                flatObject(data),
            );

            toastSuccess(result.message);

            // Update order to list
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === result.data._id ? result.data : order,
                ),
            );

            // Back to view mode
            setOrderEdit();
            setMode('view');
        } catch (err) {
            console.error('Update order failed..', err);
            toastError(err?.response?.data?.message || 'Update order error!');
        }
    };

    const handleCancel = () => {
        setOrderEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Update order</h2>

            <div className="row">
                <div className="col-7">
                    <CartBox>
                        <h2 className={styles['section-title']}>Order Status</h2>

                        {/* Part to update */}
                        <FormProvider {...methods}>
                            <form
                                action=""
                                onSubmit={handleSubmit(handleEdit)}
                                encType="multipart/form-data"
                            >
                                {/* Status */}
                                <div>
                                    <label className={styles['status-title']}>
                                        Current Status:
                                    </label>
                                    <strong
                                        className={
                                            status === 'pending'
                                                ? 'text-yellow'
                                                : status === 'shipping'
                                                ? 'text-orange'
                                                : status === 'delivered'
                                                ? 'text-blue'
                                                : status === 'completed'
                                                ? 'text-green'
                                                : 'text-red'
                                        }
                                    >
                                        {upperCaseFirstLetter(status)}
                                    </strong>
                                </div>

                                {/* Status date */}
                                <div className="row">
                                    {/* Shipping date */}
                                    <div className="col-6">
                                        <label className="form-label">
                                            Shipping date
                                        </label>
                                        <input
                                            className="form-input"
                                            type="date"
                                            {...register('statusDate.shipping')}
                                        />
                                        <p className="form-msg-err">
                                            {errors.statusDate?.shipping &&
                                                errors.statusDate?.shipping.message}
                                        </p>
                                    </div>

                                    {/* Delivered date */}
                                    <div className="col-6">
                                        <label className="form-label">
                                            Delivered date
                                        </label>
                                        <input
                                            className="form-input"
                                            type="date"
                                            {...register('statusDate.delivered', {
                                                validate: (value) => {
                                                    if (!value) return;
                                                    if (!shippingDate)
                                                        return 'You must be enter shipping date first';

                                                    return (
                                                        new Date(value) >=
                                                            new Date(shippingDate) ||
                                                        'Delivered date need equal or larger than shipping date'
                                                    );
                                                },
                                            })}
                                        />
                                        <p className="form-msg-err">
                                            {errors.statusDate?.delivered &&
                                                errors.statusDate?.delivered.message}
                                        </p>
                                    </div>

                                    {/* Completed date */}
                                    <div className="col-6">
                                        <label className="form-label">
                                            Completed date
                                        </label>
                                        <input
                                            className="form-input"
                                            type="date"
                                            {...register('statusDate.completed', {
                                                validate: (value) => {
                                                    if (!value) return;
                                                    if (!deliveredDate)
                                                        return 'You must be enter delivered date first ';

                                                    return (
                                                        new Date(value) >=
                                                            new Date(deliveredDate) ||
                                                        'Completed date need equal or larger than delivered date'
                                                    );
                                                },
                                            })}
                                        />
                                        <p className="form-msg-err">
                                            {errors.statusDate?.completed &&
                                                errors.statusDate?.completed.message}
                                        </p>
                                    </div>

                                    {/* Cancelled date */}
                                    <div className="col-6">
                                        <label className="form-label">
                                            Cancelled date
                                        </label>
                                        <input
                                            className="form-input"
                                            type="date"
                                            {...register('statusDate.cancelled', {
                                                validate: (value) => {
                                                    if (!value) return;
                                                    if (completedDate)
                                                        return 'Either completed or cancelled date';
                                                },
                                            })}
                                        />
                                        <p className="form-msg-err">
                                            {errors.statusDate?.cancelled &&
                                                errors.statusDate?.cancelled.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Address */}
                                <AddressForm />

                                {/* Actions */}
                                <div className="mt-24 text-center mb-12">
                                    <Button
                                        type="button"
                                        gray
                                        customStyle={styles['cancel-btn']}
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        deepBlack
                                        customStyle={styles['submit-btn']}
                                        type="submit"
                                    >
                                        Update order
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    </CartBox>
                </div>

                <div className="col-5">
                    {/* Order info */}
                    <CartBox>
                        <h2 className={styles['section-title']}>Order info</h2>
                        <p className={styles['section-des']}>Can't modified</p>

                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Name</span>
                            <span>{orderEdit.customerName}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Phone</span>
                            <span>{orderEdit.phone}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Message</span>
                            <span>{orderEdit.message}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Shipping</span>
                            <span>{orderEdit.shippingId?.name}</span>
                        </p>
                        <p className={styles['info-item']}>
                            <span className={styles['info-title']}>Payment</span>
                            <span>{orderEdit.paymentId.name}</span>
                        </p>
                    </CartBox>

                    {/* Summary order */}
                    <div className="mt-24">
                        <CartBox>
                            <h2 className={styles['section-title']}>Order detail</h2>
                            <p className={clsx('mb-12', styles['section-des'])}>
                                Can't modified
                            </p>

                            {/* List items */}
                            <div className={styles['list-items']}>
                                {orderEdit.items.map((item) => (
                                    <CartItemSummary key={item._id} item={item} />
                                ))}
                            </div>

                            {/* Summary */}
                            <div className={styles['summary']}>
                                <p>
                                    <span>Subtotal</span>
                                    <span>
                                        {formatCurrencyVN(orderEdit.summary.subtotal)}
                                    </span>
                                </p>
                                <p>
                                    <span>Shipping</span>
                                    <span>
                                        {formatCurrencyVN(orderEdit.summary.shippingFee)}
                                    </span>
                                </p>
                                <p>
                                    <span>Discount</span>
                                    <span>
                                        -{formatCurrencyVN(orderEdit.summary.discount)}
                                    </span>
                                </p>
                                <p className={styles['total']}>
                                    <strong>Total</strong>
                                    <strong>
                                        {formatCurrencyVN(orderEdit.summary.total)}
                                    </strong>
                                </p>
                            </div>
                        </CartBox>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderEdit;
