import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect, useContext, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

import {
    adminApi,
    backEndApi,
    patternValidate,
    storage,
    toastError,
    toastSuccess,
    tokenUtils,
} from '~/utils';
import { keyAdminProfile, keyAdminToken } from '~/constants';

import { ProviderContext } from '~/components/Provider';

import routes from '~/config/routes';

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

    const { setAdminProfile } = useContext(ProviderContext);

    // Skip login if token valid
    useEffect(() => {
        const token = storage.get(keyAdminToken);

        if (token) {
            const tokenValue = jwtDecode(token);

            if (!tokenUtils.isExpired(tokenValue)) {
                navigate(routes.adminDashboard);
            }
        }
    }, [navigate]);

    const handleLogin = useCallback(async (data) => {
        try {
            // Login request to the backend
            const auth = await adminApi.post(backEndApi.adminLogin, data);
            toastSuccess(auth.message);

            // Save token to localStorage
            storage.save(keyAdminToken, auth.token);

            // Save info token into localStorage
            storage.save(keyAdminProfile, auth.data);

            // Add info to profile
            setAdminProfile(auth.data);

            // Login successfully, redirect to dashboard
            navigate(routes.adminDashboard);
        } catch (err) {
            console.error('Login failed...', err);
            toastError(err.response.data.message || 'Login failed!');
        }
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Login</h1>

                <form action="" onSubmit={handleSubmit(handleLogin)}>
                    {/* Username */}
                    <label className="form-label" htmlFor="username">
                        Username
                    </label>
                    <input
                        className={errors.username ? 'form-input-invalid' : 'form-input'}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your username"
                        {...register('username', {
                            required: patternValidate.required,
                            pattern: patternValidate.alphaNumUnderscoreOnly,
                        })}
                    />
                    <p className="form-msg-err">
                        {errors.username && errors.username.message}
                    </p>

                    {/* Password */}
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={errors.password ? 'form-input-invalid' : 'form-input'}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        {...register('password', {
                            required: patternValidate.required,
                            minLength: patternValidate.password,
                        })}
                    />
                    <p className="form-msg-err">
                        {errors.password && errors.password.message}
                    </p>

                    {/* Button Login */}
                    <Button deepBlack customStyle={styles['login-btn']} type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
