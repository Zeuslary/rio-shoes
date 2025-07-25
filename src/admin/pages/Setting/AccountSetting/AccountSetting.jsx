import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState, useContext } from 'react';

import {
    adminApi,
    backEndApi,
    flatObject,
    storage,
    toastError,
    toastSuccess,
    isSameValueObject,
    toastInfo,
    patternValidate,
} from '~/utils';
import { ProviderContext } from '~/components/Provider';
import { IMG_ADMIN_PATH } from '~/constants';

import Button from '~/components/Button';
import Image from '~/components/Image';
import CartBox from '~/admin/components/CartBox';
import styles from './AccountSetting.module.scss';

function AccountSetting() {
    const { adminProfile, setAdminProfile } = useContext(ProviderContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: {
                firstName: adminProfile?.fullName?.firstName,
                lastName: adminProfile?.fullName?.lastName,
            },
            email: adminProfile?.email,
            phone: adminProfile?.phone,
            avatar: adminProfile?.avatar,
        },
    });

    const [preview, setPreview] = useState(() => {
        const avatar = watch('avatar');

        if (avatar && typeof avatar === 'string') return IMG_ADMIN_PATH + avatar;
        return '';
    });

    const avatar = watch('avatar');

    useEffect(() => {
        // Before create new URL, delete old URL
        if (preview && preview.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
        }

        if (avatar instanceof FileList && avatar.length > 0) {
            setPreview(URL.createObjectURL(avatar[0]));
        }
    }, [avatar]);

    const handleUpdate = useCallback(async (data) => {
        if (typeof data.avatar === 'string') delete data.avatar;

        if (isSameValueObject(data, adminProfile)) {
            toastInfo('Nothing modified!');
            return;
        }

        try {
            const result = await adminApi.putMultipart(
                backEndApi.admin,
                adminProfile._id,
                flatObject(data),
            );
            storage.save('adminProfile', result.data);
            setAdminProfile(result.data);
            toastSuccess(result.message);
        } catch (err) {
            toastError(err.response?.data?.message || 'Update admin error!');
        }
    }, []);

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <form action="" onSubmit={handleSubmit(handleUpdate)}>
                    <h2 className={styles['header']}>Change info</h2>

                    {/* FullName */}
                    <div className="row">
                        {/* First Name */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                className={clsx(
                                    'form-input',
                                    errors.fullName?.firstName && 'form-input-invalid',
                                )}
                                type="text"
                                placeholder="Eg: Rio"
                                id="firstName"
                                {...register('fullName.firstName', {
                                    required: patternValidate.required,
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

                    <div className="row">
                        {/* Email */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="email">
                                Email:
                            </label>
                            <input
                                className={
                                    errors.email ? 'form-input-invalid' : 'form-input'
                                }
                                type="email"
                                id="email"
                                name="email"
                                {...register('email', {
                                    required: patternValidate.required,
                                    pattern: patternValidate.email,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.email && errors.email.message}
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="phone">
                                Phone:
                            </label>
                            <input
                                className={
                                    errors.phone ? 'form-input-invalid' : 'form-input'
                                }
                                type="phone"
                                id="phone"
                                name="phone"
                                {...register('phone', {
                                    required: patternValidate.required,
                                    pattern: patternValidate.phone,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.phone && errors.phone.message}
                            </p>
                        </div>
                    </div>

                    {/* Change avatar */}
                    <label className="form-label" htmlFor="avatar">
                        Avatar:
                    </label>
                    <input
                        className={errors.avatar ? 'form-input-invalid' : 'form-input'}
                        type="file"
                        id="avatar"
                        name="avatar"
                        {...register('avatar')}
                    />
                    {/* Preview image */}
                    <div className="text-center">
                        <Image className={styles['avatar']} src={preview} />
                    </div>

                    {/* Button Change */}
                    <p className="text-center mb-12">
                        <Button
                            deepBlack
                            type="submit"
                            customStyle={styles['update-btn']}
                        >
                            Update changes
                        </Button>
                    </p>
                </form>
            </CartBox>
        </div>
    );
}

export default AccountSetting;
