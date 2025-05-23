import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '~/components/Button';
import styles from './ContactInfo.module.scss';

const cities = [
    { id: '1', name: 'Hanoi' },
    { id: '2', name: 'Ho Chi Minh City' },
    { id: '3', name: 'Da Nang' },
];
const districts = [
    { id: '1', name: 'Ba Dinh' },
    { id: '2', name: 'Hoan Kiem' },
    { id: '3', name: 'Tay Ho' },
];
const wards = [
    { id: '1', name: 'Ngoc Ha' },
    { id: '2', name: 'Kim Ma' },
    { id: '3', name: 'Cua Dong' },
];

function ContactInfo() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // console.log('useForm: ', useForm());
    // useEffect(() => {
    //     console.log('form state: ', errors);
    // });

    const onSubmit = (data) => {
        console.log('Your data: ', data);
    };

    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['title']}>Contact Information</h2>

            <form>
                <div className="row">
                    {/* Full name */}
                    <div className="col-12">
                        <label className={styles['label']} htmlFor="fullname">
                            Fullname
                        </label>
                        <input
                            className={clsx(styles['input'], errors.fullname && styles['invalid'])}
                            id="fullname"
                            type="text"
                            placeholder="Enter your fullname"
                            {...register('fullname', { required: true })}
                        />

                        <p className={styles['error-mes']}>
                            {errors.fullname &&
                                (errors.fullName?.message || `This field is required`)}
                        </p>
                    </div>
                </div>

                {/* Phone and Email */}
                <div className="row">
                    <div className="col-6">
                        <label className={styles['label']} htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            className={clsx(
                                styles['input'],
                                errors.phoneNumber && styles['invalid'],
                            )}
                            id="phoneNumber"
                            type="text"
                            placeholder="Enter your phone number"
                            {...register('phoneNumber', {
                                required: true,
                                pattern: {
                                    value: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
                                    message: 'Invalid phone number',
                                },
                            })}
                        />

                        <p className={styles['error-mes']}>
                            {errors.phoneNumber &&
                                (errors.phoneNumber?.message || `This field is required`)}
                        </p>
                    </div>

                    <div className="col-6">
                        <label className={styles['label']} htmlFor="email">
                            Email
                        </label>
                        <input
                            className={clsx(styles['input'], errors.email && styles['invalid'])}
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            {...register('email')}
                        />

                        <p className={styles['error-mes']}>
                            {errors.email && (errors.email?.message || `This field is required`)}
                        </p>
                    </div>
                </div>

                {/* Address */}
                <div className="row">
                    <div className="col-12">
                        <label className={styles['address']}>Address</label>
                    </div>

                    <div className="col-4">
                        <label className={styles['address-label']}>City</label>
                        <select
                            className={clsx(
                                styles['address-select'],
                                errors.city && styles['invalid'],
                            )}
                            defaultValue="default-value"
                            name="city"
                            id="city"
                            {...register('city', {
                                required: true,
                                validate: (value) => value !== 'default-value',
                            })}
                        >
                            <option value="default-value" disabled hidden>
                                Select City
                            </option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>

                        <p className={styles['address-error-mes']}>
                            {errors.city && (errors.city?.message || `This field is required`)}
                        </p>
                    </div>

                    <div className="col-4">
                        <label className={styles['address-label']}>District</label>
                        <select
                            className={clsx(
                                styles['address-select'],
                                errors.district && styles['invalid'],
                            )}
                            defaultValue="default-value"
                            name="district"
                            id="district"
                            {...register('district', {
                                required: true,
                                validate: (value) => value !== 'default-value',
                            })}
                        >
                            <option value="default-value" disabled hidden>
                                Select District
                            </option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.id}>
                                    {district.name}
                                </option>
                            ))}
                        </select>

                        <p className={styles['address-error-mes']}>
                            {errors.district &&
                                (errors.district?.message || `This field is required`)}
                        </p>
                    </div>

                    <div className="col-4">
                        <label className={styles['address-label']}>Ward</label>
                        <select
                            className={clsx(
                                styles['address-select'],
                                errors.ward && styles['invalid'],
                            )}
                            defaultValue="default-value"
                            name="ward"
                            id="ward"
                            {...register('ward', {
                                required: true,
                                validate: (value) => value !== 'default-value',
                            })}
                        >
                            <option value="default-value" disabled hidden>
                                Select Ward
                            </option>
                            {wards.map((ward) => (
                                <option key={ward.id} value={ward.id}>
                                    {ward.name}
                                </option>
                            ))}
                        </select>

                        <p className={styles['address-error-mes']}>
                            {errors.ward && (errors.ward?.message || `This field is required`)}
                        </p>
                    </div>
                    <div className="col-12">
                        <label className={styles['address-label']} htmlFor="houseNumber">
                            House Number
                        </label>
                        <input
                            className={clsx(
                                styles['input'],
                                errors.houseNumber && styles['invalid'],
                            )}
                            id="houseNumber"
                            type="text"
                            placeholder="House Number, Street Name"
                            {...register('houseNumber', { required: true })}
                        />

                        <p className={styles['error-mes']}>
                            {errors.houseNumber &&
                                (errors.houseNumber?.message || `This field is required`)}
                        </p>
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label className={styles['label']} htmlFor="message">
                        Message
                    </label>
                    <textarea
                        rows={8}
                        spellCheck={false}
                        className={clsx(styles['input'], errors.message && styles['invalid'])}
                        id="message"
                        type="text"
                        placeholder="Enter your title"
                        {...register('message')}
                    />

                    <p className={styles['error-mes']}>
                        {errors.message && (errors.message?.message || `This field is required`)}
                    </p>
                </div>

                {/* Fake submit */}
                {/* <Button onClick={handleSubmit(onSubmit)} deepBlack>
                    Submit
                </Button> */}
            </form>
        </div>
    );
}

export default ContactInfo;
