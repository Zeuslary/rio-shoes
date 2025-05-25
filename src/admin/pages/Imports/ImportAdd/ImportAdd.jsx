import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import { toastSuccess, toastError } from '~/utils/toast';
import flatObject from '~/utils/flatObject';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './ImportAdd.module.scss';

function ImportAdd({ products, setProductImports, setMode }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            productId: 'default',
            price: '',
            quantity: '',
            importDate: new Date().toISOString().slice(0, 10),
        },
    });

    const handleAdd = async (data) => {
        console.log('Adding...', data);
        try {
            const result = await api.post(backEndApi.productImports, flatObject(data));

            console.log('Create product import successfully!', result);
            toastSuccess(result.message);
            setProductImports((prev) => [...prev, result.data]);
            setMode('view');
        } catch (err) {
            console.error('Add product import failed...', err);
            toastError('Create product import error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add Product Import</h2>

                <form action="" onSubmit={handleSubmit(handleAdd)}>
                    {/* Product Name -> Product ID */}
                    <div>
                        <label className="form-label" htmlFor="productId">
                            Product Name
                        </label>
                        <select
                            className="form-input"
                            name="productId"
                            id="productId"
                            {...register('productId', {
                                validate: (value) =>
                                    value !== 'default' || 'You must select this field',
                            })}
                        >
                            <option value="default">Select product name</option>
                            {products.map((product) => (
                                <option
                                    key={product._id}
                                    value={product._id}
                                >{`${product.name} - ${product._id}`}</option>
                            ))}
                        </select>
                        <p className="form-msg-err">
                            {errors.productId && errors.productId.message}
                        </p>
                    </div>

                    <div className="row">
                        {/* Price */}
                        <div className="col-4">
                            <label className="form-label" htmlFor="price">
                                Price
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                placeholder="Eg: 20000"
                                id="price"
                                {...register('price', {
                                    required: 'This field is required',
                                    min: 0,
                                    valueAsNumber: true,
                                })}
                            />
                            <p className="form-msg-err">{errors.price && errors.price.message}</p>
                        </div>

                        {/* Quantity */}
                        <div className="col-4">
                            <label className="form-label" htmlFor="quantity">
                                Quantity
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                placeholder="Eg: 20000"
                                id="quantity"
                                {...register('quantity', {
                                    required: 'This field is required',
                                    min: 1,
                                    valueAsNumber: true,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.quantity && errors.quantity.message}
                            </p>
                        </div>

                        {/* Import Date */}
                        <div className="col-4">
                            <label className="form-label" htmlFor="importDate">
                                Import Date
                            </label>
                            <input
                                className="form-input"
                                type="date"
                                id="importDate"
                                {...register('importDate', {
                                    required: 'This field is required',
                                    valueAsDate: true,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.importDate && errors.importDate.message}
                            </p>
                        </div>
                    </div>

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
                            Add Product Import
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default ImportAdd;
