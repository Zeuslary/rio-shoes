import { FormProvider, useForm } from 'react-hook-form';

import { adminApi, backEndApi, patternValidate, toastError, toastSuccess } from '~/utils';
import { STATUSES } from '~/constants';

import { SelectGroup, CartBox } from '~/admin/components';
import Button from '~/components/Button';
import styles from './ShippingAdd.module.scss';

function ShippingAdd({ setShippings, setMode }) {
    const methods = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            estimateTime: '',
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
            const result = await adminApi.post(backEndApi.shipping, data);

            toastSuccess(result.message);
            setShippings((prev) => [...prev, result.data]);
            setMode('view');
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

                    <FormProvider {...methods}>
                        <form action="" onSubmit={handleSubmit(handleAddPayment)}>
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
                                    placeholder="Eg: 70000"
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
        </div>
    );
}

export default ShippingAdd;
