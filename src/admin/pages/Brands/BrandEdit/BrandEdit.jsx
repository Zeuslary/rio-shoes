import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import { IMG_BRAND_PATH } from '~/constants';
import { toastSuccess, toastError } from '~/utils/toast';
import flatObject from '~/utils/flatObject';
import Image from '~/components/Image';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './BrandEdit.module.scss';

function BrandEdit({ brandEdit, setBrandEdit, setBrands, setMode }) {
    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm({
        defaultValues: {
            name: brandEdit.name,
            slug: brandEdit.slug,
            description: brandEdit.description,
            country: brandEdit.country,
            foundedYear: brandEdit.foundedYear,
            logo: brandEdit.logo,
            status: brandEdit.status,
        },
    });

    let logoFile = watch('logo');
    let preview;

    if (typeof logoFile === 'string') {
        preview = IMG_BRAND_PATH + logoFile;
    } else if (logoFile.length > 0) {
        preview = logoFile ? URL.createObjectURL(logoFile[0]) : '';
    }

    useEffect(() => {
        // console.log('err: ', errors);
        console.log('Preview', preview);

        return () => {
            // Clear temporary img to avoid memory leak
            console.log('Cleaning...');
            if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleEdit = async (data) => {
        try {
            const result = await api.putMultipart(
                backEndApi.brand,
                brandEdit._id,
                flatObject(data),
            );

            console.log('Create brand success:', result);
            toastSuccess(result.message);

            // Save value just update into list account
            setBrands((prev) =>
                prev.map((brand) => (brand._id === result.data._id ? result.data : brand)),
            );

            setBrandEdit();
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

                <form action="" onSubmit={handleSubmit(handleEdit)} encType="multipart/form-data">
                    {/* Name */}
                    <label className="form-label" htmlFor="name">
                        Name
                    </label>
                    <input
                        className={clsx('form-input', errors.name && 'form-input-invalid')}
                        type="text"
                        placeholder="Eg: Adidas"
                        id="name"
                        {...register('name', {
                            required: 'This field is required',
                        })}
                    />
                    <p className="form-msg-err">{errors.name && errors.name.message}</p>

                    {/* Slug */}
                    <label className="form-label" htmlFor="slug">
                        Slug
                    </label>
                    <input
                        className={clsx('form-input', errors.slug && 'form-input-invalid')}
                        placeholder="Eg: adidas"
                        type="text"
                        id="slug"
                        {...register('slug', {
                            required: 'This field is required',
                        })}
                    />
                    <p className="form-msg-err">{errors.slug && errors.slug.message}</p>

                    {/* Description */}
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

                    {/* Country */}
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

                    {/* Founded Year */}
                    <label className="form-label" htmlFor="foundedYear">
                        Founded Year
                    </label>
                    <input
                        className={clsx('form-input', errors.foundedYear && 'form-input-invalid')}
                        type="text"
                        placeholder="Eg: 1979"
                        id="foundedYear"
                        {...register('foundedYear', {
                            min: {
                                value: 1000,
                                message: 'Year must be after 1000',
                            },
                            max: {
                                value: new Date().getFullYear(),
                                message: `Year cannot be in the future`,
                            },
                            valueAsNumber: true,
                        })}
                    />
                    <p className="form-msg-err">
                        {errors.foundedYear && errors.foundedYear.message}
                    </p>

                    {/* Logo */}
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
                    <div className="text-center mt-12">
                        <Image className={styles['logo']} src={preview} />
                    </div>

                    {/* Status */}
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
                            Add brand
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default BrandEdit;
