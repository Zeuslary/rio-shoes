import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import api from '~/utils/api';
import { toastSuccess, toastError } from '~/utils/toast';
import backEndApi from '~/utils/backendApi';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './PaymentEdit.module.scss';

function PaymentEdit({ paymentEdit, setPaymentEdit, setPayments, setPaymentAction }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            code: paymentEdit.code,
            name: paymentEdit.name,
            description: paymentEdit.description,
            status: paymentEdit.status,
        },
    });

    const handleUpdatePayment = async (data) => {
        console.log('Updating....', data);

        try {
            const result = await api.putById(backEndApi.payment, paymentEdit._id, data);
            if (result) {
                console.log('Update payment success:', result);
                toastSuccess('Update payment successfully!');
                setPayments((prev) => {
                    const result = prev.map((payment) => {
                        return payment._id === paymentEdit._id
                            ? { _id: paymentEdit._id, ...data }
                            : payment;
                    });
                    return result;
                });
                setPaymentAction('view');
                setPaymentEdit();
            }
        } catch (err) {
            console.error('Error add payment!', err);
            toastError('Update payment error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Update payment method</h2>

                <form action="" onSubmit={handleSubmit(handleUpdatePayment)}>
                    {/* Code */}
                    <label className="form-label" htmlFor="code">
                        Payment Code
                    </label>
                    <input
                        className={clsx('form-input', errors.code && 'form-input-invalid')}
                        type="text"
                        placeholder="Eg: cod"
                        id="code"
                        {...register('code', {
                            required: 'This field is required',
                        })}
                    />
                    <p className="form-msg-err">{errors.code && errors.code.message}</p>

                    {/* Name */}
                    <label className="form-label" htmlFor="name">
                        Payment Name
                    </label>
                    <input
                        className={clsx('form-input', errors.name && 'form-input-invalid')}
                        type="text"
                        placeholder="Eg: Cash on Delivery"
                        id="name"
                        {...register('name', {
                            required: 'This field is required',
                        })}
                    />
                    <p className="form-msg-err">{errors.name && errors.name.message}</p>

                    {/* Description */}
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
                        <option value="inactive">Inactive</option>
                        <option value="banned">Banned</option>
                    </select>

                    {/* Actions like cancel, add */}
                    <div className={styles['actions']}>
                        <Button
                            type="button"
                            gray
                            customStyle={styles['cancel-btn']}
                            onClick={() => setPaymentAction('view')}
                        >
                            Cancel
                        </Button>
                        <Button deepBlack customStyle={styles['submit-btn']} type="submit">
                            Update
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default PaymentEdit;
