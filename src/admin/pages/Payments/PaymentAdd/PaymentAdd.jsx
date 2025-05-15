import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import api from '~/utils/api';
import { toastSuccess, toastError } from '~/utils/toast';
import backEndApi from '~/utils/backendApi';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './PaymentAdd.module.scss';

function PaymentAdd({ setPayments, setPaymentAction }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            code: '',
            name: '',
            description: '',
            status: '',
        },
    });

    const handleAddPayment = async (data) => {
        console.log(data);
        try {
            const result = await api.post(backEndApi.payment, data);
            if (result) {
                console.log('Create payment success:', result);
                toastSuccess('Create payment successfully!');
                setPayments((prev) => [...prev, result]);
                setPaymentAction('view');
            }
        } catch (err) {
            console.error('Error add payment!', err);
            toastError('Create payment error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add payment method</h2>

                <form action="" onSubmit={handleSubmit(handleAddPayment)}>
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
                            Add method
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default PaymentAdd;
