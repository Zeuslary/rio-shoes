import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';
import CartBox from '~/admin/components/CartBox';
import styles from './AccountSetting.module.scss';

function AccountSetting({ account }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: account.fullName,
            email: account.email,
            phoneNumber: account.phone,
        },
    });
    const [preview, setPreview] = useState(account.avatar);

    // useEffect(() => {
    //     console.log(errors);
    // });

    const handlePreview = (e) => {
        // revoke preUrl to prevent memory leak
        URL.revokeObjectURL(preview);
        const src = URL.createObjectURL(e.target.files[0]);
        setPreview(src);
        console.log('Change....', e);
    };

    const handleUpdate = (data) => {
        console.log('Update...', data);
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['header']}>Account Setting</h2>
            <div className="grid mt-24">
                <div className="row">
                    {/* Origin info */}
                    <div className="col-6">
                        <CartBox>
                            <h3 className={styles['info-title']}>Original info</h3>
                            <div className="space-between">
                                <Image className={styles['info-avatar']} src={account.avatar} />
                                <div className={styles['info-detail']}>
                                    <p className={styles['info-value']}>
                                        <strong>Fullname: </strong> {account.fullName}
                                    </p>
                                    <p className={styles['info-value']}>
                                        <strong>Email: </strong> {account.email}
                                    </p>
                                    <p className={styles['info-value']}>
                                        <strong>Phone: </strong> {account.phone}
                                    </p>
                                </div>
                            </div>
                        </CartBox>
                    </div>

                    {/* Change info */}
                    <div className="col-6">
                        <CartBox>
                            <form
                                action=""
                                className={styles['form']}
                                onSubmit={handleSubmit(handleUpdate)}
                            >
                                <h3 className="text-center">Change info</h3>
                                {/* Fullname */}
                                <label className={styles['label']} htmlFor="fullName">
                                    Fullname:
                                </label>
                                <input
                                    className={clsx(
                                        styles['input'],
                                        errors.fullName && styles['invalid'],
                                    )}
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    {...register('fullName', {
                                        required: 'This field is required',
                                    })}
                                />
                                <p className={styles['error-msg']}>
                                    {errors.fullName && errors.fullName.message}
                                </p>
                                {/* Email */}
                                <label className={styles['label']} htmlFor="email">
                                    Email:
                                </label>
                                <input
                                    className={clsx(
                                        styles['input'],
                                        errors.email && styles['invalid'],
                                    )}
                                    type="email"
                                    id="email"
                                    name="email"
                                    {...register('email', {
                                        required: 'This field is required',
                                    })}
                                />
                                <p className={styles['error-msg']}>
                                    {errors.email && errors.email.message}
                                </p>
                                {/* Phone number */}
                                <label className={styles['label']} htmlFor="phoneNumber">
                                    Phone number:
                                </label>
                                <input
                                    className={clsx(
                                        styles['input'],
                                        errors.phoneNumber && styles['invalid'],
                                    )}
                                    type="phoneNumber"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    {...register('phoneNumber', {
                                        required: 'This field is required',
                                    })}
                                />
                                <p className={styles['error-msg']}>
                                    {errors.phoneNumber && errors.phoneNumber.message}
                                </p>
                                {/* Change avatar */}
                                <label className={styles['label']} htmlFor="avatar">
                                    Avatar:
                                </label>
                                <input
                                    className={clsx(
                                        styles['input'],
                                        errors.avatar && styles['invalid'],
                                    )}
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    onChange={handlePreview}
                                    {...register('avatar')}
                                />
                                {/* Preview image */}
                                <div className="text-center mt-12">
                                    <Image className={styles['info-avatar']} src={preview} />
                                </div>
                                {/* Button Change */}
                                <p className="text-center">
                                    <Button
                                        deepBlack
                                        type="submit"
                                        customStyle={styles['update-btn']}
                                    >
                                        Update changes
                                    </Button>
                                </p>
                            </form>
                        </CartBox>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSetting;
