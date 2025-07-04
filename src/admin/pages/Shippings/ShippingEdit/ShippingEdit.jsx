import { FormProvider, useForm } from 'react-hook-form';

import {
    adminApi,
    backEndApi,
    flatObject,
    isSameValueObject,
    patternValidate,
    toastError,
    toastSuccess,
    toastInfo,
} from '~/utils';
import { STATUSES } from '~/constants';

import { SelectGroup, CartBox } from '~/admin/components';
import Button from '~/components/Button';
import styles from './ShippingEdit.module.scss';

function ShippingEdit({ setShippings, shippingEdit, setShippingEdit, setMode }) {
    const methods = useForm({
        defaultValues: {
            name: shippingEdit.name,
            description: shippingEdit.description,
            price: shippingEdit.price,
            estimateTime: shippingEdit.estimateTime,
            status: shippingEdit.status,
        },
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = methods;

    const handleEdit = async (data) => {
        const isModifier = !isSameValueObject(flatObject(data), shippingEdit);

        if (!isModifier) {
            toastInfo('Nothing modified!');
            setShippingEdit();
            setMode('view');
            return;
        }

        try {
            const result = await adminApi.putById(
                backEndApi.shipping,
                shippingEdit._id,
                flatObject(data),
            );

            toastSuccess(result.message);

            setShippings((prev) =>
                prev.map((shipping) =>
                    shipping._id === shippingEdit._id ? result.data : shipping,
                ),
            );
            setShippingEdit();
            setMode('view');
        } catch (err) {
            console.error('Error add shipping!', err);
            toastError('Update shipping error!');
        }
    };

    const handleCancel = () => {
        setShippingEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['wrapper']}>
                <CartBox>
                    <h2 className={styles['header']}>Update shipping method</h2>

                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(handleEdit)}>
                            {/* Name */}
                            <div>
                                <label className="form-label" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className={
                                        errors.name ? 'form-input-invalid' : 'form-input'
                                    }
                                    type="text"
                                    placeholder="Eg: Standard Shipping"
                                    id="name"
                                    {...register('name', {
                                        required: patternValidate.required,
                                        minLength: patternValidate.minLength3,
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
                                    rows={3}
                                    spellCheck={false}
                                    className="form-input"
                                    type="text"
                                    placeholder="Eg: Delivery within 5-7 business days."
                                    id="description"
                                    {...register('description')}
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="form-label" htmlFor="price">
                                    Price
                                </label>
                                <input
                                    className={
                                        errors.price ? 'form-input-invalid' : 'form-input'
                                    }
                                    type="number"
                                    id="price"
                                    {...register('price', {
                                        required: patternValidate.required,
                                        valueAsNumber: patternValidate.mustNumber,
                                        min: patternValidate.min0,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.price && errors.price.message}
                                </p>
                            </div>

                            {/* EstimateTime */}
                            <div>
                                <label className="form-label" htmlFor="estimateTime">
                                    Estimate time
                                </label>
                                <textarea
                                    rows={3}
                                    spellCheck={false}
                                    className="form-input"
                                    type="text"
                                    placeholder="Eg: 1 business day."
                                    id="estimateTime"
                                    {...register('estimateTime')}
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="form-label" htmlFor="status">
                                    Status
                                </label>

                                <SelectGroup nameRegister="status" options={STATUSES} />
                            </div>

                            <div className="mt-24 text-center">
                                <Button
                                    type="button"
                                    gray
                                    customStyle={styles['cancel-btn']}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    deepBlack
                                    customStyle={styles['submit-btn']}
                                >
                                    Update
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </CartBox>
            </div>
        </div>
    );
}

export default ShippingEdit;
