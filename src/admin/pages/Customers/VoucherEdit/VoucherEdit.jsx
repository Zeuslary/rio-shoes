import clsx from 'clsx';
import { FormProvider, useForm } from 'react-hook-form';

import {
    userApi,
    backEndApi,
    flatObject,
    patternValidate,
    toastError,
    toastSuccess,
} from '~/utils';

import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './VoucherEdit.module.scss';

function VoucherEdit({ voucherEdit, setVoucherEdit, setVouchers, setMode }) {
    const methods = useForm({
        defaultValues: {
            code: voucherEdit.code,
            description: voucherEdit.description,
            discountType: voucherEdit.discountType,
            discountValue: voucherEdit.discountValue,
            minOrder: voucherEdit.minOrder,
            maxDiscountValue: voucherEdit.maxDiscountValue,
            startDate: voucherEdit.startDate.slice(0, 10),
            endDate: voucherEdit.endDate.slice(0, 10),
            quantity: voucherEdit.quantity,
            usedCount: voucherEdit.usedCount,
            status: voucherEdit.status,
        },
    });

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = methods;

    const handleEdit = async (data) => {
        try {
            const result = await api.putById(
                backEndApi.voucher,
                voucherEdit._id,
                flatObject(data),
            );

            toastSuccess(result.message);

            // Save value just update into list account
            setVouchers((prev) =>
                prev.map((voucher) =>
                    voucher._id === result.data._id ? result.data : voucher,
                ),
            );

            setVoucherEdit();
            setMode('view');
        } catch (err) {
            console.error('Error add voucher!', err);
            toastError('Create voucher error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Update voucher</h2>

                <FormProvider {...methods}>
                    <form
                        action=""
                        onSubmit={handleSubmit(handleEdit)}
                        encType="multipart/form-data"
                    >
                        {/* Code */}
                        <div>
                            <label className="form-label" htmlFor="code">
                                Code
                            </label>
                            <input
                                className={
                                    errors.code ? 'form-input-invalid' : 'form-input'
                                }
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
                        </div>

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
                                        required: patternValidate.required,
                                        valueAsNumber: patternValidate.mustNumber,
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
                                        required: patternValidate.required,
                                        valueAsNumber: patternValidate.mustNumber,
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
                                        required: patternValidate.required,
                                        valueAsNumber: patternValidate.mustNumber,
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
                                    className="form-input"
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
                                    className="form-input"
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
                                    className="form-input"
                                    type="number"
                                    id="quantity"
                                    {...register('quantity', {
                                        min: 1,
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
                                    className="form-input"
                                    type="number"
                                    id="usedCount"
                                    {...register('usedCount', {
                                        valueAsNumber: patternValidate.mustNumber,
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
                            <Button
                                deepBlack
                                customStyle={styles['submit-btn']}
                                type="submit"
                            >
                                Update voucher
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default VoucherEdit;
