import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';

import { ProviderContext } from '~/components/Provider';

import {
    api,
    backEndApi,
    patternValidate,
    flatObject,
    toastError,
    toastSuccess,
} from '~/utils';

import { CartBox } from '~/admin/components';

import Button from '~/components/Button';
import styles from './ImportAdd.module.scss';

function ImportAdd({ setProductImports, setMode }) {
    const [products, setProducts] = useState([]);
    const { profile } = useContext(ProviderContext);

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
            createdBy: profile._id,
        },
    });

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const res = await api.getAll(backEndApi.productMinimal);

                setProducts(res);
            } catch (err) {
                toastError(err?.response?.data?.message || 'Fetching products error!');
            }
        };

        fetchingData();
    }, []);

    const handleAdd = async (data) => {
        try {
            const result = await api.post(backEndApi.productImports, flatObject(data));

            toastSuccess(result.message);

            // Add name inside productId
            const productId = products.find((product) => product._id === data.productId);

            setProductImports((prev) => [
                ...prev,
                {
                    ...result.data,
                    productId,
                },
            ]);
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
                            <option value="default" disabled>
                                Select product name
                            </option>
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
                                    required: patternValidate.required,
                                    min: patternValidate.min1,
                                    valueAsNumber: patternValidate.mustNumber,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.price && errors.price.message}
                            </p>
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
                                    required: patternValidate.required,
                                    min: patternValidate.min1,
                                    valueAsNumber: patternValidate.mustNumber,
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
                                    required: patternValidate.required,
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
                        <Button
                            deepBlack
                            customStyle={styles['submit-btn']}
                            type="submit"
                        >
                            Add Product Import
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default ImportAdd;
