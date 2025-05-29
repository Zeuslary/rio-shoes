import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { patternValidate } from '~/utils';

import api from '~/utils/api';
import backEndApi from '~/utils/backendApi';

import { IMG_CUSTOMER_PATH } from '~/constants';
import { toastSuccess, toastError } from '~/utils/toast';
import flatObject from '~/utils/flatObject';
import Image from '~/components/Image';
import Button from '~/components/Button';
import CartBox from '~/admin/components/CartBox';
import styles from './CustomerEdit.module.scss';

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

function CustomerEdit({ customerEdit, setCustomerEdit, setCustomers, setMode, e }) {
    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
    } = useForm({
        defaultValues: {
            username: customerEdit?.username,
            password: customerEdit?.password,
            fullName: {
                firstName: customerEdit?.fullName?.firstName,
                lastName: customerEdit?.fullName?.lastName,
            },
            phone: customerEdit?.phone,
            email: customerEdit?.email,
            address: {
                city: customerEdit.address.city,
                district: customerEdit.address.district,
                ward: customerEdit.address.ward,
                houseNumber: customerEdit.address.houseNumber,
            },
            avatar: customerEdit?.avatar,
            dateOfBirth: customerEdit?.dateOfBirth,
            lastOrderDate: customerEdit?.lastOrderDate,
            lastLogin: customerEdit?.lastLogin,
            status: customerEdit.status,
        },
    });

    // console.log('customerEdit', customerEdit);
    let preview = '';

    const avatarFile = watch('avatar');

    if (typeof avatarFile === 'string') {
        preview = IMG_CUSTOMER_PATH + avatarFile;
    } else if (avatarFile.length > 0) {
        preview = URL.createObjectURL(avatarFile[0]);
    }

    useEffect(() => {
        return () => {
            // Clear temporary img to avoid memory leak
            if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleEdit = async (data) => {
        console.group('Editing...');
        console.log(flatObject(data));

        try {
            const result = await api.putMultipart(
                backEndApi.customer,
                customerEdit._id,
                flatObject(data),
            );

            console.log('Update customer success:', result);
            toastSuccess(result.message);
            setCustomers((prev) =>
                prev.map((customer) =>
                    customer._id === customerEdit._id ? result.data : customer,
                ),
            );
            setCustomerEdit();
            setMode('view');
        } catch (err) {
            console.error('Update customer failed...', err);
            toastError(err.response?.data?.message || 'Update customer error!');
        }

        console.groupEnd();
    };

    const handleCancel = () => {
        setCustomerEdit();
        setMode('view');
    };

    return (
        <div className={styles['wrapper']}>
            <CartBox>
                <h2 className={styles['header']}>Update customer</h2>

                <form action="" onSubmit={handleSubmit(handleEdit)} encType="multipart/form-data">
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
                                        message: 'First name must be at least 2 characters',
                                    },
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.fullName?.firstName && errors.fullName.firstName.message}
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
                                        message: 'Last name must be at least 2 characters',
                                    },
                                })}
                            />
                            <p className="form-msg-err">
                                {errors.fullName?.lastName && errors.fullName.lastName.message}
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
                            <p className="form-msg-err">{errors.phone && errors.phone.message}</p>
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
                            <p className="form-msg-err">{errors.email && errors.email.message}</p>
                        </div>
                    </div>

                    {/* Address */}
                    <label className={styles['address']}>Address</label>
                    <div className="row">
                        <div className="col-4">
                            <label className="form-label" htmlFor="city">
                                City
                            </label>
                            <select
                                className="form-select"
                                name="city"
                                id="city"
                                {...register('address.city', {
                                    required: patternValidate.required,
                                    validate: (value) =>
                                        value !== 'default-value' || 'Please select this field',
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
                            <p className="form-msg-err">
                                {errors.address?.city && errors.address?.city.message}
                            </p>
                        </div>

                        <div className="col-4">
                            <label className="form-label">District</label>
                            <select
                                className="form-select"
                                name="district"
                                id="district"
                                {...register('address.district', {
                                    required: patternValidate.required,
                                    validate: (value) =>
                                        value !== 'default-value' || 'Please select this field',
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
                            <p className="form-msg-err">
                                {errors.address?.district && errors.address?.district.message}
                            </p>
                        </div>

                        <div className="col-4">
                            <label className="form-label">Ward</label>
                            <select
                                className="form-select"
                                name="ward"
                                id="ward"
                                {...register('address.ward', {
                                    required: patternValidate.required,
                                    validate: (value) =>
                                        value !== 'default-value' || 'Please select this field',
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
                                {errors.address?.houseNumber && errors.address?.houseNumber.message}
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
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button deepBlack customStyle={styles['submit-btn']} type="submit">
                            Update customer
                        </Button>
                    </div>
                </form>
            </CartBox>
        </div>
    );
}

export default CustomerEdit;
