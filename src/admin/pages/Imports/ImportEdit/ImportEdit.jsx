import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import { toastSuccess, toastError } from '~/utils/toast';
import flatObject from '~/utils/flatObject';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './ImportEdit.module.scss';

function ImportEdit({
    products,
    productImportEdit,
    setProductImportEdit,
    setProductImports,
    setMode,
}) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            productId: productImportEdit.productId,
            price: productImportEdit.price,
            quantity: productImportEdit.quantity,
            importDate: productImportEdit.importDate.slice(0, 10),
        },
    });

    const handleEdit = async (data) => {
        console.log('Editing...');

        try {
            const result = await api.putById(
                backEndApi.productImports,
                productImportEdit._id,
                flatObject(data),
            );

            toastSuccess(result.message);
            setProductImports((prev) =>
                prev.map((item) => (item._id === productImportEdit._id ? result.data : item)),
            );
            setProductImportEdit();
            setMode('view');
        } catch (err) {
            console.error('Add product import failed...', err);
            toastError('Update product import error!');
        }
    };

    const handleCancel = () => {
        setProductImportEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Update Product Import</h2>

                <form action="" onSubmit={handleSubmit(handleEdit)}>
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
                                    (value && value !== 'default') || 'You must select this field',
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
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button deepBlack customStyle={styles['submit-btn']} type="submit">
                            Update Product Import
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default ImportEdit;
