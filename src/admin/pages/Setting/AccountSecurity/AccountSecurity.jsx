import { useForm } from 'react-hook-form';
import { useCallback, useContext } from 'react';

import { ProfileContext } from '~/components/ProfileProvider';

import { api, backEndApi, patternValidate, toastError, toastSuccess } from '~/utils';

import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './AccountSecurity.module.scss';

function AccountSecurity() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const newPassword = watch('newPassword');
    const { profile } = useContext(ProfileContext);

    const handleUpdate = useCallback(async (data) => {
        if (data.password === data.newPassword) {
            toastError('New password must different with your password!');
            return;
        }

        try {
            const result = await api.updatePassword(backEndApi.admin, profile._id, {
                password: data.password,
                newPassword: data.newPassword,
            });

            toastSuccess(result.message);
        } catch (err) {
            toastError(err.response?.data?.message || 'Change password failed!');
        }
    }, []);

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
                        <label className="form-label" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className={errors.password ? 'form-input-invalid' : 'form-input'}
                            type="password"
                            id="password"
                            name="password"
                            {...register('password', {
                                required: patternValidate.required,
                                minLength: patternValidate.password,
                            })}
                        />
                        <p className="form-msg-err">{errors.password && errors.password.message}</p>

                        {/* New Password */}
                        <label className="form-label" htmlFor="newPassword">
                            New Password:
                        </label>
                        <input
                            className={errors.newPassword ? 'form-input-invalid' : 'form-input'}
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            {...register('newPassword', {
                                required: patternValidate.required,
                                minLength: patternValidate.password,
                            })}
                        />
                        <p className="form-msg-err">
                            {errors.newPassword && errors.newPassword.message}
                        </p>

                        {/* Confirm new password */}
                        <label className="form-label" htmlFor="confirmNewPassword">
                            Confirm new password:
                        </label>
                        <input
                            className={
                                errors.confirmNewPassword ? 'form-input-invalid' : 'form-input'
                            }
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            {...register('confirmNewPassword', {
                                required: patternValidate.required,
                                validate: (value) =>
                                    value === newPassword || 'Passwords do not match',
                            })}
                        />
                        <p className="form-msg-err">
                            {errors.confirmNewPassword && errors.confirmNewPassword.message}
                        </p>

                        {/* Button Change */}
                        <p className="text-center mt-12">
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
