import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';
import { IMG_PRODUCT_PATH } from '~/constants';

import { CheckboxGroup, CartBox } from '~/admin/components';

import {
    categories,
    types,
    designs,
    stylesProduct,
    materials,
    genders,
    statuses,
    tags,
    fakeHots,
    sizes,
} from '~/constants/productOption';
import { toastSuccess, toastError } from '~/utils/toast';
import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './ProductEdit.module.scss';

function ProductEdit({ setProducts, brands, productEdit, setProductEdit, setMode }) {
    console.log('productEdit ', productEdit);

    const methods = useForm({
        defaultValues: {
            name: productEdit.name,
            description: productEdit.description,
            style: productEdit.style,
            category: productEdit.category,
            type: productEdit.type,
            brandId: productEdit.brandId,
            material: productEdit.material,
            design: productEdit.design,
            releaseYear: productEdit.releaseYear,
            origin: productEdit.origin,
            colors: productEdit.colors,
            sizes: productEdit.sizes,
            stock: productEdit.stock,
            sold: productEdit.sold,
            originalPrice: productEdit.originalPrice,
            newPrice: productEdit.newPrice,
            image: productEdit.image,
            galleryImages: productEdit.galleryImages,
            tag: productEdit.tag,
            fakeHot: productEdit.fakeHot,
            feature: productEdit.feature,
            gender: productEdit.gender,
            status: productEdit.status,
        },
    });

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = methods;

    // State preview image
    const [preview, setPreview] = useState('');
    const [galleryImagesPreview, setGalleryImagesPreview] = useState([]);

    // Init preview image
    let imageFile = watch('image')?.[0];

    if (typeof watch('image') === 'string') {
        imageFile = watch('image');
    } else if (watch('image') instanceof File) {
        imageFile = watch('image')?.[0];
    }

    const galleryImages = watch('galleryImages');

    // console.log('Preview: ', preview);
    // console.log('Gallery images preview: ', galleryImagesPreview);
    // console.log('Image: ', imageFile);
    // console.log('GalleryImages: ', galleryImages);

    useEffect(() => {
        let url;

        console.error('Ima', imageFile, imageFile instanceof File);

        if (imageFile && imageFile instanceof File) {
            url = URL.createObjectURL(imageFile);
            setPreview(url);
        } else {
            setPreview(IMG_PRODUCT_PATH + imageFile);
        }

        return () => {
            // Clear temporary img to avoid memory leak
            if (url) URL.revokeObjectURL(url);
        };
    }, [imageFile]);

    useEffect(() => {
        let urls = [];

        if (galleryImages && galleryImages.length > 0 && galleryImages instanceof FileList) {
            for (let i = 0; i < galleryImages.length; i++) {
                urls.push(URL.createObjectURL(galleryImages[i]));
            }

            setGalleryImagesPreview(urls);
        } else {
            const localUrls = [];

            for (let i = 0; i < galleryImages.length; i++) {
                localUrls.push(IMG_PRODUCT_PATH + galleryImages[i]);
            }

            setGalleryImagesPreview(localUrls);
        }

        return () => {
            // Clear temporary img to avoid memory leak
            if (urls && urls.length > 0) {
                urls.forEach((img) => URL.revokeObjectURL(img));
            }
        };
    }, [galleryImages]);

    // Handle add customer into db
    const handleEdit = async (data) => {
        console.log('Adding...', data);

        // Convert colors into array
        if (data.colors && !Array.isArray(data.colors))
            data.colors = data.colors.split(',').map((color) => color.trim());

        console.log('Data: ', data);

        // Delete image if not change
        if (typeof data.image === 'string') delete data.image;
        if (data.galleryImages && typeof data.galleryImages[0] === 'string')
            delete data.galleryImages;

        // Delete field have value null
        if (!data.releaseYear) delete data.releaseYear;

        console.log('Data after delete: ', data);

        try {
            const result = await api.putMultipart(backEndApi.product, productEdit._id, data);
            console.log('Update product success:', result);
            toastSuccess(result.message);
            setProducts((prev) =>
                prev.map((prod) => (prod._id === result.data._id ? result.data : prod)),
            );
            setProductEdit();
            setMode('view');
        } catch (err) {
            console.error('Update product failed...', err);
            toastError(err.response?.data?.message || 'Update product error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Update product</h2>

                <FormProvider {...methods}>
                    <form
                        action=""
                        onSubmit={handleSubmit(handleEdit)}
                        encType="multipart/form-data"
                    >
                        <div className={styles['row']}>
                            {/* Basic Info */}
                            <div className={styles['col-6']}>
                                {/* Name */}
                                <div>
                                    <label className="form-label" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        className="form-input"
                                        id="name"
                                        type="text"
                                        placeholder="Eg: Nike Air Max 97"
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: {
                                                value: 3,
                                                message: 'Name must be at least 3 characters',
                                            },
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
                                        placeholder="Eg: Inspired by Japanese bullet trains, the Air Max 97 features full-length visible air cushioning and sleek lines."
                                        type="text"
                                        id="description"
                                        {...register('description')}
                                    />
                                </div>

                                <div className={styles['row']}>
                                    {/* Release year */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="releaseYear">
                                            Release Year
                                        </label>
                                        <input
                                            className="form-input"
                                            id="releaseYear"
                                            type="number"
                                            placeholder="Eg: 1997"
                                            {...register('releaseYear', {
                                                min: {
                                                    value: 1600,
                                                    message:
                                                        'Release year must be greater than 1600',
                                                },
                                            })}
                                        />
                                        <p className="form-msg-err">
                                            {errors.releaseYear && errors.releaseYear.message}
                                        </p>
                                    </div>

                                    {/* Origin */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="origin">
                                            Origin
                                        </label>
                                        <input
                                            className="form-input"
                                            id="origin"
                                            type="text"
                                            placeholder="Eg: VietNam"
                                            {...register('origin')}
                                        />
                                    </div>

                                    {/* BrandId */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="brandId">
                                            Brand
                                        </label>
                                        <select
                                            className="form-select"
                                            name="brandId"
                                            id="brandId"
                                            {...register('brandId')}
                                        >
                                            {brands.map((brand) => (
                                                <option key={brand._id} value={brand._id}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Original price */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="originalPrice">
                                            Original Price
                                        </label>
                                        <input
                                            className="form-input"
                                            id="originalPrice"
                                            type="number"
                                            placeholder="Eg: 1200000"
                                            {...register('originalPrice', {
                                                validate: (value) =>
                                                    value > 0 ||
                                                    'Original price must be greater than 0',
                                            })}
                                        />
                                        <p className="form-msg-err">
                                            {errors.originalPrice && errors.originalPrice.message}
                                        </p>
                                    </div>

                                    {/* New price */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="newPrice">
                                            New Price
                                        </label>
                                        <input
                                            className="form-input"
                                            id="newPrice"
                                            type="number"
                                            placeholder="Eg: 1119000"
                                            {...register('newPrice', {
                                                validate: (value) =>
                                                    value > 0 || 'New price must be greater than 0',
                                            })}
                                        />
                                        <p className="form-msg-err">
                                            {errors.newPrice && errors.newPrice.message}
                                        </p>
                                    </div>

                                    {/* Stock */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="stock">
                                            Stock
                                        </label>
                                        <input
                                            className="form-input"
                                            id="stock"
                                            type="number"
                                            placeholder="Eg: 5"
                                            {...register('stock', {
                                                min: 0,
                                                validate: (value) =>
                                                    value > 0 || 'Stock must be greater than 0',
                                            })}
                                        />
                                        <p className="form-msg-err">
                                            {errors.stock && errors.stock.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Main Image */}
                                <div>
                                    <label className="form-label" htmlFor="image">
                                        Main Image
                                    </label>
                                    <input
                                        className="form-input"
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        {...register('image')}
                                    />
                                    <div className="text-center">
                                        <Image className={styles['preview']} src={preview} />
                                    </div>
                                </div>

                                {/* Gallery Images */}
                                <div>
                                    <label className="form-label" htmlFor="galleryImages">
                                        Gallery Images
                                    </label>
                                    <input
                                        className="form-input"
                                        id="galleryImages"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        {...register('galleryImages', {
                                            validate: (files) =>
                                                files.length <= 10 ||
                                                'You can only upload up to 10 gallery images. If large, please delete some images.',
                                        })}
                                    />
                                    <p className="form-msg-err">
                                        {errors.galleryImages && errors.galleryImages.message}
                                    </p>

                                    {/* Display list preview imgs */}
                                    <div className="row">
                                        {galleryImagesPreview.map((img, index) => (
                                            <div className="col-3" key={index}>
                                                <div className={styles['gallery-img-wrapper']}>
                                                    <Image
                                                        key={index}
                                                        className={styles['gallery-img']}
                                                        src={img}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Specific Info */}
                            <div className={styles['col-6']}>
                                <div className={styles['row']}>
                                    {/* Gender */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="gender">
                                            Gender
                                        </label>
                                        <select
                                            className="form-select"
                                            name="gender"
                                            id="gender"
                                            {...register('gender')}
                                        >
                                            {genders.map((gender) => (
                                                <option key={gender} value={gender}>
                                                    {gender.slice(0, 1).toUpperCase() +
                                                        gender.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Status */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="status">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            id="status"
                                            className="form-select"
                                            {...register('status')}
                                        >
                                            {statuses.map((status) => (
                                                <option key={status} value={status}>
                                                    {status.slice(0, 1).toUpperCase() +
                                                        status.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Fake hot */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="fakeHot">
                                            Fake Hot
                                        </label>
                                        <select
                                            name="fakeHot"
                                            id="fakeHot"
                                            className="form-select"
                                            {...register('fakeHot')}
                                        >
                                            {fakeHots.map((fakeHot) => (
                                                <option key={fakeHot} value={fakeHot}>
                                                    {fakeHot.slice(0, 1).toUpperCase() +
                                                        fakeHot.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Tag */}
                                <CheckboxGroup
                                    label="Tag"
                                    nameRegister="tag"
                                    options={tags}
                                    required="Tag is required"
                                />

                                {/* Color */}
                                <div>
                                    <label className="form-label" htmlFor="colors">
                                        Color (separate colors with commas ',')
                                    </label>
                                    <input
                                        className="form-input"
                                        id="colors"
                                        type="text"
                                        placeholder="Eg: red, blue, white"
                                        {...register('colors', {
                                            required: 'Color is required',
                                        })}
                                    />
                                </div>

                                {/* Features */}
                                <div>
                                    <label className="form-label" htmlFor="feature">
                                        Features
                                    </label>
                                    <input
                                        className="form-input"
                                        id="feature"
                                        type="text"
                                        placeholder="Eg: Lightweight, Durable"
                                        {...register('feature')}
                                    />
                                </div>

                                {/* Sizes */}
                                <CheckboxGroup
                                    label="Sizes"
                                    nameRegister="sizes"
                                    options={sizes}
                                    required="Sizes is required"
                                />

                                {/* Type */}
                                <CheckboxGroup
                                    label="Type"
                                    nameRegister="type"
                                    options={types}
                                    required="Sizes is required"
                                />

                                {/* Style */}
                                <CheckboxGroup
                                    label="Style"
                                    nameRegister="style"
                                    options={stylesProduct}
                                    required="Style is required"
                                />

                                {/* Category */}
                                <CheckboxGroup
                                    label="Category"
                                    nameRegister="category"
                                    options={categories}
                                    required="Category is required"
                                />

                                {/* Material */}
                                <CheckboxGroup
                                    label="Material"
                                    nameRegister="material"
                                    options={materials}
                                />

                                {/* Design */}
                                <CheckboxGroup
                                    label="Design"
                                    nameRegister="design"
                                    options={designs}
                                />
                            </div>
                        </div>

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
                                Add product
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default ProductEdit;
