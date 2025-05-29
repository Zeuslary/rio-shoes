import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
    api,
    backEndApi,
    flatObject,
    convertAddress,
    patternValidate,
    toastError,
    toastSuccess,
} from '~/utils';

import provincesApi from '~/utils/provinces';

import Image from '~/components/Image';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './CustomerAdd.module.scss';

function CustomerAdd({ setCustomers, setMode }) {
    const {
        register,
        formState: { errors },
        watch,
        control,
        handleSubmit,
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
            fullName: {
                firstName: '',
                lastName: '',
            },
            phone: '',
            email: '',
            address: {
                city: 'default',
                district: 'default',
                ward: 'default',
                houseNumber: '',
            },
            avatar: '',
            dateOfBirth: '',
            lastOrderDate: '',
            lastLogin: '',
            status: 'active',
        },
    });

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Handle load cities
    useEffect(() => {
        // Handle get provinces
        const handleGetProvinces = async () => {
            try {
                const result = await provincesApi.getProvinces();
                setCities(result);
            } catch (err) {
                console.error('Fetching provinces failed...', err);
            }
        };

        handleGetProvinces();
    }, []);

    // Handle load districts
    const handleLoadDistricts = async (e) => {
        const provinceCode = e.target.value;

        try {
            const result = await provincesApi.getDistricts(provinceCode);

            setDistricts(result);
        } catch (err) {
            console.error('Fetching districts failed...', err);
            toastError('Fetching districts error');
        }
    };

    // Handle load wards
    const handleLoadWards = async (e) => {
        const districtCode = e.target.value;

        try {
            const result = await provincesApi.getWards(districtCode);

            setWards(result);
        } catch (err) {
            console.error('Fetching wards failed...', err);
            toastError('Fetching wards error');
        }
    };

    // Handle show preview image
    const avatarFile = watch('avatar')?.[0];
    const preview = avatarFile ? URL.createObjectURL(avatarFile) : '';

    useEffect(() => {
        return () => {
            // Clear temporary img to avoid memory leak
            URL.revokeObjectURL(preview);
        };
    }, [preview]);

    // Handle add customer into db
    const handleAdd = async (data) => {
        console.log('Adding...');
        console.log(flatObject(data));

        // Convert address: city, district, ward
        data.address.city = convertAddress(cities, data.address.city);
        data.address.district = convertAddress(districts, data.address.district);
        data.address.ward = convertAddress(wards, data.address.ward);

        try {
            const result = await api.postMultipart(backEndApi.customer, flatObject(data));
            console.log('Create customer success:', result);
            toastSuccess(result.message);
            setCustomers((prev) => [...prev, result.data]);
            setMode('view');
        } catch (err) {
            console.error('Error add customer!', err);
            toastError(err.response?.data?.message || 'Add customer failed!');
        }
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Add customer</h2>

                <form
                    action=""
                    onSubmit={handleSubmit(handleAdd)}
                    encType="multipart/form-data"
                >
                    {/* Fullname */}
                    <div className="row">
                        {/* First name */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="firstName">
                                First name
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Eg: Rio"
                                id="firstName"
                                {...register('fullName.firstName', {
                                    required: patternValidate.required,
                                    minLength: {
                                        value: 2,
                                        message:
                                            'First name must be at least 2 characters',
                                    },
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.fullName?.firstName &&
                                    errors.fullName.firstName.message}
                            </p>
                        </div>

                        {/* Last name */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="lastName">
                                Last name
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Eg: Lander"
                                id="lastName"
                                {...register('fullName.lastName', {
                                    required: patternValidate.required,
                                    minLength: {
                                        value: 2,
                                        message:
                                            'Last name must be at least 2 characters',
                                    },
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.fullName?.lastName &&
                                    errors.fullName.lastName.message}
                            </p>
                        </div>
                    </div>

                    {/* Account */}
                    <div className="row">
                        {/* Username */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Enter username"
                                id="username"
                                {...register('username')}
                            />
                        </div>

                        {/* Password */}
                        <div className="col-6">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Enter password"
                                id="password"
                                {...register('password')}
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="form-label" htmlFor="status">
                            Status
                        </label>
                        <select
                            name="status"
                            id="status"
                            className="form-select"
                            {...register('status')}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="banned">Banned</option>
                        </select>
                    </div>

                    {/* Phone and Email */}
                    <div className="row">
                        <div className="col-6">
                            <label className="form-label" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                className="form-input"
                                id="phone"
                                type="text"
                                placeholder="Enter your phone number"
                                {...register('phone', {
                                    required: patternValidate.required,
                                    pattern: {
                                        value: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
                                        message: 'Invalid phone number',
                                    },
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.phone && errors.phone.message}
                            </p>
                        </div>

                        <div className="col-6">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="form-input"
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                {...register('email')}
                            />
                            <p className="form-msg-err">
                                {errors.email && errors.email.message}
                            </p>
                        </div>
                    </div>

                    {/* Address */}
                    <label className={styles['address']}>Address</label>
                    <div className="row">
                        <div className="col-4">
                            <label className="form-label" htmlFor="city">
                                City
                            </label>

                            <Controller
                                control={control}
                                name="address.city"
                                rules={{
                                    required: patternValidate.required,
                                    validate: (value) =>
                                        value !== 'default' || 'Please select this field',
                                }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="form-select"
                                        name="city"
                                        id="city"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleLoadDistricts(e);
                                        }}
                                    >
                                        <option value="default" disabled hidden>
                                            Select City
                                        </option>
                                        {cities.map((city) => (
                                            <option key={city.code} value={city.code}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />

                            <p className="form-msg-err">
                                {errors.address?.city && errors.address?.city.message}
                            </p>
                        </div>

                        <div className="col-4">
                            <label className="form-label">District</label>

                            <Controller
                                control={control}
                                className="form-select"
                                name="address.district"
                                rules={{
                                    required: patternValidate.required,
                                    validate: (value) =>
                                        value !== 'default' || 'Please select this field',
                                }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="form-select"
                                        name="district"
                                        id="district"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleLoadWards(e);
                                        }}
                                    >
                                        <option value="default" disabled hidden>
                                            Select District
                                        </option>
                                        {districts.map((district) => (
                                            <option
                                                key={district.code}
                                                value={district.code}
                                            >
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />

                            <p className="form-msg-err">
                                {errors.address?.district &&
                                    errors.address?.district.message}
                            </p>
                        </div>

                        <div className="col-4">
                            <label className="form-label">Ward</label>

                            <Controller
                                control={control}
                                name={'address.ward'}
                                rules={{
                                    required: patternValidate.required,
                                    validate: (value) =>
                                        value !== 'default' || 'Please select this field',
                                }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="form-select"
                                        name="ward"
                                        id="ward"
                                    >
                                        <option value="default" disabled hidden>
                                            Select Ward
                                        </option>
                                        {wards.map((ward) => (
                                            <option key={ward.code} value={ward.code}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />

                            <p className="form-msg-err">
                                {errors.address?.ward && errors.address?.ward.message}
                            </p>
                        </div>

                        <div className="col-12">
                            <label
                                className={clsx('form-label', styles['house-number'])}
                                htmlFor="houseNumber"
                            >
                                House Number
                            </label>
                            <input
                                className="form-input"
                                id="houseNumber"
                                type="text"
                                placeholder="House Number, Street Name"
                                {...register('address.houseNumber', {
                                    required: patternValidate.required,
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.address?.houseNumber &&
                                    errors.address?.houseNumber.message}
                            </p>
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="form-label" htmlFor="dateOfBirth">
                            Date of Birth
                        </label>
                        <input
                            className="form-input"
                            id="dateOfBirth"
                            type="date"
                            {...register('dateOfBirth')}
                        />
                        <p className="form-msg-err">
                            {errors.dateOfBirth && errors.dateOfBirth.message}
                        </p>
                    </div>

                    {/* Avatar */}
                    <label className="form-label" htmlFor="avatar">
                        Avatar
                    </label>
                    <input
                        className="form-input"
                        type="file"
                        id="avatar"
                        name="avatar"
                        {...register('avatar')}
                    />
                    {/* Preview image */}
                    <div className="text-center mt-12">
                        <Image className={styles['avatar']} src={preview} />
                    </div>

                    {/* Actions */}
                    <div className={clsx('mt-24', 'text-center', 'mb-12')}>
                        <Button
                            type="button"
                            gray
                            customStyle={styles['cancel-btn']}
                            onClick={() => setMode('view')}
                        >
                            Cancel
                        </Button>
                        <Button
                            deepBlack
                            customStyle={styles['submit-btn']}
                            type="submit"
                        >
                            Add customer
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default CustomerAdd;
