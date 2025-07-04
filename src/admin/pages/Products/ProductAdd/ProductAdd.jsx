import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import {
    backEndApi,
    patternValidate,
    toastError,
    toastSuccess,
    upperCaseFirstLetter,
    adminApi,
} from '~/utils';

import { productOption } from '~/constants';

import { CheckboxGroup, CartBox, SelectGroup } from '~/admin/components';
import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './ProductAdd.module.scss';

function ProductAdd({ brands, setProducts, setMode }) {
    const methods = useForm({
        defaultValues: {
            name: '',
            description: '',
            style: [],
            category: [],
            type: [],
            brandId: brands[0]?.id,
            material: [],
            design: [],
            releaseYear: '',
            origin: '',
            colors: [],
            sizes: [],
            stock: 0,
            sold: 0,
            originalPrice: '',
            newPrice: '',
            image: '',
            galleryImages: [],
            tag: [],
            fakeHot: 'false',
            feature: '',
            gender: 'male',
            status: 'active',
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
    const imageFile = watch('image')?.[0];
    const galleryImages = watch('galleryImages');

    useEffect(() => {
        let url;

        if (imageFile) {
            url = URL.createObjectURL(imageFile);
            setPreview(url);
        }

        return () => {
            // Clear temporary img to avoid memory leak
            if (url) URL.revokeObjectURL(url);
        };
    }, [imageFile]);

    useEffect(() => {
        let urls = [];

        if (galleryImages && galleryImages.length > 0) {
            for (let i = 0; i < galleryImages.length; i++) {
                urls.push(URL.createObjectURL(galleryImages[i]));
            }

            setGalleryImagesPreview(urls);
        }

        return () => {
            // Clear temporary img to avoid memory leak
            if (urls && urls.length > 0) {
                urls.forEach((img) => URL.revokeObjectURL(img));
            }
        };
    }, [galleryImages]);

    // Handle add customer into db
    const handleAdd = async (data) => {
        try {
            const result = await adminApi.postMultipart(backEndApi.product, data);

            toastSuccess(result.message);
            setProducts((prev) => [...prev, result.data]);
            setMode('view');
        } catch (err) {
            console.error('Error add product!', err);
            toastError(err.response?.data?.message || 'Add product failed!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add product</h2>

                <FormProvider {...methods}>
                    <form
                        action=""
                        onSubmit={handleSubmit(handleAdd)}
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
                                        className={
                                            errors.name
                                                ? 'form-input-invalid'
                                                : 'form-input'
                                        }
                                        id="name"
                                        type="text"
                                        placeholder="Eg: Nike Air Max 97"
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
                                        rows={5}
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
                                        <label
                                            className="form-label"
                                            htmlFor="releaseYear"
                                        >
                                            Release Year
                                        </label>
                                        <input
                                            className={
                                                errors.releaseYear
                                                    ? 'form-input-invalid'
                                                    : 'form-input'
                                            }
                                            id="releaseYear"
                                            type="number"
                                            placeholder="Eg: 1997"
                                            {...register('releaseYear', {
                                                min: {
                                                    value: 1000,
                                                    message:
                                                        'Release year must be greater than 1000',
                                                },
                                            })}
                                        />
                                        <p className="form-msg-err">
                                            {errors.releaseYear &&
                                                errors.releaseYear.message}
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
                                                    {upperCaseFirstLetter(brand.name)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Original price */}
                                    <div className={styles['col-4']}>
                                        <label
                                            className="form-label"
                                            htmlFor="originalPrice"
                                        >
                                            Original Price
                                        </label>
                                        <input
                                            className={
                                                errors.originalPrice
                                                    ? 'form-input-invalid'
                                                    : 'form-input'
                                            }
                                            id="originalPrice"
                                            type="number"
                                            placeholder="Eg: 1200000"
                                            {...register('originalPrice', {
                                                required: patternValidate.required,
                                                validate: (value) =>
                                                    value > 0 ||
                                                    'Original price must be greater than 0',
                                            })}
                                        />
                                        <p className="form-msg-err">
                                            {errors.originalPrice &&
                                                errors.originalPrice.message}
                                        </p>
                                    </div>

                                    {/* New price */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="newPrice">
                                            New Price
                                        </label>
                                        <input
                                            className={
                                                errors.newPrice
                                                    ? 'form-input-invalid'
                                                    : 'form-input'
                                            }
                                            id="newPrice"
                                            type="number"
                                            placeholder="Eg: 1119000"
                                            {...register('newPrice', {
                                                required: patternValidate.required,
                                                validate: (value) =>
                                                    value >= 0 ||
                                                    'New price must be equal or greater than 0',
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
                                            className={
                                                errors.stock
                                                    ? 'form-input-invalid'
                                                    : 'form-input'
                                            }
                                            id="stock"
                                            type="number"
                                            placeholder="Eg: 5"
                                            {...register('stock', {
                                                validate: (value) =>
                                                    value >= 0 ||
                                                    'Stock must be equal or greater than 0',
                                            })}
                                        />
                                        <p className="form-msg-err">
                                            {errors.stock && errors.stock.message}
                                        </p>
                                    </div>
                                </div>

                                <div className={styles['row']}>
                                    {/* Gender */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="gender">
                                            Gender
                                        </label>

                                        <SelectGroup
                                            nameRegister="gender"
                                            options={productOption.genders}
                                        />
                                    </div>

                                    {/* Status */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="status">
                                            Status
                                        </label>

                                        <SelectGroup
                                            nameRegister="status"
                                            options={productOption.statuses}
                                        />
                                    </div>

                                    {/* Fake hot */}
                                    <div className={styles['col-4']}>
                                        <label className="form-label" htmlFor="fakeHot">
                                            Fake Hot
                                        </label>

                                        <SelectGroup
                                            nameRegister="fakeHot"
                                            options={productOption.fakeHots}
                                        />
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
                                        <Image
                                            className={styles['preview']}
                                            src={preview}
                                        />
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
                                        {errors.galleryImages &&
                                            errors.galleryImages.message}
                                    </p>

                                    {/* Display list preview imgs */}
                                    <div className="row">
                                        {galleryImagesPreview.map((img, index) => (
                                            <div className="col-3" key={index}>
                                                <div
                                                    className={
                                                        styles['gallery-img-wrapper']
                                                    }
                                                >
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
                                {/* Tag */}
                                <CheckboxGroup
                                    label="Tag"
                                    nameRegister="tag"
                                    options={productOption.tags}
                                    required="Tag is required"
                                />

                                {/* Color */}

                                <CheckboxGroup
                                    label="Colors"
                                    nameRegister="colors"
                                    options={productOption.colors}
                                    required="Colors is required"
                                />

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
                                    options={productOption.sizes}
                                    required="Sizes is required"
                                />

                                {/* Type */}
                                <CheckboxGroup
                                    label="Type"
                                    nameRegister="type"
                                    options={productOption.types}
                                    required="Sizes is required"
                                />

                                {/* Style */}
                                <CheckboxGroup
                                    label="Style"
                                    nameRegister="style"
                                    options={productOption.stylesProduct}
                                    required="Style is required"
                                />

                                {/* Category */}
                                <CheckboxGroup
                                    label="Category"
                                    nameRegister="category"
                                    options={productOption.categories}
                                    required="Category is required"
                                />

                                {/* Material */}
                                <CheckboxGroup
                                    label="Material"
                                    nameRegister="material"
                                    options={productOption.materials}
                                    required="Material is required"
                                />

                                {/* Design */}
                                <CheckboxGroup
                                    label="Design"
                                    nameRegister="design"
                                    options={productOption.designs}
                                    required="Design is required"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-24 text-center mb-12">
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
                                Add product
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default ProductAdd;
