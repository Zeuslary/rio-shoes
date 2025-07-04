import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
    adminApi,
    backEndApi,
    flatObject,
    patternValidate,
    toastError,
    toastSuccess,
} from '~/utils';
import { STATUSES } from '~/constants';

import { CartBox, SelectGroup } from '~/admin/components';

import { AddressForm, Image, Button } from '~/components';
import styles from './CustomerAdd.module.scss';

function CustomerAdd({ setCustomers, setMode }) {
    const methods = useForm({
        defaultValues: {
            username: '',
            password: '',
            fullName: {
                firstName: '',
                lastName: '',
            },
            phone: '',
            email: '',
            address: {
                city: 'default',
                district: 'default',
                ward: 'default',
                houseNumber: '',
            },
            avatar: '',
            dateOfBirth: '',
            lastOrderDate: '',
            lastLogin: '',
            status: 'active',
        },
    });

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = methods;

    // Handle show preview image
    const [preview, setPreview] = useState();
    const avatarFile = watch('avatar')?.[0];

    useEffect(() => {
        let url = '';

        if (avatarFile) {
            url = URL.createObjectURL(avatarFile);

            setPreview(url);
        }
        console.groupEnd();

        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [avatarFile]);

    // Handle add customer into db
    const handleAdd = async (data) => {
        try {
            const result = await adminApi.postMultipart(
                backEndApi.customer,
                flatObject(data),
            );

            toastSuccess(result.message);
            setCustomers((prev) => [...prev, result.data]);
            setMode('view');
        } catch (err) {
            console.error('Error add customer!', err);
            toastError(err.response?.data?.message || 'Add customer failed!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add customer</h2>

                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(handleAdd)}
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
                                    {...register('fullName.lastName')}
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
                                onClick={() => setMode('view')}
                            >
                                Cancel
                            </Button>

                            <Button
                                deepBlack
                                customStyle={styles['submit-btn']}
                                type="submit"
                            >
                                Add customer
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default CustomerAdd;
