import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
    adminApi,
    backEndApi,
    flatObject,
    patternValidate,
    toastError,
    toastSuccess,
    toastWarning,
} from '~/utils/index.js';

import { ROLES, STATUSES } from '~/constants';

import { SelectGroup, CartBox } from '~/admin/components';

import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './AccountAdd.module.scss';

function AccountAdd({ setAdmins, setMode }) {
    const methods = useForm({
        defaultValues: {
            fullName: {
                firstName: '',
                lastName: '',
            },
            username: '',
            password: '',
            phone: '',
            email: '',
            avatar: '',
            status: 'active',
            role: 'admin',
        },
    });

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = methods;

    const [preview, setPreview] = useState();
    const avatarFile = watch('avatar');

    console.log('preview', preview);

    useEffect(() => {
        if (!avatarFile) return;

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        const url = URL.createObjectURL(avatarFile[0]);

        setPreview(url);
    }, [avatarFile]);

    const handleAdd = async (data) => {
        try {
            const result = await adminApi.postMultipart(
                backEndApi.admin,
                flatObject(data),
            );

            // Handle exist username
            if (result.message.includes('already exist')) {
                toastWarning(result.message);
                return;
            }

            // Handle Add success
            toastSuccess(result.message);

            if (preview && preview.startsWith('blob:')) {
                URL.revokeObjectURL(preview);
            }

            setAdmins((prev) => [...prev, result.data]);
            setMode('view');
        } catch (err) {
            console.error('Error add admin!', err);
            toastError('Create admin error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add account admin</h2>

                <FormProvider {...methods}>
                    <form
                        action=""
                        onSubmit={handleSubmit(handleAdd)}
                        encType="multipart/form-data"
                    >
                        {/* FullName */}
                        <div className="row">
                            {/* First Name */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    className={
                                        errors?.fullName?.firstName
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
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

                            {/* Last Name */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="Eg: Lander"
                                    id="lastName"
                                    {...register('fullName.lastName')}
                                />
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
                                    className={
                                        errors?.username
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
                                    type="text"
                                    placeholder="Enter your username"
                                    id="username"
                                    {...register('username', {
                                        required: patternValidate.required,
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
                                    className={
                                        errors?.password
                                            ? 'form-input-invalid'
                                            : 'form-input'
                                    }
                                    type="text"
                                    placeholder="Enter your password"
                                    id="password"
                                    {...register('password', {
                                        required: patternValidate.required,
                                        minLength: patternValidate.password,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.password && errors.password.message}
                                </p>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="row">
                            {/* Phone */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    className={
                                        errors.phone ? 'form-input-invalid' : 'form-input'
                                    }
                                    type="text"
                                    placeholder="Eg: 0123456789"
                                    id="phone"
                                    {...register('phone', {
                                        pattern: patternValidate.phone,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.phone && errors.phone.message}
                                </p>
                            </div>

                            {/* Email */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className={
                                        errors.email ? 'form-input-invalid' : 'form-input'
                                    }
                                    type="text"
                                    placeholder="Eg: rio@gmail.com"
                                    id="email"
                                    {...register('email', {
                                        pattern: patternValidate.email,
                                    })}
                                />
                                <p className="form-msg-err">
                                    {errors.email && errors.email.message}
                                </p>
                            </div>

                            {/* Role */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="role">
                                    Role
                                </label>

                                <SelectGroup nameRegister="role" options={ROLES} />
                            </div>

                            {/* Status */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="status">
                                    Status
                                </label>

                                <SelectGroup nameRegister="status" options={STATUSES} />
                            </div>
                        </div>

                        {/* Avatar */}
                        <div>
                            <label className="form-label" htmlFor="avatar">
                                Avatar:
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
                                Add account
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default AccountAdd;
