import clsx from 'clsx';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';

import { patternValidate } from '~/utils';

import Button from '~/components/Button';
import routes from '~/config/routes';
import styles from './Login.module.scss';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('data: ', data);
    };

    const passwordFromApi = '123123';

    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <h1 className={styles['header']}>Login</h1>

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
                            required: patternValidate.required,
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
                            required: patternValidate.required,
                            validate: (value) =>
                                value === passwordFromApi || 'Password does not match',
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
                        <Link to={routes.register} className={styles['register-btn']}>
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
