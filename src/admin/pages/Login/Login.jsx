import clsx from 'clsx';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';
import routes from '~/config/routes';

import { storage, toastError, toastSuccess, tokenUtils } from '~/utils';

import Button from '~/components/Button';
import styles from './Login.module.scss';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Need to use navigate at top level to avoid issues with hooks
    const navigate = useNavigate();

    // Skip login if token valid
    useEffect(() => {
        const token = storage.get('token');

        if (token) {
            const tokenValue = jwtDecode(token);

            if (!tokenUtils.isExpired(tokenValue)) {
                navigate(routes.adminDashboard);
            }
        }
    }, [navigate]);

    const handleLogin = async (data) => {
        console.log('data: ', data);

        try {
            // Login request to the backend
            const auth = await api.post(backEndApi.adminLogin, data);
            toastSuccess(auth.message);

            console.log('auth: ', auth);

            // Save token to localStorage
            storage.save('token', auth.token);

            // Save some info token into localStorage
            storage.save('profile', {
                _id: auth.data._id,
                fullName: auth.data.fullName,
                role: auth.data.role,
                status: auth.data.status,
                phone: auth.data.phone,
                email: auth.data.email,
                lastLogin: auth.data.lastLogin,
                avatar: auth.data.avatar,
            });

            // Login successfully, redirect to dashboard
            navigate(routes.adminDashboard);
        } catch (err) {
            console.error('Login failed...', err);
            toastError(err.response.data.message || 'Login failed!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Login</h1>

                <form action="" onSubmit={handleSubmit(handleLogin)}>
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
                            pattern: {
                                value: /^[a-zA-Z0-9_]+$/,
                                message: 'Username cannot contain spaces or special characters',
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
                        className={clsx(styles['input'], errors.password && styles['invalid'])}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        {...register('password', {
                            required: 'This field is required',
                            minLength: {
                                value: 3,
                                message: 'Password must be at least 3 characters',
                            },
                        })}
                    />
                    <p className={styles['error-msg']}>
                        {errors.password && errors.password.message}
                    </p>

                    {/* Button Login */}
                    <Button deepBlack customStyle={styles['login-btn']} type="submit">
                        Login
                    </Button>

                    {/* Other */}
                    <p className={styles['other']}>
                        Don't have an account?
                        <Link to={routes.adminRegister} className={styles['register-btn']}>
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
