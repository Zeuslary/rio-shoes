import clsx from 'clsx';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { ProviderContext } from '~/components/Provider';

import {
    api,
    backEndApi,
    flatObject,
    toastError,
    toastSuccess,
    patternValidate,
} from '~/utils';
import { DISCOUNT_TYPES, STATUSES_VOUCHER } from '~/constants';

import { SelectGroup, CartBox } from '~/admin/components';
import Button from '~/components/Button';
import styles from './VoucherAdd.module.scss';

function VoucherAdd({ setVouchers, setMode }) {
    const { adminProfile } = useContext(ProviderContext);
    const methods = useForm({
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
            createdBy: adminProfile._id,
            status: 'active',
        },
    });

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = methods;

    const handleAdd = async (data) => {
        console.log('Data: ', flatObject(data));
        try {
            const result = await api.post(backEndApi.voucher, flatObject(data));

            toastSuccess(result.message);
            setVouchers((prev) => [...prev, result.data]);
            setMode('view');
        } catch (err) {
            console.error('Error add voucher!', err);
            toastError(err?.response?.data?.message || 'Create voucher error!');
        }
    };

    const handleCancel = () => {
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add voucher</h2>

                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(handleAdd)}
                        encType="multipart/form-data"
                    >
                        {/* Code */}
                        <label className="form-label" htmlFor="code">
                            Code
                        </label>
                        <input
                            className={errors.code ? 'form-input-invalid' : 'form-input'}
                            type="text"
                            placeholder="Eg: SUMMER2025"
                            id="code"
                            {...register('code', {
                                required: patternValidate.required,
                            })}
                        />
                        <p className="form-msg-err">
                            {errors.code && errors.code.message}
                        </p>

                        {/* Discount */}
                        <div className="row">
                            {/* Discount value */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="discountValue">
                                    Discount value
                                </label>
                                <input
                                    className={
                                        errors.discountValue
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
                                    type="number"
                                    placeholder="Eg: 20"
                                    id="discountValue"
                                    {...register('discountValue', {
                                        required: patternValidate.required,
                                        valueAsNumber: patternValidate.mustNumber,
                                        min: patternValidate.min1,
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

                                <SelectGroup
                                    nameRegister="discountType"
                                    options={DISCOUNT_TYPES}
                                />
                            </div>

                            {/* Min order */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="minOrder">
                                    Min order
                                </label>
                                <input
                                    className={
                                        errors.minOrder
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
                                    type="number"
                                    placeholder="Eg: 20000"
                                    id="minOrder"
                                    {...register('minOrder', {
                                        required: patternValidate.required,
                                        valueAsNumber: patternValidate.mustNumber,
                                        min: patternValidate.min0,
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
                                    className={
                                        errors.maxDiscountValue
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
                                    type="number"
                                    placeholder="Eg: 200000"
                                    id="maxDiscountValue"
                                    {...register('maxDiscountValue', {
                                        required: patternValidate.required,
                                        valueAsNumber: patternValidate.mustNumber,
                                        min: patternValidate.min0,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.maxDiscountValue &&
                                        errors.maxDiscountValue.message}
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
                                    className={
                                        errors.startDate
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
                                    type="date"
                                    id="startDate"
                                    {...register('startDate', {
                                        required: patternValidate.required,
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
                                    className={
                                        errors.endDate
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
                                    type="date"
                                    id="endDate"
                                    {...register('endDate', {
                                        required: patternValidate.required,
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
                                    className={
                                        errors.quantity
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
                                    type="number"
                                    id="quantity"
                                    {...register('quantity', {
                                        min: patternValidate.min1,
                                        valueAsNumber: patternValidate.mustNumber,
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
                                    className={
                                        errors.usedCount
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
                                    type="number"
                                    id="usedCount"
                                    {...register('usedCount', {
                                        valueAsNumber: patternValidate.mustNumber,
                                        min: patternValidate.min0,
                                        validate: (value) =>
                                            value <= watch('quantity') ||
                                            'Used count must be less than or equal to quantity',
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.usedCount && errors.usedCount.message}
                                </p>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="form-label" htmlFor="status">
                                Status
                            </label>
                            <SelectGroup
                                nameRegister="status"
                                options={STATUSES_VOUCHER}
                            />
                        </div>

                        <div className={clsx('mt-24', 'text-center', 'mb-12')}>
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
                                Add voucher
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default VoucherAdd;
