import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
    api,
    backEndApi,
    flatObject,
    patternValidate,
    toastSuccess,
    toastError,
} from '~/utils';
import { STATUSES } from '~/constants';

import { CartBox, SelectGroup } from '~/admin/components';
import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './BrandAdd.module.scss';

function BrandAdd({ setBrands, setMode }) {
    const methods = useForm({
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            country: '',
            foundedYear: '',
            logo: '',
            status: 'active',
        },
    });

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = methods;

    const [preview, setPreview] = useState();
    const logoFile = watch('logo');

    useEffect(() => {
        if (preview && preview.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
        }

        if (logoFile && logoFile.length > 0) {
            const url = URL.createObjectURL(logoFile[0]);
            setPreview(url);
        }

        console.groupEnd();
    }, [logoFile]);

    const handleAdd = async (data) => {
        try {
            const result = await api.postMultipart(backEndApi.brand, flatObject(data));

            // Add success -> delete temporary img
            if (preview && preview.startsWith('blob:')) {
                URL.revokeObjectURL(preview);
            }

            toastSuccess(result.message);
            setBrands((prev) => [...prev, result.data]);
            setMode('view');
        } catch (err) {
            console.error('Error add brand!', err);
            toastError('Create brand error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add brand</h2>

                <FormProvider {...methods}>
                    <form
                        action=""
                        onSubmit={handleSubmit(handleAdd)}
                        encType="multipart/form-data"
                    >
                        <div className="row">
                            {/* Name */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className={
                                        errors.name ? 'form-input-invalid' : 'form-input'
                                    }
                                    type="text"
                                    placeholder="Eg: Adidas"
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

                            {/* Slug */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="slug">
                                    Slug
                                </label>
                                <input
                                    className={
                                        errors.slug ? 'form-input-invalid' : 'form-input'
                                    }
                                    placeholder="Eg: adidas"
                                    type="text"
                                    id="slug"
                                    {...register('slug', {
                                        required: patternValidate.required,
                                        minLength: patternValidate.minLength3,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.slug && errors.slug.message}
                                </p>
                            </div>
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
                                placeholder="Eg: American sportswear brand"
                                type="text"
                                id="description"
                                {...register('description')}
                            />
                        </div>

                        <div className="row">
                            {/* Country */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="country">
                                    Country
                                </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="USA"
                                    id="country"
                                    name="country"
                                    {...register('country')}
                                />
                            </div>

                            {/* Founded Year */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="foundedYear">
                                    Founded Year
                                </label>
                                <input
                                    className={
                                        errors.foundedYear
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
                                    type="number"
                                    placeholder="Eg: 1979"
                                    id="foundedYear"
                                    {...register('foundedYear', {
                                        required: patternValidate.required,
                                        min: {
                                            value: 1000,
                                            message: 'Year must be after 1000',
                                        },
                                        max: {
                                            value: new Date().getFullYear(),
                                            message: `Year cannot be in the future`,
                                        },
                                        valueAsNumber: patternValidate.mustNumber,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.foundedYear && errors.foundedYear.message}
                                </p>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="form-label" htmlFor="status">
                                Status
                            </label>

                            <SelectGroup nameRegister="status" options={STATUSES} />
                        </div>

                        {/* Logo */}
                        <div>
                            <label className="form-label" htmlFor="logo">
                                Logo:
                            </label>
                            <input
                                className="form-input"
                                type="file"
                                id="logo"
                                name="logo"
                                {...register('logo')}
                            />
                            {/* Preview image */}
                            <Image className={styles['logo']} src={preview} />
                        </div>

                        <div className="text-center mb-12">
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
                                Add brand
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default BrandAdd;
