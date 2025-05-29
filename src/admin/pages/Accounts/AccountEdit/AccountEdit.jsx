import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    api,
    backEndApi,
    patternValidate,
    upperCaseFirstLetter,
    flatObject,
    toastError,
    toastSuccess,
} from '~/utils';

import { IMG_ADMIN_PATH, ROLES, STATUSES } from '~/ constants';
import Image from '~/components/Image';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './AccountEdit.module.scss';

function AccountEdit({ adminEdit, setAdminEdit, setAdmins, setMode }) {
    console.group('Editing...', adminEdit);

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm({
        defaultValues: {
            fullName: {
                firstName: adminEdit.fullName.firstName,
                lastName: adminEdit.fullName.lastName,
            },
            username: adminEdit.username,
            password: adminEdit.password,
            phone: adminEdit.phone,
            email: adminEdit.email,
            avatar: adminEdit.avatar,
            status: adminEdit.status,
            role: adminEdit.role,
        },
    });

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

            setAdminEdit();
            setMode('view');
        } catch (err) {
            console.error('Error add admin!', err);
            toastError(err?.response?.data?.message || 'Create admin error!');
        }
    };

    const handleCancel = () => {
        setAdminEdit();
        setMode();
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Update account admin</h2>

                <form action="" onSubmit={handleSubmit(handleEdit)} encType="multipart/form-data">
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
                                    required: 'This field is required',
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.fullName?.firstName && errors.fullName.firstName.message}
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

                    {/* User-Password */}
                    <div className="row">
                        {/* Username */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="username">
                                Username
                            </label>
                            <input
                                className={clsx(
                                    'form-input',
                                    errors.username && 'form-input-invalid',
                                )}
                                type="text"
                                placeholder="Enter your username"
                                id="username"
                                {...register('username', {
                                    required: 'This field is required',
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
                                className={clsx(
                                    'form-input',
                                    errors.password && 'form-input-invalid',
                                )}
                                type="text"
                                placeholder="Enter your password"
                                id="password"
                                {...register('password', {
                                    required: 'This field is required',
                                    minLength: patternValidate.password,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.password && errors.password.message}
                            </p>
                        </div>
                    </div>

                    {/* Phone */}
                    <label className="form-label" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        className={clsx('form-input', errors.phone && 'form-input-invalid')}
                        type="text"
                        placeholder="Eg: 0123456789"
                        id="phone"
                        {...register('phone', {
                            pattern: patternValidate.phone,
                        })}
                    />
                    <p className="form-msg-err">{errors.phone && errors.phone.message}</p>

                    {/* Email */}
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={clsx('form-input', errors.email && 'form-input-invalid')}
                        type="text"
                        placeholder="Eg: rio@gmail.com"
                        id="email"
                        {...register('email', {
                            pattern: patternValidate.email,
                        })}
                    />
                    <p className="form-msg-err">{errors.email && errors.email.message}</p>

                    {/* Avatar */}
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
                    <div className="text-center mt-12">
                        <Image className={styles['avatar']} src={preview} />
                    </div>

                    {/* Role */}
                    <label className="form-label" htmlFor="role">
                        Role
                    </label>
                    <select name="role" id="role" className="form-select" {...register('role')}>
                        {ROLES.map((role) => (
                            <option key={role} value={role}>
                                {upperCaseFirstLetter(role)}
                            </option>
                        ))}
                    </select>

                    {/* Status */}
                    <label className="form-label" htmlFor="status">
                        Status
                    </label>
                    <select
                        name="status"
                        id="status"
                        className="form-select"
                        {...register('status')}
                    >
                        {STATUSES.map((status) => (
                            <option key={status} value={status}>
                                {upperCaseFirstLetter(status)}
                            </option>
                        ))}
                    </select>

                    <div className={clsx('mt-24', 'text-center', 'mb-12')}>
                        <Button
                            type="button"
                            gray
                            customStyle={styles['cancel-btn']}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button deepBlack customStyle={styles['submit-btn']} type="submit">
                            Update
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default AccountEdit;
