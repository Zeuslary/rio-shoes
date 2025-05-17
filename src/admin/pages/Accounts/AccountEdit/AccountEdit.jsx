import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import flatObject from '~/utils/flatObject';
import { IMG_ADMIN_PATH } from '~/constants';
import Image from '~/components/Image';
import { toastSuccess, toastError } from '~/utils/toast';
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

    const avatarFile = watch('avatar');

    let preview = '';

    if (typeof avatarFile === 'string') {
        preview = IMG_ADMIN_PATH + avatarFile;
    } else if (avatarFile.length > 0) {
        preview = URL.createObjectURL(avatarFile[0]);
    }

    useEffect(() => {
        console.log('Prev: ', preview);

        return () => {
            // Clear temporary img to avoid memory leak
            if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleEdit = async (data) => {
        console.log(data);

        try {
            const result = await api.putMultipart(
                backEndApi.admin,
                adminEdit._id,
                flatObject(data),
            );

            console.log('Create admin success:', result);
            toastSuccess(result.message);

            // Save value just update into list account
            setAdmins((prev) =>
                prev.map((acc) => (acc._id === result.data._id ? result.data : acc)),
            );

            setAdminEdit();
            setMode('view');
        } catch (err) {
            console.error('Error add admin!', err);
            toastError('Create admin error!');
        }
    };

    console.groupEnd();

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
                                placeholder="Eg: Rio"
                                id="username"
                                {...register('username', {
                                    required: 'This field is required',
                                    minLength: {
                                        value: 3,
                                        message: 'This field at least 3 letters',
                                    },
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
                                placeholder="Eg: Rio"
                                id="password"
                                {...register('password', {
                                    required: 'This field is required',
                                    minLength: {
                                        value: 3,
                                        message: 'This field at least 3 letters',
                                    },
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
                            pattern: {
                                value: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                                message: 'Phone is not valid',
                            },
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
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: 'Email is not valid',
                            },
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
                        <option value="admin">Admin</option>
                        <option value="superAdmin">SuperAdmin</option>
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
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="banned">Banned</option>
                    </select>

                    <div className={clsx('mt-24', 'text-center', 'mb-12')}>
                        <Button
                            type="button"
                            gray
                            customStyle={styles['cancel-btn']}
                            onClick={() => setMode('view')}
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
