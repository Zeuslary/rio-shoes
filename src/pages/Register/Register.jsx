import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import { userApi, backEndApi, patternValidate, toastError } from '~/utils';

import { Button } from '~/components';
import routes from '~/config/routes';
import styles from './Register.module.scss';

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const navigate = useNavigate();

    const handleRegister = async (data) => {
        console.log('data: ', data);
        try {
            // Just validate unique username
            const res = await userApi.post(backEndApi.uniqueUserName, data);

            console.log('Res: ', res);

            // Switch to page User Info
            navigate(routes.userInfo, {
                state: data,
            });
        } catch (err) {
            console.error('Handle register failed...', err);
            toastError(err?.response?.data?.message || 'Handle register error!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Đăng kí</h1>

                <form action="" onSubmit={handleSubmit(handleRegister)}>
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
                            minLength: patternValidate.minLength3,
                            maxLength: {
                                value: 20,
                                message: 'Username must be at most 20 characters',
                            },
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

                    {/* Confirm password */}
                    <label className="form-label" htmlFor="confirm-password">
                        Xác nhận mật khẩu
                    </label>
                    <input
                        className={
                            errors.confirmPassword ? 'form-input-invalid' : 'form-input'
                        }
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="Nhập lại mật khẩu của bạn"
                        {...register('confirmPassword', {
                            required: patternValidate.required,
                            validate: (value) =>
                                value === watch('password') ||
                                'Your passwords do not match',
                        })}
                    />
                    <p className="form-msg-err">
                        {errors.confirmPassword && errors.confirmPassword.message}
                    </p>

                    {/* Button register */}
                    <Button deepBlack customStyle={styles['register-btn']} type="submit">
                        Đăng ký
                    </Button>

                    {/* Other */}
                    <p className={styles['other']}>
                        Đã có tài khoản?
                        <Link to={routes.login} className={styles['login-btn']}>
                            Đăng nhập
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
