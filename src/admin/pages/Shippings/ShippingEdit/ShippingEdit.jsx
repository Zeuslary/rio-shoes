import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';
import { toastSuccess, toastError, toastWarning } from '~/utils/toast';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './ShippingEdit.module.scss';

function ShippingEdit({ setShippings, shippingEdit, setShippingEdit, setMode }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            name: shippingEdit.name,
            description: shippingEdit.description,
            price: shippingEdit.price,
            status: shippingEdit.status,
        },
    });

    const handleEdit = async (data) => {
        console.log('Editing.....', data);
        try {
            const result = await api.putById(backEndApi.shipping, shippingEdit._id, data);

            if (result) {
                console.log('Update shipping success:', result);
                if (result.message.includes('not')) toastWarning(result.message);
                else toastSuccess(result.message);
                setShippings((prev) =>
                    prev.map((shipping) =>
                        shipping._id === shippingEdit._id ? result.data : shipping,
                    ),
                );
                setShippingEdit();
                setMode('view');
            }
        } catch (err) {
            console.error('Error add shipping!', err);
            toastError('Update shipping error!');
        }
    };
    return (
        <div className={styles['wrapper']}>
            <div className={styles['wrapper']}>
                <CartBox>
                    <h2 className={styles['header']}>Update shipping method</h2>

                    <form onSubmit={handleSubmit(handleEdit)}>
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
                            <Button type="submit" deepBlack customStyle={styles['submit-btn']}>
                                Update
                            </Button>
                        </div>
                    </form>
                </CartBox>
            </div>
        </div>
    );
}

export default ShippingEdit;
