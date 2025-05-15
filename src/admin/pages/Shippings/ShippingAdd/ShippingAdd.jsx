import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';
import { toastSuccess, toastError } from '~/utils/toast';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './ShippingAdd.module.scss';

function ShippingAdd({ setShippings, setMode }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            status: 'active',
        },
    });

    const handleAddPayment = async (data) => {
        console.log(data);
        try {
            const result = await api.post(backEndApi.shipping, data);

            if (result) {
                console.log('Create shipping success:', result);
                toastSuccess('Create shipping successfully!');
                setShippings((prev) => [...prev, result]);
                setMode('view');
            }
        } catch (err) {
            console.error('Error add shipping!', err);
            toastError('Create shipping error!');
        }
    };
    return (
        <div className={styles['wrapper']}>
            <div className={styles['wrapper']}>
                <CartBox>
                    <h2 className={styles['header']}>Add shipping method</h2>

                    <form action="" onSubmit={handleSubmit(handleAddPayment)}>
                        {/* Name */}
                        <label className="form-label" htmlFor="name">
                            Name
                        </label>
                        <input
                            className={clsx('form-input', errors.name && 'form-input-invalid')}
                            type="text"
                            placeholder="Eg: Standard Shipping"
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
                            rows={3}
                            spellCheck={false}
                            className="form-input"
                            type="text"
                            placeholder="Eg: Delivery within 5-7 business days."
                            id="description"
                            {...register('description')}
                        />

                        {/* Price */}
                        <label className="form-label" htmlFor="price">
                            Price
                        </label>
                        <input
                            className={clsx('form-input', errors.price && 'form-input-invalid')}
                            type="number"
                            id="price"
                            {...register('price', {
                                required: 'This field is required',
                                valueAsNumber: {
                                    value: true,
                                    message: 'This field must be number',
                                },
                            })}
                        />
                        <p className="form-msg-err">{errors.price && errors.price.message}</p>

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

                        <div className={clsx('mt-24', 'text-center')}>
                            <Button
                                type="button"
                                gray
                                customStyle={styles['cancel-btn']}
                                onClick={() => setMode('view')}
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
        </div>
    );
}

export default ShippingAdd;
