import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';

import {
    api,
    backEndApi,
    flatObject,
    patternValidate,
    storage,
    toastError,
    toastSuccess,
} from '~/utils';
import { keyCustomerProfile } from '~/constants';
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
    const { setCustomerProfile } = useContext(ProviderContext);

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
            const result = await api.postMultipart(backEndApi.customer, flatObject(data));

            toastSuccess('Register successfully!');

            // Save
            storage.save(keyCustomerProfile, result.data);
            setCustomerProfile(result.data);

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
                    <h1 className={styles['header']}>Information</h1>

                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(handleRegister)}
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
                                >
                                    Back
                                </Button>

                                <Button
                                    deepBlack
                                    customStyle={styles['submit-btn']}
                                    type="submit"
                                >
                                    Register
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
