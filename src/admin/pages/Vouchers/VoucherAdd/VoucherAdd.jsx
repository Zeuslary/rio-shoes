import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import { toastSuccess, toastError } from '~/utils/toast';
import flatObject from '~/utils/flatObject';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './VoucherAdd.module.scss';

function VoucherAdd({ setVouchers, setMode }) {
    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm({
        defaultValues: {
            code: '',
            description: '',
            discountType: 'fixed',
            discountValue: '',
            minOrder: '',
            maxDiscountValue: '',
            startDate: new Date().toISOString().slice(0, 10),
            endDate: new Date().toISOString().slice(0, 10),
            quantity: 10,
            usedCount: 0,
            status: 'active',
        },
    });

    useEffect(() => {
        console.log('err: ', errors);
        // console.log('preview', preview);
    });

    const handleAdd = async (data) => {
        console.log('Adding...');
        console.log(data);

        try {
            const result = await api.post(backEndApi.voucher, flatObject(data));
            console.log('Create voucher success:', result);
            toastSuccess(result.message);
            setVouchers((prev) => [...prev, result.data]);
            setMode('view');
        } catch (err) {
            console.error('Error add voucher!', err);
            toastError('Create voucher error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add voucher</h2>

                <form action="" onSubmit={handleSubmit(handleAdd)} encType="multipart/form-data">
                    {/* Code */}
                    <label className="form-label" htmlFor="code">
                        Code
                    </label>
                    <input
                        className={clsx('form-input', errors.code && 'form-input-invalid')}
                        type="text"
                        placeholder="Eg: SUMMER2025"
                        id="code"
                        {...register('code', {
                            required: 'This field is required',
                        })}
                    />
                    <p className="form-msg-err">{errors.code && errors.code.message}</p>

                    {/* Discount */}
                    <div className="row">
                        {/* Discount value */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="discountValue">
                                Discount value
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                placeholder="Eg: 20"
                                id="discountValue"
                                {...register('discountValue', {
                                    required: 'This field is required',
                                    valueAsNumber: true,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.discountValue && errors.discountValue.message}
                            </p>
                        </div>

                        {/* Discount type */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="discountType">
                                Discount type
                            </label>
                            <select
                                className="form-input"
                                name="discountType"
                                id="discountType"
                                {...register('discountType')}
                            >
                                <option value="fixed">Fixed</option>
                                <option value="percent">Percent</option>
                            </select>
                        </div>

                        {/* Min order */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="minOrder">
                                Min order
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                placeholder="Eg: 20000"
                                id="minOrder"
                                {...register('minOrder', {
                                    required: 'This field is required',
                                    valueAsNumber: true,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.minOrder && errors.minOrder.message}
                            </p>
                        </div>

                        {/* Max discount value */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="maxDiscountValue">
                                Max discount value
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                placeholder="Eg: 200000"
                                id="maxDiscountValue"
                                {...register('maxDiscountValue', {
                                    required: 'This field is required',
                                    valueAsNumber: true,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.maxDiscountValue && errors.maxDiscountValue.message}
                            </p>
                        </div>
                    </div>

                    {/* Voucher Date */}
                    <div className="row">
                        {/* Start date */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="startDate">
                                Start date
                            </label>
                            <input
                                className="form-input"
                                type="date"
                                id="startDate"
                                {...register('startDate', {
                                    required: 'This field is required',
                                    valueAsDate: true,
                                    validate: (value) =>
                                        value <= watch('endDate') ||
                                        'Start date must be before or equal to end date',
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.startDate && errors.startDate.message}
                            </p>
                        </div>

                        {/* End date */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="endDate">
                                End date
                            </label>
                            <input
                                className="form-input"
                                type="date"
                                id="endDate"
                                {...register('endDate', {
                                    required: 'This field is required',
                                    valueAsDate: true,
                                    validate: (value) =>
                                        value >= watch('startDate') ||
                                        'End date must be after or equal to start date',
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.endDate && errors.endDate.message}
                            </p>
                        </div>
                    </div>

                    {/* Number */}
                    <div className="row">
                        {/* Quantity */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="quantity">
                                Quantity
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                id="quantity"
                                {...register('quantity', {
                                    min: 1,
                                    valueAsNumber: true,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.quantity && errors.quantity.message}
                            </p>
                        </div>

                        {/* Used count */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="usedCount">
                                Used count
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                id="usedCount"
                                {...register('usedCount', {
                                    valueAsNumber: true,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.usedCount && errors.usedCount.message}
                            </p>
                        </div>
                    </div>

                    {/* Status */}
                    <label className="form-label" htmlFor="status">
                        Status
                    </label>
                    <select
                        name="status"
                        id="status"
                        className="form-select"
                        {...register('status')}
                    >
                        <option value="active">Active</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="expired">Expired</option>
                    </select>

                    <div className={clsx('mt-24', 'text-center', 'mb-12')}>
                        <Button
                            type="button"
                            gray
                            customStyle={styles['cancel-btn']}
                            onClick={() => setMode('view')}
                        >
                            Cancel
                        </Button>
                        <Button deepBlack customStyle={styles['submit-btn']} type="submit">
                            Add voucher
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default VoucherAdd;
