import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';

import {
    userApi,
    backEndApi,
    flatObject,
    patternValidate,
    storage,
    toastError,
    toastSuccess,
} from '~/utils';
import { keyCustomerProfile, keyUserToken } from '~/constants';
import routes from '~/config/routes';

import { ProviderContext } from '~/components/Provider';
import { CartBox } from '~/admin/components';

import { AddressForm, Image, Button } from '~/components';
import styles from './UserInfo.module.scss';

function UserInfo() {
    // Load username, password from register page
    const location = useLocation();

    // Navigate and Provider Context
    const navigate = useNavigate();
    const { setCustomerProfile, setIsAccount } = useContext(ProviderContext);

    const methods = useForm({
        defaultValues: {
            username: location?.state?.username || '',
            password: location?.state?.password || '',
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

    // Register
    const handleRegister = async (data) => {
        console.log('Data: ', data);

        try {
            const result = await userApi.postMultipart(
                backEndApi.customer,
                flatObject(data),
            );

            toastSuccess('Register successfully!');

            // Save
            storage.save(keyCustomerProfile, result.data);
            setCustomerProfile(result.data);
            storage.save(keyUserToken, result.token);
            setIsAccount(true);

            // After save, switch to Home
            navigate(routes.home);
        } catch (err) {
            console.error('Register failed...', err);
            toastError(err.response?.data?.message || 'Register failed!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <CartBox>
                    <h1 className={styles['header']}>Thông tin cá nhân</h1>

                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(handleRegister)}
                            encType="multipart/form-data"
                        >
                            {/* Fullname */}
                            <div className="row">
                                {/* First name */}
                                <div className="col-4 col-m-6 col-s-12">
                                    <label className="form-label" htmlFor="firstName">
                                        Tên
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
                                <div className="col-4 col-m-6 col-s-12">
                                    <label className="form-label" htmlFor="lastName">
                                        Họ
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
                                <div className="col-4 col-m-6 col-s-12">
                                    <label className="form-label" htmlFor="dateOfBirth">
                                        Ngày sinh
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

                                {/* Phone and Email */}
                                <div className="col-6">
                                    <label className="form-label" htmlFor="phone">
                                        Số điện thoại
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
                                    to={routes.register}
                                    customStyle={styles['cancel-btn']}
                                >
                                    Quay lại
                                </Button>

                                <Button
                                    deepBlack
                                    customStyle={styles['submit-btn']}
                                    type="submit"
                                >
                                    Đăng ký
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </CartBox>
            </div>
        </div>
    );
}

export default UserInfo;
