import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect, useContext, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

import {
    userApi,
    backEndApi,
    patternValidate,
    storage,
    toastError,
    toastSuccess,
    tokenUtils,
} from '~/utils';
import { keyCustomerProfile, keyUserToken } from '~/constants';

import { ProviderContext } from '~/components/Provider';

import routes from '~/config/routes';

import Button from '~/components/Button';
import styles from './Login.module.scss';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        username: '',
        password: '',
    });

    // Need to use navigate at top level to avoid issues with hooks
    const navigate = useNavigate();

    const { setCustomerProfile } = useContext(ProviderContext);

    // Skip login if token valid
    useEffect(() => {
        const token = storage.get(keyUserToken);

        if (token) {
            const tokenValue = jwtDecode(token);

            storage.save(keyCustomerProfile, tokenValue._doc);

            if (!tokenUtils.isExpired(tokenValue)) {
                navigate(routes.home);
            }
        }
    }, [navigate]);

    const handleLogin = useCallback(async (data) => {
        try {
            // Login request to the backend
            const result = await userApi.post(backEndApi.customerLogin, data);

            toastSuccess(result.message);

            // Save token to localStorage
            storage.save(keyUserToken, result.token);

            // // Save info token into localStorage
            storage.save(keyCustomerProfile, result.data);

            // // Add info to profile
            setCustomerProfile(result.data);

            // // Login successfully, redirect to dashboard
            navigate(routes.home);
        } catch (err) {
            console.error('Login failed...', err);
            toastError(err?.response?.data?.message || 'Login failed!');
        }
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Đăng nhập</h1>

                <form action="" onSubmit={handleSubmit(handleLogin)}>
                    {/* Username */}
                    <label className="form-label" htmlFor="username">
                        Tên đăng nhập
                    </label>
                    <input
                        className={errors.username ? 'form-input-invalid' : 'form-input'}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Nhập tên đăng nhập của bạn"
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
                        Mật khẩu
                    </label>
                    <input
                        className={errors.password ? 'form-input-invalid' : 'form-input'}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Nhập mật khẩu của bạn"
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
                        Đăng nhập
                    </Button>

                    {/* Other */}
                    <p className={styles['other']}>
                        Chưa có tài khoản?
                        <Link to={routes.register} className={styles['register-btn']}>
                            Đăng ký
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
