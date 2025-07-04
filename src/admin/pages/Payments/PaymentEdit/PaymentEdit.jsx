import { FormProvider, useForm } from 'react-hook-form';

import {
    adminApi,
    backEndApi,
    patternValidate,
    toastSuccess,
    toastError,
    isSameValueObject,
    toastInfo,
} from '~/utils';
import { STATUSES } from '~/constants';

import { SelectGroup, CartBox } from '~/admin/components';
import Button from '~/components/Button';
import styles from './PaymentEdit.module.scss';

function PaymentEdit({ paymentEdit, setPaymentEdit, setPayments, setMode }) {
    const methods = useForm({
        defaultValues: {
            code: paymentEdit.code,
            name: paymentEdit.name,
            description: paymentEdit.description,
            status: paymentEdit.status,
        },
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = methods;

    const handleUpdate = async (data) => {
        const isModified = !isSameValueObject(data, paymentEdit);

        if (!isModified) {
            toastInfo('Nothing modified!');
            setPaymentEdit();
            setMode('view');
            return;
        }

        try {
            const result = await adminApi.putById(
                backEndApi.payment,
                paymentEdit._id,
                data,
            );

            toastSuccess(result.message);

            setPayments((prev) =>
                prev.map((payment) =>
                    payment._id === paymentEdit._id ? result.data : payment,
                ),
            );

            setPaymentEdit();
            setMode('view');
        } catch (err) {
            console.error('Edit payment failed...', err);
            toastError('Update payment error!');
        }
    };

    const handleCancel = () => {
        setPaymentEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Update payment method</h2>

                <FormProvider {...methods}>
                    <form action="" onSubmit={handleSubmit(handleUpdate)}>
                        {/* Code */}
                        <div>
                            <label className="form-label" htmlFor="code">
                                Payment Code
                            </label>
                            <input
                                className={
                                    errors.code ? 'form-input-invalid' : 'form-input'
                                }
                                type="text"
                                placeholder="Eg: cod"
                                id="code"
                                {...register('code', {
                                    required: patternValidate.required,
                                    minLength: patternValidate.minLength3,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.code && errors.code.message}
                            </p>
                        </div>

                        {/* Payment Name */}
                        <div>
                            <label className="form-label" htmlFor="name">
                                Payment Name
                            </label>
                            <input
                                className={
                                    errors.name ? 'form-input-invalid' : 'form-input'
                                }
                                type="text"
                                placeholder="Eg: Cash on Delivery"
                                id="name"
                                {...register('name', {
                                    required: patternValidate.required,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.name && errors.name.message}
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="form-label" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                rows={5}
                                spellCheck={false}
                                className="form-input"
                                type="text"
                                placeholder="Eg: Customer pays when the order is delivered."
                                id="description"
                                {...register('description')}
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="form-label" htmlFor="status">
                                Status
                            </label>

                            <SelectGroup nameRegister="status" options={STATUSES} />
                        </div>

                        {/* Actions like cancel, add */}
                        <div className={styles['actions']}>
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
                                Update
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default PaymentEdit;
