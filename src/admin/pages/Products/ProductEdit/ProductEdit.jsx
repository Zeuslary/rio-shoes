import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import {
    api,
    backEndApi,
    patternValidate,
    toastError,
    toastSuccess,
    upperCaseFirstLetter,
} from '~/utils';

import { IMG_PRODUCT_PATH, productOption } from '~/constants';

import { CheckboxGroup, CartBox, SelectGroup } from '~/admin/components';
import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './ProductEdit.module.scss';

function ProductEdit({ setProducts, brands, productEdit, setProductEdit, setMode }) {
    const methods = useForm({
        defaultValues: {
            name: productEdit?.name,
            description: productEdit?.description,
            style: productEdit?.style,
            category: productEdit?.category,
            type: productEdit?.type,
            brandId: productEdit?.brandId._id,
            material: productEdit?.material,
            design: productEdit?.design,
            releaseYear: productEdit?.releaseYear,
            origin: productEdit?.origin,
            colors: productEdit?.colors,
            sizes: productEdit?.sizes,
            stock: productEdit?.stock,
            sold: productEdit?.sold,
            originalPrice: productEdit?.originalPrice,
            newPrice: productEdit?.newPrice,
            image: productEdit?.image,
            galleryImages: productEdit?.galleryImages,
            tag: productEdit?.tag,
            fakeHot: productEdit?.fakeHot,
            feature: productEdit?.feature,
            gender: productEdit?.gender,
            status: productEdit?.status,
        },
    });

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = methods;

    // State preview image
    const imageFile = watch('image');
    const [preview, setPreview] = useState(() => {
        if (imageFile && typeof imageFile === 'string')
            return IMG_PRODUCT_PATH + imageFile;
        return;
    });

    // Gallery preview
    const [galleryImagesPreview, setGalleryImagesPreview] = useState([]);
    const galleryImages = watch('galleryImages');

    // console.group('Preview: ', preview);
    // console.log('Gallery images preview: ', galleryImagesPreview);
    // console.log('Image: ', imageFile);
    // console.log('GalleryImages: ', galleryImages);
    // console.groupEnd();

    useEffect(() => {
        let url;

        // console.error('Ima', imageFile, imageFile instanceof File);

        // Not exist img -> out
        if (!imageFile) return;

        if (imageFile instanceof FileList) {
            url = URL.createObjectURL(imageFile[0]);
            setPreview(url);
        }

        return () => {
            // Clear temporary img to avoid memory leak
            if (url) URL.revokeObjectURL(url);
        };
    }, [imageFile]);

    useEffect(() => {
        let urls = [];

        // console.error('Gal', galleryImages, galleryImages instanceof File);

        // If don't exist img -> out function
        if (!galleryImages && galleryImages.length <= 0) return;

        // img is file -> create temporary url
        if (galleryImages instanceof FileList) {
            for (let i = 0; i < galleryImages.length; i++) {
                urls.push(URL.createObjectURL(galleryImages[i]));
            }

            setGalleryImagesPreview(urls);
        }

        // If img is string -> render
        else if (!(galleryImages instanceof FileList)) {
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
        // Delete image if not change
        if (typeof data.image === 'string') delete data.image;
        if (data.galleryImages && typeof data.galleryImages[0] === 'string')
            delete data.galleryImages;

        // Delete releaseYear if not exist
        if (!data.releaseYear) delete data.releaseYear;

        try {
            const result = await api.putMultipart(
                backEndApi.product,
                productEdit._id,
                data,
            );

            // Find brand correspond with data update
            const brandId = brands.find((brand) => brand._id === result.data.brandId);

            toastSuccess(result.message);
            setProducts((prev) =>
                prev.map((product) =>
                    product._id === result.data._id
                        ? { ...result.data, brandId }
                        : product,
                ),
            );
            setProductEdit();
            setMode('view');
        } catch (err) {
            console.error('Update product failed...', err);
            toastError(err.response?.data?.message || 'Update product error!');
        }
    };

    const handleCancel = () => {
        setProductEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Update product</h2>

                <FormProvider {...methods}>
                    <form
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
                                                    value >= 0 ||
                                                    'Original price must be equal or greater than 0',
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
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>

                            <Button
                                deepBlack
                                customStyle={styles['submit-btn']}
                                type="submit"
                            >
                                Update product
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default ProductEdit;
