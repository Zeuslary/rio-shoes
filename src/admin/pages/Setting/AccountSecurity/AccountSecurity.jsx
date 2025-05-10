import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './AccountSecurity.module.scss';

function AccountSecurity({ account }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [msgSubmit, setMsgSubmit] = useState('');
    const newPassword = watch('newPassword');

    const handleUpdate = (data) => {
        console.log('Update...', data);
        if (data.password === data.newPassword) {
            setMsgSubmit('Old password and new password same');
        } else if (data.password === account.password) {
            console.log('Update successful!');
        } else {
            console.log('Not match...');
            setMsgSubmit('Old password is incorrect');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['body']}>
                <CartBox>
                    <form
                        action=""
                        className={styles['form']}
                        onSubmit={handleSubmit(handleUpdate)}
                    >
                        <h3 className="text-center">Change your password</h3>

                        {/* Password */}
                        <label className={styles['label']} htmlFor="password">
                            Password:
                        </label>
                        <input
                            className={clsx(styles['input'], errors.password && styles['invalid'])}
                            type="password"
                            id="password"
                            name="password"
                            {...register('password', {
                                required: 'This field is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        <p className={styles['error-msg']}>
                            {errors.password && errors.password.message}
                        </p>

                        {/* New Password */}
                        <label className={styles['label']} htmlFor="newPassword">
                            New Password:
                        </label>
                        <input
                            className={clsx(
                                styles['input'],
                                errors.newPassword && styles['invalid'],
                            )}
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            {...register('newPassword', {
                                required: 'This field is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        <p className={styles['error-msg']}>
                            {errors.newPassword && errors.newPassword.message}
                        </p>

                        {/* Confirm new password */}
                        <label className={styles['label']} htmlFor="confirmNewPassword">
                            Confirm new password:
                        </label>
                        <input
                            className={clsx(
                                styles['input'],
                                errors.confirmNewPassword && styles['invalid'],
                            )}
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            {...register('confirmNewPassword', {
                                required: 'This field is required',
                                validate: (value) =>
                                    value === newPassword || 'Passwords do not match',
                            })}
                        />
                        <p className={styles['error-msg']}>
                            {errors.confirmNewPassword && errors.confirmNewPassword.message}
                        </p>

                        <p className={styles['msg-submit']}>{msgSubmit}</p>

                        {/* Button Change */}
                        <p className="text-center">
                            <Button deepBlack type="submit" customStyle={styles['update-btn']}>
                                Change
                            </Button>
                        </p>
                    </form>
                </CartBox>
            </div>
        </div>
    );
}

export default AccountSecurity;
