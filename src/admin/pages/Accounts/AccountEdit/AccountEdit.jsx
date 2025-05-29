import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
    api,
    backEndApi,
    flatObject,
    isSameValueObject,
    patternValidate,
    toastError,
    toastInfo,
    toastSuccess,
} from '~/utils/index.js';

import { ROLES, STATUSES, IMG_ADMIN_PATH } from '~/constants';

import { SelectGroup, CartBox } from '~/admin/components';

import Image from '~/components/Image';
import Button from '~/components/Button';
import styles from './AccountEdit.module.scss';

function AccountEdit({ adminEdit, setAdminEdit, setAdmins, setMode }) {
    const methods = useForm({
        defaultValues: {
            fullName: {
                firstName: adminEdit.fullName.firstName,
                lastName: adminEdit.fullName.lastName,
            },
            phone: adminEdit.phone,
            email: adminEdit.email,
            avatar: adminEdit.avatar,
            status: adminEdit.status,
            role: adminEdit.role,
        },
    });

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = methods;

    const [preview, setPreview] = useState(() => {
        if (adminEdit.avatar) return IMG_ADMIN_PATH + adminEdit.avatar;

        return '';
    });

    const avatarFile = watch('avatar');

    useEffect(() => {
        if (!avatarFile) return;

        if (preview && preview.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
        }

        if (avatarFile && avatarFile.length > 0 && avatarFile instanceof FileList) {
            const url = URL.createObjectURL(avatarFile[0]);
            setPreview(url);
        }
    }, [avatarFile]);

    const handleEdit = async (data) => {
        const isModified = !isSameValueObject(data, adminEdit);

        if (!isModified) {
            setAdminEdit();
            toastInfo('Nothing modified!');
            setMode('view');
            return;
        }

        try {
            const result = await api.putMultipart(
                backEndApi.admin,
                adminEdit._id,
                flatObject(data),
            );

            toastSuccess(result.message);

            // Save value just update into list account
            setAdmins((prev) =>
                prev.map((acc) => (acc._id === result.data._id ? result.data : acc)),
            );

            // Delete temporary img
            if (preview && preview.startsWith('blob:')) {
                URL.revokeObjectURL(preview);
            }

            setAdminEdit();
            setMode('view');
        } catch (err) {
            console.error('Error add admin!', err);
            toastError(err?.response?.data?.message || 'Create admin error!');
        }
    };

    const handleCancel = () => {
        setAdminEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Update account admin</h2>

                <FormProvider {...methods}>
                    <form
                        action=""
                        onSubmit={handleSubmit(handleEdit)}
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
                                    className="form-input-disable"
                                    type="text"
                                    placeholder={adminEdit.username}
                                    id="username"
                                    disabled
                                />
                            </div>

                            {/* Password */}
                            <div className="col-6">
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="form-input-disable"
                                    type="text"
                                    placeholder={adminEdit.password}
                                    id="username"
                                    disabled
                                />
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
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>

                            <Button
                                deepBlack
                                customStyle={styles['submit-btn']}
                                type="submit"
                            >
                                Update account
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CartBox>
        </div>
    );
}

export default AccountEdit;
