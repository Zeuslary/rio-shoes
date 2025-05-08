import clsx from 'clsx';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';

import Button from '~/components/Button';
import routes from '~/config/routes';
import styles from './Register.module.scss';

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = (data) => {
        console.log('data: ', data);
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Register</h1>

                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    {/* Username */}
                    <label className={styles['label']} htmlFor="username">
                        Username
                    </label>
                    <input
                        className={clsx(styles['input'], errors.username && styles['invalid'])}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        {...register('username', {
                            required: 'This field is required',
                            minLength: {
                                value: 3,
                                message: 'Username must be at least 3 characters',
                            },
                            maxLength: {
                                value: 20,
                                message: 'Username must be at most 30 characters',
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_]+$/,
                                message: 'Only letters, numbers, and underscores are allowed',
                            },
                        })}
                    />
                    <p className={styles['error-msg']}>
                        {errors.username && errors.username.message}
                    </p>

                    {/* Password */}
                    <label className={styles['label']} htmlFor="password">
                        Password
                    </label>
                    <input
                        className={clsx(styles['input'], errors.username && styles['invalid'])}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
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

                    {/* Confirm password */}
                    <label className={styles['label']} htmlFor="confirm-password">
                        Confirm password
                    </label>
                    <input
                        className={clsx(styles['input'], errors.username && styles['invalid'])}
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="Confirm your password"
                        {...register('confirmPassword', {
                            required: 'This field is required',
                            validate: (value) =>
                                value === watch('password') || 'Your passwords do no match',
                        })}
                    />
                    <p className={styles['error-msg']}>
                        {errors.confirmPassword && errors.confirmPassword.message}
                    </p>

                    {/* Button register */}
                    <Button deepBlack customStyle={styles['register-btn']} type="submit">
                        Register
                    </Button>

                    {/* Other */}
                    <p className={styles['other']}>
                        Already have an account?
                        <Link to={routes.login} className={styles['login-btn']}>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
