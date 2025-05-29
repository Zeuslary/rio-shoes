import { FormProvider, useForm } from 'react-hook-form';

import { api, backEndApi, patternValidate, toastSuccess, toastError } from '~/utils';
import { STATUSES } from '~/constants';

import { SelectGroup, CartBox } from '~/admin/components';
import Button from '~/components/Button';
import styles from './PaymentAdd.module.scss';

function PaymentAdd({ setPayments, setMode }) {
    const methods = useForm({
        defaultValues: {
            code: '',
            name: '',
            description: '',
            status: 'active',
        },
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = methods;

    const handleAddPayment = async (data) => {
        try {
            const result = await api.post(backEndApi.payment, data);

            toastSuccess(result.message);
            setPayments((prev) => [...prev, result.data]);
            setMode('view');
        } catch (err) {
            console.error('Add payment failed...', err);
            toastError('Create payment error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add payment method</h2>

                <FormProvider {...methods}>
                    <form action="" onSubmit={handleSubmit(handleAddPayment)}>
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

                        <div className={styles['actions']}>
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
                                Add method
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default PaymentAdd;
