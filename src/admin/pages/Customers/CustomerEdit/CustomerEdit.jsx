import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import {
    api,
    backEndApi,
    patternValidate,
    flatObject,
    toastError,
    toastSuccess,
    isSameValueObject,
    toastInfo,
} from '~/utils';

import { IMG_CUSTOMER_PATH, STATUSES } from '~/constants';

import { Image, Button, AddressForm } from '~/components';
import { CartBox, SelectGroup } from '~/admin/components';
import styles from './CustomerEdit.module.scss';

function CustomerEdit({ customerEdit, setCustomerEdit, setCustomers, setMode }) {
    const methods = useForm({
        defaultValues: {
            username: customerEdit?.username,
            password: customerEdit?.password,
            fullName: {
                firstName: customerEdit?.fullName?.firstName,
                lastName: customerEdit?.fullName?.lastName,
            },
            phone: customerEdit?.phone,
            email: customerEdit?.email,
            address: {
                city: customerEdit.address.city,
                district: customerEdit.address.district,
                ward: customerEdit.address.ward,
                houseNumber: customerEdit.address.houseNumber,
            },
            avatar: customerEdit?.avatar,
            dateOfBirth: customerEdit?.dateOfBirth,
            lastOrderDate: customerEdit?.lastOrderDate,
            lastLogin: customerEdit?.lastLogin,
            status: customerEdit.status,
        },
    });

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = methods;

    // Handle show preview image
    const avatarFile = watch('avatar');
    const [preview, setPreview] = useState(() => {
        if (avatarFile && typeof avatarFile === 'string')
            return IMG_CUSTOMER_PATH + avatarFile;

        return;
    });

    useEffect(() => {
        let url = '';

        if (avatarFile && avatarFile instanceof FileList) {
            url = URL.createObjectURL(avatarFile[0]);

            setPreview(url);
        }

        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [avatarFile]);

    const handleEdit = async (data) => {
        const isModified = !isSameValueObject(flatObject(data), flatObject(customerEdit));

        // Handle not modified
        if (!isModified) {
            toastInfo('Nothing modified!');
            setCustomerEdit();
            setMode('view');
        }

        // If not upload img -> delete
        if (!(data.avatar instanceof FileList)) delete data.avatar;

        try {
            const result = await api.putMultipart(
                backEndApi.customer,
                customerEdit._id,
                flatObject(data),
            );

            toastSuccess(result.message);
            setCustomers((prev) =>
                prev.map((customer) =>
                    customer._id === customerEdit._id ? result.data : customer,
                ),
            );
            setCustomerEdit();
            setMode('view');
        } catch (err) {
            console.error('Update customer failed...', err);
            toastError(err.response?.data?.message || 'Update customer error!');
        }
    };

    const handleCancel = () => {
        setCustomerEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Update customer</h2>

                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(handleEdit)}
                        encType="multipart/form-data"
                    >
                        {/* Fullname */}
                        <div className="row">
                            {/* First name */}
                            <div className="col-4">
                                <label className="form-label" htmlFor="firstName">
                                    First name
                                </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Eg: Rio"
                                    id="firstName"
                                    {...register('fullName.firstName', {
                                        required: patternValidate.required,
                                        minLength: patternValidate.minLength3,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.fullName?.firstName &&
                                        errors.fullName.firstName.message}
                                </p>
                            </div>

                            {/* Last name */}
                            <div className="col-4">
                                <label className="form-label" htmlFor="lastName">
                                    Last name
                                </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Eg: Lander"
                                    id="lastName"
                                    {...register('fullName.lastName', {
                                        required: patternValidate.required,
                                        minLength: patternValidate.minLength3,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.fullName?.lastName &&
                                        errors.fullName.lastName.message}
                                </p>
                            </div>

                            {/* Date of Birth */}
                            <div className="col-4">
                                <label className="form-label" htmlFor="dateOfBirth">
                                    Date of Birth
                                </label>
                                <input
                                    className="form-input"
                                    id="dateOfBirth"
                                    type="date"
                                    {...register('dateOfBirth')}
                                />
                                <p className="form-msg-err">
                                    {errors.dateOfBirth && errors.dateOfBirth.message}
                                </p>
                            </div>
                        </div>

                        {/* Account */}
                        <div className="row">
                            {/* Username */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Enter username"
                                    id="username"
                                    {...register('username', {
                                        minLength: patternValidate.minLength3,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.username && errors.username.message}
                                </p>
                            </div>

                            {/* Password */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Enter password"
                                    id="password"
                                    {...register('password', {
                                        minLength: patternValidate.password,
                                    })}
                                />
                                {errors.password && errors.password.message}
                            </div>
                        </div>

                        {/* Phone and Email */}
                        <div className="row">
                            <div className="col-6">
                                <label className="form-label" htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    className="form-input"
                                    id="phone"
                                    type="text"
                                    placeholder="Enter your phone number"
                                    {...register('phone', {
                                        required: patternValidate.required,
                                        pattern: patternValidate.phone,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.phone && errors.phone.message}
                                </p>
                            </div>

                            <div className="col-6">
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="form-input"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    {...register('email', {
                                        pattern: patternValidate.email,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.email && errors.email.message}
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

                        {/* Address */}
                        <AddressForm />

                        {/* Avatar */}
                        <div>
                            <label className="form-label" htmlFor="avatar">
                                Avatar
                            </label>
                            <input
                                className="form-input"
                                type="file"
                                id="avatar"
                                name="avatar"
                                {...register('avatar')}
                            />
                            {/* Preview image */}
                            <Image className={styles['avatar']} src={preview} />
                        </div>

                        {/* Actions */}
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
                                Update customer
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default CustomerEdit;
