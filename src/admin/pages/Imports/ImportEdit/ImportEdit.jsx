import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import {
    adminApi,
    backEndApi,
    flatObject,
    patternValidate,
    toastError,
    toastSuccess,
} from '~/utils';

import { CartBox } from '~/admin/components';
import Button from '~/components/Button';
import styles from './ImportEdit.module.scss';

function ImportEdit({
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
            productId: productImportEdit.productId._id,
            price: productImportEdit.price,
            quantity: productImportEdit.quantity,
            importDate: productImportEdit.importDate.slice(0, 10),
        },
    });

    const handleEdit = async (data) => {
        try {
            const result = await adminApi.putById(
                backEndApi.productImports,
                productImportEdit._id,
                flatObject(data),
            );

            toastSuccess(result.message);
            setProductImports((prev) =>
                prev.map((item) =>
                    item._id === productImportEdit._id ? result.data : item,
                ),
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
                        <p className="form-input">{`${productImportEdit.productId.name} - ${productImportEdit.productId._id}`}</p>
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
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            deepBlack
                            customStyle={styles['submit-btn']}
                            type="submit"
                        >
                            Update Product Import
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default ImportEdit;
