import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';
import provincesApi from '~/utils/provinces';

import { toastSuccess, toastError } from '~/utils/toast';
import flatObject from '~/utils/flatObject';
import Image from '~/components/Image';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import convertAddress from '~/utils/convertAddress';
import styles from './ProductAdd.module.scss';

function ProductAdd({ brands, setProducts, setMode }) {
    console.log('View ', brands);
    const {
        register,
        formState: { errors },
        watch,
        control,
        handleSubmit,
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
            style: [],
            category: '',
            type: 'default',
            brandId: '',
            material: '',
            design: '',
            releaseYear: '',
            origin: '',
            colors: '',
            sizes: '',
            stock: '',
            sold: '',
            originalPrice: '',
            newPrice: '',
            image: '',
            galleryImages: '',
            tag: '',
            fakeHot: '',
            feature: '',
            gender: '',
            status: 'active',
        },
    });

    // Some default select
    const categories = ['shoes', 'sneakers', 'sandals', 'boots', 'slippers', 'accessories'];
    const types = [
        'sport',
        'lifestyle',
        'casual',
        'formal',
        'training',
        'hiking',
        'running',
        'walking',
    ];
    const designs = [
        'classic',
        'sporty',
        'elegant',
        'casual',
        'streetwear',
        'vintage',
        'futuristic',
        'artistic',
    ];
    const styles = ['low-top', 'mid-top', 'high-top', 'modern'];
    const tags = ['hot', 'new', 'sale', 'best-seller', 'limited-edition', 'exclusive'];
    const genders = ['male', 'female', 'unisex', 'kids'];
    const sizes = [
        '35',
        '35.5',
        '36',
        '36.5',
        '37',
        '37.5',
        '38',
        '38.5',
        '39',
        '39.5',
        '40',
        '40.5',
        '41',
        '41.5',
        '42',
        '42.5',
        '43',
        '43.5',
        '44',
        '44.5',
        '45',
        '45.5',
    ];

    // Handle show preview image
    const avatarFile = watch('avatar')?.[0];
    const preview = avatarFile ? URL.createObjectURL(avatarFile) : '';

    useEffect(() => {
        return () => {
            // Clear temporary img to avoid memory leak
            URL.revokeObjectURL(preview);
        };
    }, [preview]);

    // Handle add customer into db
    const handleAdd = async (data) => {
        console.log('Adding...', data);
        console.log(flatObject(data));

        // try {
        //     const result = await api.postMultipart(backEndApi.customer, flatObject(data));
        //     console.log('Create customer success:', result);
        //     toastSuccess(result.message);
        //     setProducts((prev) => [...prev, result.data]);
        //     setMode('view');
        // } catch (err) {
        //     console.error('Error add customer!', err);
        //     toastError(err.response?.data?.message || 'Add customer failed!');
        // }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add customer</h2>

                <form action="" onSubmit={handleSubmit(handleAdd)} encType="multipart/form-data">
                    <div className="row">
                        <div className="col-6">
                            {/* Name */}
                            <div>
                                <label className="form-label" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="form-input"
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                />
                                <p className="form-msg-err">{errors.name && errors.name.message}</p>
                            </div>

                            {/* Description */}
                            <div className="row">
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

                            {/* Style */}
                            <div>
                                <label className="form-label" htmlFor="style">
                                    Style
                                </label>

                                {styles.map((style) => (
                                    <div key={style}>
                                        <input
                                            type="checkbox"
                                            id={`style-${style}`}
                                            value={style}
                                            {...register('style', {})}
                                        />
                                        <label
                                            className="form-label-checkbox"
                                            htmlFor={`style-${style}`}
                                        >
                                            {style.slice(0, 1).toUpperCase() + style.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="row">
                                {/* Style */}
                                <div className="col-4">
                                    <label className="form-label" htmlFor="style">
                                        Style
                                    </label>
                                    <select
                                        name="style"
                                        id="style"
                                        className="form-select"
                                        {...register('style')}
                                    >
                                        <option value="default" disabled>
                                            Select style
                                        </option>
                                        {styles.map((style) => (
                                            <option value={style}>
                                                {style.slice(0, 1).toUpperCase() + style.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    {/* <div>
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
                    </div> */}

                    {/* Avatar */}
                    {/* <label className="form-label" htmlFor="avatar">
                        Avatar
                    </label>
                    <input
                        className="form-input"
                        type="file"
                        id="avatar"
                        name="avatar"
                        {...register('avatar')}
                    /> */}
                    {/* Preview image */}
                    {/* <div className="text-center mt-12">
                        <Image className={styles['avatar']} src={preview} />
                    </div> */}

                    {/* Actions */}
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
                            Add customer
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default ProductAdd;
